import { patients } from '../data/patients';
import styles from './PlaceholderPage.module.css';

const scheduleItems = patients.slice(0, 4).map((patient, index) => ({
  time: `${8 + index}:00`,
  name: patient.name,
  note: patient.riskLevel === 'high' ? 'Priority follow-up' : 'Routine ANC review',
  icon: patient.riskLevel === 'high' ? 'warning' : 'event_available',
}));

export default function Schedule() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroIcon} aria-hidden="true">
          <span className="material-symbols-outlined fill" style={{ fontSize: 36, color: 'var(--color-primary)' }}>event</span>
        </div>
        <h2 className={`headline-lg ${styles.title}`}>Schedule</h2>
        <p className={`body-lg ${styles.sub}`}>Appointment calendar, ANC visit scheduling, and follow-up reminders stay tied to assigned mothers.</p>
        <span className={`label-md ${styles.badge}`}>Live planner</span>
      </header>

      <section>
        <h3 className={`headline-sm ${styles.sectionTitle}`}>Today&apos;s follow-ups</h3>
        <div className={styles.stack}>
          {scheduleItems.map(item => (
            <div key={item.name} className={styles.actionCard}>
              <div className={styles.actionIcon}>
                <span className="material-symbols-outlined fill" style={{ fontSize: 22 }}>{item.icon}</span>
              </div>
              <div className={styles.actionText}>
                <p className={`label-md ${styles.actionTitle}`}>{item.time} - {item.name}</p>
                <p className={`body-sm ${styles.actionBody}`}>{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
