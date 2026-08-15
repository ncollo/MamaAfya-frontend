import styles from './PlaceholderPage.module.css';

const inventoryItems = [
  { icon: 'pill', title: 'Iron supplements', body: '38 packs in stock' },
  { icon: 'monitor_heart', title: 'Blood pressure cuffs', body: '6 units ready' },
  { icon: 'medication', title: 'ANC essentials', body: 'Reorder in 5 days' },
];

export default function Inventory() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroIcon} aria-hidden="true">
          <span className="material-symbols-outlined fill" style={{ fontSize: 36, color: 'var(--color-primary)' }}>inventory_2</span>
        </div>
        <h2 className={`headline-lg ${styles.title}`}>Inventory</h2>
        <p className={`body-lg ${styles.sub}`}>Medical supplies and reorder tracking are visible at a glance.</p>
        <span className={`label-md ${styles.badge}`}>Supply view</span>
      </header>

      <section>
        <h3 className={`headline-sm ${styles.sectionTitle}`}>Stock overview</h3>
        <div className={styles.stack}>
          {inventoryItems.map(item => (
            <div key={item.title} className={styles.actionCard}>
              <div className={styles.actionIcon}>
                <span className="material-symbols-outlined fill" style={{ fontSize: 22 }}>{item.icon}</span>
              </div>
              <div className={styles.actionText}>
                <p className={`label-md ${styles.actionTitle}`}>{item.title}</p>
                <p className={`body-sm ${styles.actionBody}`}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
