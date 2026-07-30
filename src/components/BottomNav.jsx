import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const navItems = [
  { icon: 'home',      label: 'Home',      to: '/' },
  { icon: 'menu_book', label: 'Guide',     to: '/guide' },
  { icon: 'group',     label: 'Community', to: '/community' },
  { icon: 'person',    label: 'Profile',   to: '/profile' },
];

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      {navItems.map(item => (
        <NavLink
          key={item.label}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ''}`
          }
        >
          <span className={`material-symbols-outlined ${styles.icon}`}>{item.icon}</span>
          <span className={`label-md ${styles.label}`}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
