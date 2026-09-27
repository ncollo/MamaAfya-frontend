import { useNavigate } from "react-router-dom";
import { Bell, Globe } from "lucide-react";
import { useAppState } from "../../../context/AppStateContext";
import SyncStatus from "../common/SyncStatus";
import styles from "../../styles/MotherDashboard.module.css";

export default function Header() {
  const navigate = useNavigate();
  const { user, phase, language, toggleLanguage } = useAppState();
  const displayName = user?.full_name || user?.fullName || "Amina Wanjiru";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const phaseLabel = phase === 'postpartum'
    ? (language === 'sw' ? 'Mama na Mtoto • Huduma ya Baada ya Kujifungua' : 'Mother & Baby • Postpartum Care')
    : (language === 'sw' ? 'Mama Mtarajiwa • Mimba Inayoendelea' : 'Expected Mother • Antenatal Care');

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <p className={styles.greeting}>
            {language === 'sw' ? 'Habari,' : 'Hello,'}
          </p>
          <SyncStatus />
        </div>

        <h1>{displayName}</h1>

        <p className={styles.subGreeting}>
          {phaseLabel}
        </p>
      </div>

      <div className={styles.headerRight}>
        <button
          className={styles.notificationBtn}
          type="button"
          onClick={toggleLanguage}
          title={language === 'en' ? 'Badili hadi Kiswahili' : 'Switch to English'}
          style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <Globe size={16} />
          {language.toUpperCase()}
        </button>

        <button
          className={styles.notificationBtn}
          type="button"
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <div className={styles.avatar} title={displayName}>
          {initials}
        </div>
      </div>
    </header>
  );
}