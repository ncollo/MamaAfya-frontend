import { useState } from 'react';
import { patients, stats } from '../data/patients';
import StatCards from '../components/StatCards';
import PatientRow from '../components/PatientRow';
import { useAppState } from '../context/AppStateContext';
import styles from './TriageDashboard.module.css';

const FILTER_OPTIONS = ['All', 'High Risk', 'Monitor', 'Routine'];

const riskMap = { 'All': null, 'High Risk': 'high', 'Monitor': 'medium', 'Routine': 'low' };

export default function TriageDashboard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const { user } = useAppState();

  const filtered = activeFilter === 'All'
    ? patients
    : patients.filter(p => p.riskLevel === riskMap[activeFilter]);

  return (
    <main className={styles.main}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={`headline-lg ${styles.pageTitle}`}>Triage Dashboard</h2>
          <p className={`body-md ${styles.pageSubtitle}`}>
            Review and prioritize patient alerts from the community.
          </p>
        </div>

        <div className={styles.headerActions}>
          {/* Filter chips */}
          <div className={styles.filterGroup} role="group" aria-label="Filter patients">
            {FILTER_OPTIONS.map(f => (
              <button
                key={f}
                className={`label-md ${styles.filterChip} ${activeFilter === f ? styles.filterChipActive : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            className={`label-md ${styles.btnNewPatient}`}
            onClick={() => setShowNewPatientModal(true)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            New Patient
          </button>
        </div>
      </div>

      <section className={styles.assignmentBanner}>
        <div>
          <p className={`label-sm ${styles.assignmentLabel}`}>Assigned Mothers</p>
          <h3 className={`headline-sm ${styles.assignmentTitle}`}>{patients.length} mothers in your queue</h3>
          <p className={`body-sm ${styles.assignmentSub}`}>Signed in as {user?.fullName || 'the assigned CHW'}.</p>
        </div>
        <div className={styles.assignmentMeta}>
          <span className={styles.assignmentChip}>Chatbot</span>
          <span className={styles.assignmentChip}>SMS</span>
          <span className={styles.assignmentChip}>USSD</span>
        </div>
      </section>

      {/* Stat Cards */}
      <StatCards stats={stats} />

      {/* Patient Queue */}
      <section>
        <div className={styles.listHeader}>
          <h3 className={`headline-sm ${styles.listTitle}`}>Assigned Mother Queue</h3>
          <span className={`label-md ${styles.listCount}`}>
            Showing {filtered.length} {activeFilter !== 'All' ? activeFilter : ''} patient{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className={styles.patientList}>
          {filtered.map(patient => (
            <PatientRow key={patient.id} patient={patient} />
          ))}
        </div>
      </section>

      {/* Simple "New Patient" modal */}
      {showNewPatientModal && (
        <div className={styles.modalOverlay} onClick={() => setShowNewPatientModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className="headline-sm">Register New Patient</h3>
              <button className={styles.modalClose} onClick={() => setShowNewPatientModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className={`body-md ${styles.modalBody}`}>
              New patient registration form would go here. Connect to your backend API to save patient records.
            </p>
            <div className={styles.modalFooter}>
              <button className={`label-md ${styles.btnCancel}`} onClick={() => setShowNewPatientModal(false)}>
                Cancel
              </button>
              <button
                className={`label-md ${styles.btnSave}`}
                onClick={() => setShowNewPatientModal(false)}
              >
                Save Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
