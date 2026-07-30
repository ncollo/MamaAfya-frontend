import { Heart } from "lucide-react";
import styles from "../../styles/MotherDashboard.module.css";

export default function DailyTip() {
  return (
    <div className={styles.tipCard}>

      <div className={styles.tipHeader}>

        <Heart size={18} />

        <h3>Daily Tip</h3>

      </div>

      <p>
        Drink at least 8 glasses of water today. Staying hydrated
        helps reduce swelling and supports your baby's healthy
        development.
      </p>

    </div>
  );
}