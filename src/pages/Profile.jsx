import styles from './PlaceholderPage.module.css';

export default function Profile() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className="material-symbols-outlined fill" style={{ fontSize: 64, color: 'var(--color-primary)' }}>account_circle</span>
        <h2 className={`headline-lg ${styles.title}`}>My Profile</h2>
        <p className={`body-lg ${styles.sub}`}>Your pregnancy journey, health records, and personal settings will be here.</p>
        <span className={`label-md ${styles.badge}`}>Coming Soon</span>
      </div>
    </div>
  );
}
