import { NavLink } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import styles from './BottomNav.module.css';

export default function BottomNav() {
  const { phase, language } = useAppState();

  const isPostpartum = phase === 'postpartum';

  const navItems = isPostpartum
    ? [
        { icon: 'home', label: language === 'sw' ? 'Nyumbani' : 'Home', to: '/' },
        { icon: 'child_care', label: language === 'sw' ? 'Mtoto' : 'Infant Care', to: '/nutrition' },
        { icon: 'smart_toy', label: 'MamaBot', to: '/chat' },
        { icon: 'menu_book', label: language === 'sw' ? 'Mwongozo' : 'Guide', to: '/guide' },
        { icon: 'person', label: language === 'sw' ? 'Wasifu' : 'Profile', to: '/profile' },
      ]
    : [
        { icon: 'home', label: language === 'sw' ? 'Nyumbani' : 'Home', to: '/' },
        { icon: 'assignment', label: language === 'sw' ? 'Mpango' : 'Birth Plan', to: '/birth-plan' },
        { icon: 'smart_toy', label: 'MamaBot', to: '/chat' },
        { icon: 'restaurant_menu', label: language === 'sw' ? 'Lishe' : 'Nutrition', to: '/nutrition' },
        { icon: 'person', label: language === 'sw' ? 'Wasifu' : 'Profile', to: '/profile' },
      ];

  return (
    <nav className={styles.nav} aria-label="Bottom Navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.itemActive : ''}`}
        >
          <span className={`material-symbols-outlined ${styles.icon}`}>{item.icon}</span>
          <span className={`label-md ${styles.label}`}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
