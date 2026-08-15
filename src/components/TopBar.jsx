import { useNavigate } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import styles from "./TopBar.module.css";

export default function TopBar({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuClick || (() => navigate('/chw/'))}
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className={`headline-md ${styles.logo}`}>NurtureHome</h1>
      </div>

      <div className={styles.right}>
        <LanguageToggle />
        <button className={styles.iconBtn} type="button" aria-label="Notifications" onClick={() => navigate('/chw/reports')}>
          <span className="material-symbols-outlined">notifications</span>
          <span className={styles.badge} />
        </button>
        <div className={styles.userAvatar} aria-hidden="true" />
      </div>
    </header>
  );
}
