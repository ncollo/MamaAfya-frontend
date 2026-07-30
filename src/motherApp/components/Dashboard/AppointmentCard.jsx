import { Calendar } from "lucide-react";
import styles from "../../styles/MotherDashboard.module.css";

export default function AppointmentCard() {
  return (
    <div className={styles.appointmentCard}>

      <div className={styles.appointmentIcon}>
        <Calendar size={26} />
      </div>

      <div className={styles.appointmentInfo}>

        <span>NEXT ANC VISIT</span>

        <h3>Thursday, 19 June 2026</h3>

        <p>
          Mathare Health Centre • 9:00 AM
        </p>

      </div>

    </div>
  );
}