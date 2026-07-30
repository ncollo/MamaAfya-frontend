/**
 * Botpress custom action: fetchScheduleFromBackend
 * Reads the mother's next antenatal visit and any pending preventative-care
 * reminders (tetanus, malaria prophylaxis, iron supplements) from the same
 * unified backend the PWA and USSD channels use, so the chatbot never
 * maintains its own copy of appointment data.
 *
 * @param {object} bp    - the Botpress runtime API
 * @param {object} event - the incoming event/session
 * @param {object} args  - { userId }
 * @returns {Promise<object>} { nextVisit, pendingItems }
 */

async function fetchScheduleFromBackend(bp, event, args) {
  try {
    const response = await bp.http.axios.get(`/api/mothers/${args.userId}/schedule`);
    return response.data;
  } catch (err) {
    bp.logger.error(`[fetchScheduleFromBackend] ${err.message}`);
    return {
      nextVisit: 'unavailable right now - please try again shortly',
      pendingItems: 'none loaded',
    };
  }
}

module.exports = fetchScheduleFromBackend;
