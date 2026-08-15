import { useNavigate } from 'react-router-dom';
import styles from './PlaceholderPage.module.css';

const communityLinks = [
  {
    icon: 'smart_toy',
    title: 'Chat with MamaBot',
    body: 'Ask about symptoms, recipes, or pregnancy tips.',
    to: '/chat',
  },
  {
    icon: 'calendar_month',
    title: 'Check the weekly plan',
    body: 'See the full seven-day meal schedule.',
    to: '/weekly',
  },
  {
    icon: 'menu_book',
    title: 'Browse the nutrition guide',
    body: 'Review breakfast, lunch, and dinner ideas.',
    to: '/guide',
  },
  {
    icon: 'notifications',
    title: 'Open notifications',
    body: 'Review updates and reminders in one place.',
    to: '/notifications',
  },
];

export default function Community() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroIcon} aria-hidden="true">
          <span className="material-symbols-outlined fill" style={{ fontSize: 36, color: 'var(--color-primary)' }}>group</span>
        </div>
        <h2 className={`headline-lg ${styles.title}`}>Community</h2>
        <p className={`body-lg ${styles.sub}`}>Connect with other mothers, share experiences, and get support from your CHW team.</p>
        <span className={`label-md ${styles.badge}`}>Live Connections</span>
      </header>

      <section>
        <h3 className={`headline-sm ${styles.sectionTitle}`}>Open a conversation</h3>
        <div className={styles.actionGrid}>
          {communityLinks.map(link => (
            <button
              key={link.title}
              type="button"
              className={styles.actionCard}
              onClick={() => navigate(link.to)}
            >
              <div className={styles.actionIcon}>
                <span className="material-symbols-outlined fill" style={{ fontSize: 22 }}>{link.icon}</span>
              </div>
              <div className={styles.actionText}>
                <p className={`label-md ${styles.actionTitle}`}>{link.title}</p>
                <p className={`body-sm ${styles.actionBody}`}>{link.body}</p>
              </div>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-outline)', fontSize: 18 }}>chevron_right</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
