/**
 * Botpress custom action: triggerEmergency
 * Fires the same "panic button" broadcast described in the MamaAfya system
 * concept: a distress signal + GPS coordinates to the CHW, partner, and
 * linked clinic, over BOTH channels the mother might not be watching:
 *   1. Socket.IO -> CHW/clinic dashboard (instant, in-app)
 *   2. Africa's Talking SMS -> partner + CHW phone (works with zero data)
 *
 * @param {object} bp    - the Botpress runtime API
 * @param {object} event - the incoming event/session
 * @param {object} args  - { userId, location }
 */

async function triggerEmergency(bp, event, args) {
  const alert = {
    motherId: args.userId || event.target,
    location: args.location || 'unknown - request last known location from telco',
    channel: 'chatbot',
    severity: 'critical',
    timestamp: new Date().toISOString(),
  };

  const dispatchDashboardAlert = bp.http.axios
    .post('/api/chw-alerts/dispatch', { ...alert, reason: 'panic_button' })
    .catch((err) => bp.logger.error(`[triggerEmergency] Dashboard alert failed: ${err.message}`));

  const dispatchSms = bp.http.axios
    .post('/api/notifications/sms', {
      template: 'emergency_panic',
      recipients: ['chw', 'partner', 'clinic'],
      motherId: alert.motherId,
      location: alert.location,
    })
    .catch((err) => bp.logger.error(`[triggerEmergency] SMS dispatch failed: ${err.message}`));

  await Promise.all([dispatchDashboardAlert, dispatchSms]);
  bp.logger.info(`[triggerEmergency] Emergency broadcast sent for mother ${alert.motherId}`);
}

module.exports = triggerEmergency;
