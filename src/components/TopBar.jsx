import { useNavigate } from "react-router-dom";
import styles from "./TopBar.module.css";

export default function TopBar({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className={`headline-md ${styles.logo}`}>NurtureHome</h1>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
          <span className={styles.badge} />
        </button>
        <div className={styles.userAvatar} aria-hidden="true" />
      </div>
    </header>
  );
}
