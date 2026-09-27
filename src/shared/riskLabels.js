/**
 * MamaAfya Shared Risk Vocabulary & Visual Signaling
 * Source of truth for Web App, CHW Dashboard, Facility Portal, and Partner Interface.
 * Mirrors verbatim Section 3 of the specification.
 */

export const RISK_TIERS = {
  HIGH: {
    key: 'high',
    dbRisk: 'red',
    en: 'High Risk',
    sw: 'Hatari Kubwa',
    color: 'var(--risk-high, #DC2626)',
    bgColor: 'var(--risk-high-bg, #FEF2F2)',
    borderColor: 'var(--risk-high-border, #FECACA)',
    textColor: 'var(--risk-high-text, #991B1B)',
    icon: 'AlertTriangle',
    materialIcon: 'warning',
    priority: 1,
  },
  MEDIUM: {
    key: 'medium',
    dbRisk: 'yellow',
    en: 'Medium Risk',
    sw: 'Hatari ya Wastani',
    color: 'var(--risk-medium, #D97706)',
    bgColor: 'var(--risk-medium-bg, #FFFBEB)',
    borderColor: 'var(--risk-medium-border, #FDE68A)',
    textColor: 'var(--risk-medium-text, #92400E)',
    icon: 'AlertCircle',
    materialIcon: 'error_outline',
    priority: 2,
  },
  ROUTINE: {
    key: 'routine',
    dbRisk: 'green',
    en: 'Routine',
    sw: 'Kawaida',
    color: 'var(--risk-routine, #16A34A)',
    bgColor: 'var(--risk-routine-bg, #F0FDF4)',
    borderColor: 'var(--risk-routine-border, #BBF7D0)',
    textColor: 'var(--risk-routine-text, #166534)',
    icon: 'CheckCircle2',
    materialIcon: 'check_circle',
    priority: 3,
  },
};

export const PROXY_ENTRY = {
  en: 'Logged by CHW',
  sw: 'Imeandikwa na Mhudumu wa Afya',
  badgeClass: 'proxyBadge',
};

export const SYNC_STATUS = {
  PENDING: {
    key: 'pending',
    en: 'Saving… will sync',
    sw: 'Inahifadhiwa… itatumwa',
    visual: 'pulsing_dot',
  },
  SYNCED: {
    key: 'synced',
    en: 'Synced',
    sw: 'Imetumwa',
    visual: 'solid_dot',
  },
};

/**
 * Helper to normalize any risk string ('red', 'high', 'Hatari Kubwa', etc.)
 * into the canonical risk tier object.
 */
export function getRiskMeta(riskInput) {
  if (!riskInput) return RISK_TIERS.ROUTINE;
  const str = String(riskInput).trim().toLowerCase();

  if (str === 'red' || str === 'high' || str === 'high risk' || str.includes('hatari kubwa')) {
    return RISK_TIERS.HIGH;
  }
  if (
    str === 'yellow' ||
    str === 'medium' ||
    str === 'moderate' ||
    str === 'warning' ||
    str.includes('wastani')
  ) {
    return RISK_TIERS.MEDIUM;
  }
  return RISK_TIERS.ROUTINE;
}

/**
 * Returns the localized risk label for a given risk level and language.
 */
export function getLocalizedRiskLabel(riskInput, language = 'en') {
  const meta = getRiskMeta(riskInput);
  return language === 'sw' ? meta.sw : meta.en;
}
