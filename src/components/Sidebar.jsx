import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const chwItems = [
  { icon: "dashboard",     label: "Dashboard", to: "/chw/" },
  { icon: "person_search", label: "Patients",  to: "/chw/patients" },
  { icon: "event",         label: "Schedule",  to: "/chw/schedule" },
  { icon: "inventory_2",   label: "Inventory", to: "/chw/inventory" },
  { icon: "analytics",     label: "Reports",   to: "/chw/reports" },
];

const motherItems = [
  { icon: "home",      label: "Mother Home", to: "/mother/home" },
  { icon: "smart_toy", label: "MamaBot",     to: "/mother/chat" },
  { icon: "nutrition", label: "Nutrition",   to: "/mother/nutrition" },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.avatar}>
          <span className="material-symbols-outlined">account_circle</span>
        </div>
        <div>
          <p className={`headline-sm ${styles.portalTitle}`}>CHW Portal</p>
          <p className={`label-md ${styles.portalSub}`}>Community Health Worker</p>
        </div>
      </div>

      <nav className={styles.nav}>
        <p className={`label-sm ${styles.sectionLabel}`}>CHW Dashboard</p>
        {chwItems.map(item => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/chw/"}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="label-md">{item.label}</span>
          </NavLink>
        ))}

        <p className={`label-sm ${styles.sectionLabel}`} style={{ marginTop: 16 }}>Mother Portal</p>
        {motherItems.map(item => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="label-md">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <a href="#" className={styles.navItem} onClick={e => e.preventDefault()}>
          <span className="material-symbols-outlined">logout</span>
          <span className="label-md">Sign Out</span>
        </a>
      </div>
    </aside>
  );
}
