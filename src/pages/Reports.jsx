import { patients, stats } from '../data/patients';
import styles from './PlaceholderPage.module.css';

const sourceBreakdown = patients.reduce((accumulator, patient) => {
  accumulator[patient.alertSource] = (accumulator[patient.alertSource] || 0) + 1;
  return accumulator;
}, {});

export default function Reports() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroIcon} aria-hidden="true">
          <span className="material-symbols-outlined fill" style={{ fontSize: 36, color: 'var(--color-primary)' }}>analytics</span>
        </div>
        <h2 className={`headline-lg ${styles.title}`}>Reports</h2>
        <p className={`body-lg ${styles.sub}`}>Monitor alert counts, escalation sources, and follow-up load across all assigned mothers.</p>
        <span className={`label-md ${styles.badge}`}>Analytics hub</span>
      </header>

      <section>
        <h3 className={`headline-sm ${styles.sectionTitle}`}>Alert summary</h3>
        <div className={styles.stack}>
          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <span className="material-symbols-outlined fill" style={{ fontSize: 22 }}>priority_high</span>
            </div>
            <div className={styles.actionText}>
              <p className={`label-md ${styles.actionTitle}`}>High risk cases</p>
              <p className={`body-sm ${styles.actionBody}`}>{stats.high} mothers need urgent review</p>
            </div>
          </div>

          {Object.entries(sourceBreakdown).map(([source, count]) => (
            <div key={source} className={styles.actionCard}>
              <div className={styles.actionIcon}>
                <span className="material-symbols-outlined fill" style={{ fontSize: 22 }}>hub</span>
              </div>
              <div className={styles.actionText}>
                <p className={`label-md ${styles.actionTitle}`}>{source}</p>
                <p className={`body-sm ${styles.actionBody}`}>{count} incoming report{count !== 1 ? 's' : ''}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
