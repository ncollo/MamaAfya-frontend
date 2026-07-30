import styles from './PlaceholderPage.module.css';

export default function Community() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className="material-symbols-outlined fill" style={{ fontSize: 64, color: 'var(--color-primary)' }}>group</span>
        <h2 className={`headline-lg ${styles.title}`}>Community</h2>
        <p className={`body-lg ${styles.sub}`}>Connect with other mothers, share experiences, and get support from your CHW team.</p>
        <span className={`label-md ${styles.badge}`}>Coming Soon</span>
      </div>
    </div>
  );
}
