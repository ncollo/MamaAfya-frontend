import styles from './PlaceholderPage.module.css';

const alerts = [
  'MamaBot replied to your nutrition question.',
  'Your weekly meal plan was updated for today.',
  'New community support content will appear here soon.',
];

export default function Notifications() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className="material-symbols-outlined fill" style={{ fontSize: 64, color: 'var(--color-primary)' }}>notifications</span>
        <h2 className={`headline-lg ${styles.title}`}>Notifications</h2>
        <p className={`body-lg ${styles.sub}`}>Recent updates and alerts for your Nurture Home.</p>
        <div style={{ display: 'grid', gap: 12, width: '100%', marginTop: 8 }}>
          {alerts.map(alert => (
            <div
              key={alert}
              style={{
                padding: '14px 16px',
                borderRadius: 16,
                background: 'var(--color-surface-container-low)',
                color: 'var(--color-on-surface)',
                textAlign: 'left',
              }}
            >
              <p className="body-md" style={{ margin: 0 }}>{alert}</p>
            </div>
          ))}
        </div>
        <span className={`label-md ${styles.badge}`}>Coming Soon</span>
      </div>
    </div>
  );
}