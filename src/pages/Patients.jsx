import { patients } from '../data/patients';
import PatientRow from '../components/PatientRow';
import styles from './TriageDashboard.module.css';

export default function Patients() {
  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={`headline-lg ${styles.pageTitle}`}>Assigned Mothers</h2>
          <p className={`body-md ${styles.pageSubtitle}`}>
            Review the women assigned to your care and open their latest alerts.
          </p>
        </div>
      </div>

      <section>
        <div className={styles.listHeader}>
          <h3 className={`headline-sm ${styles.listTitle}`}>Mother Records</h3>
          <span className={`label-md ${styles.listCount}`}>{patients.length} mothers</span>
        </div>

        <div className={styles.patientList}>
          {patients.map(patient => (
            <PatientRow key={patient.id} patient={patient} />
          ))}
        </div>
      </section>
    </main>
  );
}
