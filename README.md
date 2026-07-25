# MamaAfya Chatbot

a conversational front-end for **MamaAfya**, a unified maternal health platform
bridging expectant mothers, Community Health Workers (CHWs) & healthcare
facilities in Kenya.

## why Botpress Community

it's Node.js-native (matches a Socket.IO/Express backend), visual flow builder ideal for structured symptom-triage decision trees, ships an embeddable webchat widget out of the box, & lets custom JS "actions" call any backend API — exactly what's needed to fire Socket.IO alerts and Africa's Talking SMS. |


MamaAfya's chatbot needs are **structured, not conversational-AI-heavy**:
symptom triage against fixed rules, appointment lookups, an emergency
broadcast, and a nutrition/mood check-in. Botpress's visual flow model maps
directly onto the "mother's journey" phases in the system concept, while its
Node.js core lets it sit naturally alongside the rest of MamaAfya's backend.

## what this chatbot does

mirrors the **Mother's Journey** from the system concept doc:

- **symptom triage** reports (bleeding, headache, reduced fetal movement,
  fever, minor symptoms) are risk-stratified (high/medium/low) & high-risk
  reports immediately alert the CHW dashboard, matching *"bleeding triggers
  an immediate SMS alert to the CHW"* in the concept doc.
- **antenatal reminders** pulls the mother's next visit + pending
  preventative-care items (tetanus, malaria prophylaxis, iron) from the
  shared backend.
- **nutrition & wellbeing**: local dietary tips (uji, kunde) + a simple
  mood check-in; a low score alerts the CHW.
- **Emergency panic button**: broadcasts GPS + a distress signal to the CHW,
  partner & clinic over **both** Socket.IO (dashboard) & Africa's
  Talking SMS, so it still reaches people even if no one's watching the app.
- **Talk to a CHW**: an on-demand handoff notification.

all logic is channel-agnostic: the same risk rules and alert pipeline also
power the USSD gateway (`*384#`) stub included here, so a mother on a basic
phone and a mother on the PWA get identical outcomes.

## project structure

```
mamaafya-chatbot/
├── flows/                     Botpress flow definitions (import into Botpress Studio)
│   ├── main.flow.json          Main menu / router
│   ├── symptom_triage.flow.json
│   ├── emergency.flow.json
│   ├── appointments.flow.json
│   └── nutrition.flow.json
├── actions/                    Custom Botpress actions (Node.js)
│   ├── checkRisk.js             Symptom -> risk level
│   ├── notifyCHW.js             Push a live alert to the CHW dashboard
│   ├── triggerEmergency.js      Panic-button broadcast (Socket.IO + SMS)
│   └── fetchScheduleFromBackend.js
├── integration/
│   ├── server.js                Express + Socket.IO backend the actions call,
│   │                             plus the Africa's Talking USSD webhook
│   └── package.json
├── public/
│   └── webchat-embed.html       Snippet to embed the bot in the MamaAfya PWA
└── test/
    ├── flow_engine.js            Minimal interpreter used ONLY for local testing
    └── run_flow_test.js          End-to-end test: flows + actions + live server
```

## running it

**1. install dependencies** (from the project root, since `test/` and
`integration/` share `node_modules`):
```bash
npm install
```

**2. run the integration server** (Express + Socket.IO + USSD webhook):
```bash
node integration/server.js
```
This exposes:
- `POST /api/risk-engine/assess` — shared risk-stratification rules
- `POST /api/chw-alerts/dispatch` — pushes to every connected dashboard via `io.emit('chw:alert', ...)`
- `POST /api/notifications/sms` — Africa's Talking SMS stub (swap in the real SDK)
- `GET /api/mothers/:id/schedule` — antenatal schedule lookup
- `POST /ussd` — Africa's Talking USSD callback (Channel B)

**3. run the end-to-end test** (spins up the server, connects a mock CHW
dashboard over Socket.IO, and drives real conversations through the flow
files + actions):
```bash
node test/run_flow_test.js
```

**4. set up the actual bot in Botpress Studio**
```bash
docker run -d --name botpress -p 3000:3000 botpress/server:latest
```
then import the contents of `flows/` as a new bot's flows, copy `actions/*.js`
into the bot's `actions` folder, and point each action's `bp.http.axios`
calls at your running `integration/server.js` (set `baseURL` accordingly, or
reverse-proxy them onto the same host).

**5. embed in the MamaAfya PWA**
Drop `public/webchat-embed.html`'s `<script>` tags into the PWA shell (see
that file for the exact snippet and config options).

## extra notes

- risk rules & alert dispatch live in **one place** (`integration/server.js`),
  called identically by the chatbot's actions *and* the USSD handler — this
  is what keeps "the digital chain of care" (per the concept doc) unbroken
  across channels.
- `test/flow_engine.js` is **not** part of the production system — Botpress
  itself executes the real `flows/*.flow.json` files. it exists only so the
  flow logic and custom actions could be verified end-to-end in this
  environment without a full Botpress Studio install.
