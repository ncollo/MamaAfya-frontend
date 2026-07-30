/**
 * Botpress custom action: notifyCHW
 * Pushes a real-time alert to the CHW/facility dashboard over the app's
 * existing Socket.IO server, so a symptom or check-in reported through the
 * chatbot appears instantly alongside alerts coming from the PWA and USSD
 * channels - matching the "actionable intelligence" dashboard described in
 * the MamaAfya system concept.
 *
 * @param {object} bp    - the Botpress runtime API
 * @param {object} event - the incoming event/session
 * @param {object} args  - { reason, symptom?, priority? }
 */

async function notifyCHW(bp, event, args) {
  const payload = {
    motherId: event.target,
    channel: 'chatbot',
    reason: args.reason,
    symptom: args.symptom || null,
    priority: args.priority || 'normal',
    timestamp: new Date().toISOString(),
  };

  try {
    // The main MamaAfya backend owns the single Socket.IO server; the bot
    // reaches it over an internal HTTP call so both live in independent
    // processes but share one real-time alert stream.
    await bp.http.axios.post('/api/chw-alerts/dispatch', payload);
    bp.logger.info(`[notifyCHW] Dispatched ${payload.priority} alert for ${payload.reason}`);
  } catch (err) {
    bp.logger.error(`[notifyCHW] Failed to dispatch CHW alert: ${err.message}`);
  }
}

module.exports = notifyCHW;
