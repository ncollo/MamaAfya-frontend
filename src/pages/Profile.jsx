import { useNavigate } from 'react-router-dom';
import styles from './PlaceholderPage.module.css';

const profileLinks = [
  {
    icon: 'home',
    title: 'Back to Home',
    body: 'Return to the pregnancy dashboard and daily progress view.',
    to: '/home',
  },
  {
    icon: 'smart_toy',
    title: 'Talk to MamaBot',
    body: 'Get instant support from your pregnancy assistant.',
    to: '/chat',
  },
  {
    icon: 'menu_book',
    title: 'Nutrition guide',
    body: 'Review meal ideas and ingredient suggestions.',
    to: '/guide',
  },
  {
    icon: 'notifications',
    title: 'Notification center',
    body: 'See the latest reminders and updates.',
    to: '/notifications',
  },
];

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroIcon} aria-hidden="true">
          <span className="material-symbols-outlined fill" style={{ fontSize: 36, color: 'var(--color-primary)' }}>account_circle</span>
        </div>
        <h2 className={`headline-lg ${styles.title}`}>My Profile</h2>
        <p className={`body-lg ${styles.sub}`}>Your pregnancy journey, health records, and personal settings will be here.</p>
        <span className={`label-md ${styles.badge}`}>Personal Hub</span>
      </header>

      <section>
        <h3 className={`headline-sm ${styles.sectionTitle}`}>Shortcuts</h3>
        <div className={styles.stack}>
          {profileLinks.map(link => (
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
