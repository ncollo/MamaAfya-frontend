import { useAppState } from '../../../context/AppStateContext';
import { SYNC_STATUS } from '../../../shared/riskLabels';
import styles from './SyncStatus.module.css';

export default function SyncStatus({ className = '' }) {
  const { syncStatus, language } = useAppState();

  const isPending = syncStatus === 'pending';
  const label = isPending
    ? (language === 'sw' ? SYNC_STATUS.PENDING.sw : SYNC_STATUS.PENDING.en)
    : (language === 'sw' ? SYNC_STATUS.SYNCED.sw : SYNC_STATUS.SYNCED.en);

  return (
    <div
      className={`${styles.container} ${className}`}
      title={label}
      role="status"
      aria-live="polite"
    >
      <span
        className={`${styles.dot} ${isPending ? styles.dotPending : styles.dotSynced}`}
        aria-hidden="true"
      />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
