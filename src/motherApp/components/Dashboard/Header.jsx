import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { useAppState } from "../../../context/AppStateContext";
import styles from "../../styles/MotherDashboard.module.css";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAppState();
  const displayName = user?.fullName || "Amina Wanjiru";

  return (
    <header className={styles.header}>

      <div className={styles.headerLeft}>

        <p className={styles.greeting}>
          Habari,
        </p>

        <h1>
          {displayName}
        </h1>

        <p className={styles.subGreeting}>
          {user?.role === 'chw' ? 'CHW Portal' : 'Mama mtarajiwa • Expected Mother'}
        </p>

      </div>

      <div className={styles.headerRight}>

        <button className={styles.notificationBtn} type="button" onClick={() => navigate('/notifications')}>

          <Bell size={22} />

        </button>

        <div className={styles.avatar}>

          AW

        </div>

      </div>

    </header>
  );
}