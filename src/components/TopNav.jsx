import styles from './TopNav.module.css';

export default function TopNav() {
  return (
    <header className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.avatar} aria-hidden="true">
          <span className="material-symbols-outlined fill" style={{ fontSize: 20, color: 'var(--color-primary)' }}>pregnant_woman</span>
        </div>
        <span className={`headline-sm ${styles.logo}`}>NurtureHome</span>
      </div>
      <button className={styles.iconBtn} aria-label="Notifications">
        <span className="material-symbols-outlined">notifications</span>
        <span className={styles.badge} />
      </button>
    </header>
  );
}
