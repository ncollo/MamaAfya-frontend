import { Bell } from "lucide-react";
import styles from "../../styles/MotherDashboard.module.css";

export default function Header() {
  return (
    <header className={styles.header}>

      <div className={styles.headerLeft}>

        <p className={styles.greeting}>
          Habari,
        </p>

        <h1>
          Amina Wanjiru
        </h1>

        <p className={styles.subGreeting}>
          Mama mtarajiwa • Expected Mother
        </p>

      </div>

      <div className={styles.headerRight}>

        <button className={styles.notificationBtn}>

          <Bell size={22} />

        </button>

        <div className={styles.avatar}>

          AW

        </div>

      </div>

    </header>
  );
}