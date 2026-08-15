import { useNavigate } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import styles from './TopNav.module.css';

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <header className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.avatar} aria-hidden="true">
          <span className="material-symbols-outlined fill" style={{ fontSize: 20, color: 'var(--color-primary)' }}>pregnant_woman</span>
        </div>
        <span className={`headline-sm ${styles.logo}`}>NurtureHome</span>
      </div>
      <div className={styles.actions}>
        <LanguageToggle />
        <button className={styles.iconBtn} type="button" aria-label="Notifications" onClick={() => navigate('/notifications')}>
          <span className="material-symbols-outlined">notifications</span>
          <span className={styles.badge} />
        </button>
      </div>
    </header>
  );
}
