/**
 * Botpress custom action: checkRisk
 * Maps a reported symptom to a risk level using MamaAfya's risk-stratification
 * rules. In production this should call the shared backend risk engine
 * (POST /api/risk-engine/assess) so the PWA, USSD, and chatbot channels all
 * use identical logic - this local map is a fast-path fallback / offline mode.
 *
 * @param {object} bp    - the Botpress runtime API
 * @param {object} event - the incoming event/session
 * @param {object} args  - { symptom: string }
 * @returns {Promise<string>} one of 'high' | 'medium' | 'low'
 */

const RISK_MAP = {
  bleeding: 'high',
  headache: 'high',       // possible pre-eclampsia warning sign
  fetal_movement: 'high',
  fever: 'medium',
  minor: 'low',
};

async function checkRisk(bp, event, args) {
  const symptom = (args && args.symptom || '').toLowerCase();

  try {
    // Preferred path: ask the central backend risk engine so all channels
    // (PWA, USSD, chatbot) stay perfectly in sync.
    const response = await bp.http.axios.post('/api/risk-engine/assess', {
      userId: event.target,
      symptom,
    });
    return response.data.riskLevel;
  } catch (err) {
    bp.logger.warn(`[checkRisk] Backend unreachable, using local fallback map: ${err.message}`);
    return RISK_MAP[symptom] || 'low';
  }
}

module.exports = checkRisk;
