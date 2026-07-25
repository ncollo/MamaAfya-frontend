# MamaAfya Chatbot

A conversational front-end for **MamaAfya** — a unified maternal health platform
bridging expectant mothers, Community Health Workers (CHWs), and healthcare
facilities in Kenya — built for an HCI / Software Engineering class project.

## Why Botpress Community

Out of the candidates (Flowise, Botpress Community, Rasa, Typebot, Langflow,
Node-RED, LibreChat), **Botpress Community** was the best fit for MamaAfya:

| Tool | Verdict |
|---|---|
| **Botpress Community** | ✅ Chosen. Node.js-native (matches a Socket.IO/Express backend), visual flow builder ideal for structured symptom-triage decision trees, ships an embeddable webchat widget out of the box, and lets custom JS "actions" call any backend API — exactly what's needed to fire Socket.IO alerts and Africa's Talking SMS. |
| Rasa | Powerful NLU, but Python-based and heavyweight for a rule-based triage flow that doesn't need free-text NLU — adds integration friction with a Node/Socket.IO stack. |
| Flowise / Langflow | Built for LLM/RAG pipelines, not structured multi-channel decision trees; overkill and the wrong abstraction here. |
| Typebot | Great for linear conversational forms, but weaker at branching logic + custom backend actions than Botpress. |
| Node-RED | Excellent for backend orchestration, but has no native chat UI/widget — you'd have to build the conversational front-end yourself. |
| LibreChat | A full ChatGPT-style app shell, not an embeddable widget — wrong shape for a small in-app assistant. |

MamaAfya's chatbot needs are **structured, not conversational-AI-heavy**:
symptom triage against fixed rules, appointment lookups, an emergency
broadcast, and a nutrition/mood check-in. Botpress's visual flow model maps
directly onto the "mother's journey" phases in the system concept, while its
Node.js core lets it sit naturally alongside the rest of MamaAfya's backend.

## What this chatbot does

Mirrors the **Mother's Journey** from the system concept doc:

- **Symptom triage** — reports (bleeding, headache, reduced fetal movement,
  fever, minor symptoms) are risk-stratified (high/medium/low) and high-risk
  reports immediately alert the CHW dashboard — matching *"bleeding triggers
  an immediate SMS alert to the CHW"* in the concept doc.
- **Antenatal reminders** — pulls the mother's next visit + pending
  preventative-care items (tetanus, malaria prophylaxis, iron) from the
  shared backend.
- **Nutrition & wellbeing** — local dietary tips (uji, kunde) plus a simple
  mood check-in; a low score alerts the CHW.
- **Emergency panic button** — broadcasts GPS + a distress signal to the CHW,
  partner, and clinic over **both** Socket.IO (dashboard) and Africa's
  Talking SMS, so it still reaches people even if no one's watching the app.
- **Talk to a CHW** — an on-demand handoff notification.

All logic is channel-agnostic: the same risk rules and alert pipeline also
power the USSD gateway (`*384#`) stub included here, so a mother on a basic
phone and a mother on the PWA get identical outcomes.

## Project structure

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

## Running it

**1. Install dependencies** (from the project root, since `test/` and
`integration/` share `node_modules`):
```bash
npm install
```

**2. Run the integration server** (Express + Socket.IO + USSD webhook):
```bash
node integration/server.js
```
This exposes:
- `POST /api/risk-engine/assess` — shared risk-stratification rules
- `POST /api/chw-alerts/dispatch` — pushes to every connected dashboard via `io.emit('chw:alert', ...)`
- `POST /api/notifications/sms` — Africa's Talking SMS stub (swap in the real SDK)
- `GET /api/mothers/:id/schedule` — antenatal schedule lookup
- `POST /ussd` — Africa's Talking USSD callback (Channel B)

**3. Run the end-to-end test** (spins up the server, connects a mock CHW
dashboard over Socket.IO, and drives real conversations through the flow
files + actions):
```bash
node test/run_flow_test.js
```

**4. Set up the actual bot in Botpress Studio**
```bash
docker run -d --name botpress -p 3000:3000 botpress/server:latest
```
Then import the contents of `flows/` as a new bot's flows, copy `actions/*.js`
into the bot's `actions` folder, and point each action's `bp.http.axios`
calls at your running `integration/server.js` (set `baseURL` accordingly, or
reverse-proxy them onto the same host).

**5. Embed in the MamaAfya PWA**
Drop `public/webchat-embed.html`'s `<script>` tags into the PWA shell (see
that file for the exact snippet and config options).

## Notes for the class writeup

- Risk rules and alert dispatch live in **one place** (`integration/server.js`),
  called identically by the chatbot's actions *and* the USSD handler — this
  is what keeps "the digital chain of care" (per the concept doc) unbroken
  across channels.
- `test/flow_engine.js` is **not** part of the production system — Botpress
  itself executes the real `flows/*.flow.json` files. It exists only so the
  flow logic and custom actions could be verified end-to-end in this
  environment without a full Botpress Studio install.
