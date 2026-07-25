/**
 * End-to-end test harness.
 *
 * Boots the real integration server (server.js), connects a mock CHW
 * dashboard client via socket.io-client, then drives three scripted
 * conversations through the flow files + real custom actions:
 *   1. High-risk symptom report -> expects an urgent CHW dashboard alert
 *   2. Nutrition flow with low mood score -> expects a normal CHW alert
 *   3. Emergency panic button -> expects a critical alert + SMS dispatch log
 *
 * Run with:  node run_flow_test.js   (from the test/ directory, after
 * `npm install` inside integration/)
 */

const path = require('path');
const axios = require('axios');
const { io: ioClient } = require('socket.io-client');

const PORT = 4500;
process.env.PORT = PORT;

const { server, io } = require(path.join(__dirname, '..', 'integration', 'server.js'));
const FlowEngine = require('./flow_engine');

// bp shim: gives our action modules the same interface Botpress provides
const bp = {
  http: { axios: axios.create({ baseURL: `http://localhost:${PORT}` }) },
  logger: {
    info: (...a) => console.log('  [bp.logger.info]', ...a),
    warn: (...a) => console.warn('  [bp.logger.warn]', ...a),
    error: (...a) => console.error('  [bp.logger.error]', ...a),
  },
};

const flowsDir = path.join(__dirname, '..', 'flows');
const actionsDir = path.join(__dirname, '..', 'actions');

function waitForAlert(socket, timeoutMs = 2000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timed out waiting for chw:alert')), timeoutMs);
    socket.once('chw:alert', (alert) => {
      clearTimeout(timer);
      resolve(alert);
    });
  });
}

async function main() {
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Integration server up on :${PORT}\n`);

  const dashboardSocket = ioClient(`http://localhost:${PORT}`);
  await new Promise((resolve) => dashboardSocket.on('connect', resolve));
  console.log('Mock CHW dashboard connected via Socket.IO\n');

  const engine = new FlowEngine(flowsDir, actionsDir, bp);
  let passed = 0;
  let failed = 0;

  // --- Test 1: high-risk symptom triage --------------------------------
  console.log('=== TEST 1: High-risk symptom (bleeding) ===');
  const event1 = { target: 'demo-mother-1', user: { name: 'Aisha' } };
  const alertPromise1 = waitForAlert(dashboardSocket);
  const result1 = await engine.run('symptom_triage.flow.json', 'start', event1, ['bleeding']);
  result1.transcript.forEach((t) => console.log(' ', t.speaker + ':', t.text || t.options));
  try {
    const alert1 = await alertPromise1;
    console.log('  -> received dashboard alert:', alert1);
    if (alert1.priority === 'urgent' && alert1.reason === 'high_risk_symptom') {
      console.log('  PASS: urgent CHW alert dispatched for high-risk symptom\n');
      passed++;
    } else {
      throw new Error('Alert payload did not match expected urgent high-risk shape');
    }
  } catch (err) {
    console.error('  FAIL:', err.message, '\n');
    failed++;
  }

  // --- Test 2: nutrition flow + low mood screening ----------------------
  console.log('=== TEST 2: Nutrition flow, low mood score ===');
  const event2 = { target: 'demo-mother-1', user: { name: 'Aisha' } };
  const alertPromise2 = waitForAlert(dashboardSocket);
  const result2 = await engine.run('nutrition.flow.json', 'start', event2, ['checkin', '1']);
  result2.transcript.forEach((t) => console.log(' ', t.speaker + ':', t.text || t.options));
  try {
    const alert2 = await alertPromise2;
    console.log('  -> received dashboard alert:', alert2);
    if (alert2.reason === 'low_mood_screening') {
      console.log('  PASS: CHW alerted on low mood score\n');
      passed++;
    } else {
      throw new Error('Unexpected alert reason for mood screening');
    }
  } catch (err) {
    console.error('  FAIL:', err.message, '\n');
    failed++;
  }

  // --- Test 3: emergency panic button -----------------------------------
  console.log('=== TEST 3: Emergency panic button ===');
  const event3 = { target: 'demo-mother-1', user: { name: 'Aisha', lastKnownLocation: '-1.2921,36.8219' } };
  const alertPromise3 = waitForAlert(dashboardSocket);
  const result3 = await engine.run('emergency.flow.json', 'start', event3, ['confirm']);
  result3.transcript.forEach((t) => console.log(' ', t.speaker + ':', t.text || t.options));
  try {
    const alert3 = await alertPromise3;
    console.log('  -> received dashboard alert:', alert3);
    if (alert3.severity === 'critical' && alert3.reason === 'panic_button') {
      console.log('  PASS: critical emergency alert dispatched (SMS dispatch logged above)\n');
      passed++;
    } else {
      throw new Error('Unexpected emergency alert shape');
    }
  } catch (err) {
    console.error('  FAIL:', err.message, '\n');
    failed++;
  }

  console.log(`\n=== RESULTS: ${passed} passed, ${failed} failed ===`);
  dashboardSocket.close();
  io.close();
  server.close();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Test harness crashed:', err);
  process.exit(1);
});
