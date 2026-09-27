import { useNavigate } from 'react-router-dom';
import { AlertTriangle, AlertCircle, CheckCircle, UserCheck, Phone, ChevronRight } from 'lucide-react';
import { getRiskMeta, PROXY_ENTRY } from '../shared/riskLabels';
import { useAppState } from '../context/AppStateContext';
import styles from './PatientRow.module.css';

export default function PatientRow({ patient, isNewAlert = false, onSelectPatient }) {
  const navigate = useNavigate();
  const { language } = useAppState();

  const riskMeta = getRiskMeta(patient.riskLevel || patient.status || patient.risk_level);
  const isProxy = patient.source === 'chw_proxy' || patient.isProxy;

  const riskLabel = language === 'sw' ? riskMeta.sw : riskMeta.en;
  const proxyLabel = language === 'sw' ? PROXY_ENTRY.sw : PROXY_ENTRY.en;

  const renderRiskIcon = () => {
    if (riskMeta.key === 'high') {
      return <AlertTriangle size={18} color="var(--risk-high, #DC2626)" />;
    }
    if (riskMeta.key === 'medium') {
      return <AlertCircle size={18} color="var(--risk-medium, #D97706)" />;
    }
    return <CheckCircle size={18} color="var(--risk-routine, #16A34A)" />;
  };

  const gestationalText = patient.week || (patient.gestationalWeek ? `Week ${patient.gestationalWeek}` : 'Active Patient');

  return (
    <div
      className={`${styles.row} ${styles[`row_${riskMeta.key}`]} ${isNewAlert ? styles.rowNewAlert : ''}`}
      role="article"
      aria-label={`${patient.name || patient.patient_name} - ${riskLabel}`}
    >
      {/* 1. Recognition Over Recall: Leftmost Risk Badge */}
      <div className={styles.riskBadgeCol}>
        <div
          className={styles.riskBadge}
          style={{
            backgroundColor: riskMeta.bgColor,
            borderColor: riskMeta.borderColor,
            color: riskMeta.textColor,
          }}
          title={riskLabel}
        >
          {renderRiskIcon()}
          <span className={styles.riskBadgeText}>{riskLabel}</span>
        </div>

        {/* Proxy entry visual attribution */}
        {isProxy && (
          <span className={styles.proxyBadge} title={proxyLabel}>
            <UserCheck size={12} />
            {proxyLabel}
          </span>
        )}
      </div>

      {/* 2. Patient Demographics & Stage */}
      <div className={styles.patientInfoCol}>
        <div className={styles.nameRow}>
          <h4 className={styles.patientName}>{patient.name || patient.patient_name || 'Patient'}</h4>
          <span className={styles.weekPill}>{gestationalText}</span>
        </div>

        <p className={styles.symptomText}>
          <strong>{language === 'sw' ? 'Dalili:' : 'Reported:'} </strong>
          {Array.isArray(patient.symptoms)
            ? patient.symptoms.join(', ')
            : patient.symptom || (patient.symptoms ? String(patient.symptoms) : 'Routine pregnancy check-in')}
        </p>

        {patient.triage_notes && (
          <p className={styles.triageNote}>
            "{patient.triage_notes}"
          </p>
        )}
      </div>

      {/* 3. Fast Triaging Action Buttons */}
      <div className={styles.actionsCol}>
        {patient.phone && (
          <a
            href={`tel:${patient.phone}`}
            className={styles.callBtn}
            title={language === 'sw' ? 'Piga simu' : 'Call patient'}
            aria-label="Call patient"
          >
            <Phone size={15} />
          </a>
        )}

        <button
          className={styles.reviewBtn}
          onClick={() => {
            if (onSelectPatient) {
              onSelectPatient(patient);
            } else {
              navigate('/chw/patients');
            }
          }}
        >
          <span>{language === 'sw' ? 'Fuatilia' : 'Review'}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
