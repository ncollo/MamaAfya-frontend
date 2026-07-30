import { useNavigate } from 'react-router-dom';
import { tips } from '../data/nutrition';
import styles from './Home.module.css';

const tipColorMap = {
  primary:   { bg: 'var(--color-primary-container)',   icon: 'var(--color-primary)',   border: 'rgba(69,97,78,0.15)' },
  secondary: { bg: 'var(--color-secondary-container)', icon: 'var(--color-secondary)', border: 'rgba(151,71,37,0.15)' },
  tertiary:  { bg: 'var(--color-tertiary-container)',  icon: 'var(--color-tertiary)',  border: 'rgba(113,92,0,0.15)' },
  error:     { bg: '#ffdad6',                          icon: 'var(--color-error)',     border: 'rgba(186,26,26,0.15)' },
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <p className={`label-sm ${styles.week}`}>
          <span className="material-symbols-outlined fill" style={{ fontSize: 14 }}>favorite</span>
          Week 24 of Pregnancy
        </p>
        <h1 className={`headline-lg ${styles.title}`}>MamaAfya Guide</h1>
        <p className={`body-md ${styles.sub}`}>Nourishing you and your baby with local goodness.</p>
      </header>

      {/* Quick access cards */}
      <section className={styles.quickGrid}>
        <button className={`${styles.quickCard} ${styles.quickPrimary}`} onClick={() => navigate('/guide')}>
          <span className="material-symbols-outlined fill" style={{ fontSize: 32 }}>menu_book</span>
          <span className="headline-sm">Daily Meals</span>
          <span className="body-sm">Breakfast, lunch & dinner</span>
        </button>
        <button className={`${styles.quickCard} ${styles.quickSecondary}`} onClick={() => navigate('/weekly')}>
          <span className="material-symbols-outlined fill" style={{ fontSize: 32 }}>calendar_month</span>
          <span className="headline-sm">Weekly Plan</span>
          <span className="body-sm">7-day meal planner</span>
        </button>
      </section>

      {/* AskMamaBot banner */}
      <button className={styles.botBanner} onClick={() => navigate('/community')}>
        <div className={styles.botIcon}>
          <span className="material-symbols-outlined fill">smart_toy</span>
        </div>
        <div className={styles.botText}>
          <p className="label-md">Ask MamaBot</p>
          <p className="body-sm" style={{ opacity: 0.85 }}>Get local recipe ideas & nutrition advice</p>
        </div>
        <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary)', opacity: 0.7 }}>chevron_right</span>
      </button>

      {/* Tips */}
      <section>
        <h2 className={`headline-sm ${styles.sectionTitle}`}>Nutrition Tips</h2>
        <div className={styles.tipsGrid}>
          {tips.map(tip => {
            const c = tipColorMap[tip.color] || tipColorMap.primary;
            return (
              <div key={tip.id} className={styles.tipCard} style={{ backgroundColor: c.bg, borderColor: c.border }}>
                <span className="material-symbols-outlined fill" style={{ color: c.icon, fontSize: 28 }}>
                  {tip.icon}
                </span>
                <div>
                  <p className={`label-md ${styles.tipTitle}`}>{tip.title}</p>
                  <p className={`body-sm ${styles.tipBody}`}>{tip.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
