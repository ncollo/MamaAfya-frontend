/**
 * MamaAfya integration server
 * ---------------------------
 * This is the glue between:
 *   - the Botpress chatbot (via its custom actions, which call the
 *     /api/* endpoints below over bp.http.axios)
 *   - the CHW/facility dashboard (kept live via Socket.IO)
 *   - Africa's Talking (USSD callback + SMS send)
 *   - the PWA webchat widget (served from /public)
 *
 * In production these endpoints would live inside the existing MamaAfya
 * backend; they are split out here so the chatbot integration can be
 * demonstrated and tested independently.
 */

const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
// Africa's Talking posts USSD callbacks as application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// In-memory demo data store (swap for the real MamaAfya database in prod)
const mothers = {
  'demo-mother-1': {
    nextVisit: '2026-08-14',
    pendingItems: 'Tetanus booster (2nd dose), iron supplement refill',
  },
};

// ---------------------------------------------------------------------------
// CHW dashboard: mothers/CHWs connect here and receive live alerts
// ---------------------------------------------------------------------------
io.on('connection', (socket) => {
  console.log(`[socket.io] dashboard client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`[socket.io] dashboard client disconnected: ${socket.id}`);
  });
});

// ---------------------------------------------------------------------------
// Risk engine: shared rule-set for symptom risk stratification
// ---------------------------------------------------------------------------
const RISK_RULES = {
  bleeding: 'high',
  headache: 'high',
  fetal_movement: 'high',
  fever: 'medium',
  minor: 'low',
};

app.post('/api/risk-engine/assess', (req, res) => {
  const { symptom } = req.body;
  const riskLevel = RISK_RULES[symptom] || 'low';
  res.json({ riskLevel });
});

// ---------------------------------------------------------------------------
// CHW alerts: pushed to every connected dashboard client in real time
// ---------------------------------------------------------------------------
app.post('/api/chw-alerts/dispatch', (req, res) => {
  const alert = req.body;
  io.emit('chw:alert', alert);
  console.log('[chw-alerts] dispatched:', alert);
  res.json({ status: 'dispatched', alert });
});

// ---------------------------------------------------------------------------
// SMS notifications via Africa's Talking (stubbed here; swap in the real SDK)
// ---------------------------------------------------------------------------
app.post('/api/notifications/sms', async (req, res) => {
  const { template, recipients, motherId, location } = req.body;

  // Real integration would look like:
  //   const AfricasTalking = require('africastalking')({apiKey, username});
  //   const sms = AfricasTalking.SMS;
  //   await sms.send({ to: recipientNumbers, message });
  console.log(
    `[africastalking:sms] template="${template}" recipients=${recipients.join(',')} ` +
      `mother=${motherId} location=${location}`
  );

  res.json({ status: 'queued', template, recipients });
});

// ---------------------------------------------------------------------------
// Antenatal schedule lookup (shared backend data source)
// ---------------------------------------------------------------------------
app.get('/api/mothers/:id/schedule', (req, res) => {
  const record = mothers[req.params.id] || {
    nextVisit: 'not yet scheduled',
    pendingItems: 'none',
  };
  res.json(record);
});

// ---------------------------------------------------------------------------
// Africa's Talking USSD callback (Channel B) - same backend logic, numeric UI
// ---------------------------------------------------------------------------
app.post('/ussd', (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;
  const steps = (text || '').split('*').filter(Boolean); // e.g. "1*1" -> ['1', '1']

  let response;
  if (steps.length === 0) {
    response = 'CON Welcome to MamaAfya\n1. Report symptom\n2. Check appointments\n3. Emergency';
  } else if (steps.length === 1 && steps[0] === '1') {
    response = 'CON Choose symptom:\n1. Bleeding\n2. Headache\n3. Fever';
  } else if (steps.length === 2 && steps[0] === '1' && ['1', '2', '3'].includes(steps[1])) {
    const symptomMap = { 1: 'bleeding', 2: 'headache', 3: 'fever' };
    const symptomChoice = steps[1];
    const riskLevel = RISK_RULES[symptomMap[symptomChoice]] || 'low';
    if (riskLevel === 'high') {
      io.emit('chw:alert', {
        motherId: phoneNumber,
        channel: 'ussd',
        reason: 'high_risk_symptom',
        symptom: symptomMap[symptomChoice],
        priority: 'urgent',
        timestamp: new Date().toISOString(),
      });
    }
    response = `END Thank you. Your symptom has been logged (risk: ${riskLevel}). Your CHW will follow up if needed.`;
  } else if (steps.length === 1 && steps[0] === '3') {
    io.emit('chw:alert', {
      motherId: phoneNumber,
      channel: 'ussd',
      reason: 'panic_button',
      priority: 'critical',
      timestamp: new Date().toISOString(),
    });
    response = 'END Emergency signal sent. Help is on the way.';
  } else {
    response = 'END Sorry, invalid option.';
  }

  res.set('Content-Type', 'text/plain');
  res.send(response);
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`MamaAfya integration server listening on port ${PORT}`);
  });
}

module.exports = { app, server, io };
