import { NavLink, useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import styles from "./Sidebar.module.css";

const chwItems = [
  { icon: "dashboard",     label: "Triage Dashboard", to: "/chw/" },
  { icon: "person_search", label: "Assigned Patients", to: "/chw/patients" },
  { icon: "event",         label: "Schedule Visits",  to: "/chw/schedule" },
  { icon: "inventory_2",   label: "Medical Kits",     to: "/chw/inventory" },
  { icon: "analytics",     label: "Clinical Reports", to: "/chw/reports" },
];

const doorItems = [
  { icon: "smartphone",   label: "Door 1: Mother PWA", to: "/home" },
  { icon: "local_hospital", label: "Door 3: Facility", to: "/facility" },
  { icon: "diversity_1",  label: "Door 4: Partner",    to: "/partner" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAppState();

  const handleSignOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.avatar}>
          <span className="material-symbols-outlined" style={{ color: '#0D9488' }}>medical_services</span>
        </div>
        <div>
          <p className={`headline-sm ${styles.portalTitle}`} style={{ fontWeight: 800 }}>MamaAfya</p>
          <p className={`label-md ${styles.portalSub}`}>CHW Dashboard</p>
        </div>
      </div>

      <nav className={styles.nav}>
        <p className={`label-sm ${styles.sectionLabel}`}>Triage & Field Operations</p>
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

        <p className={`label-sm ${styles.sectionLabel}`} style={{ marginTop: 20 }}>The Four Doors</p>
        {doorItems.map(item => (
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
        <div className={styles.chwBadge}>
          <p className="label-md" style={{ color: "#0F172A", fontWeight: 700 }}>
            {user?.full_name || user?.fullName || "Jane Mutua"}
          </p>
          <p className="body-sm" style={{ color: "#64748B" }}>
            {user?.location || "Mathare Health Centre"}
          </p>
        </div>
        <button className={styles.signOutBtn} onClick={handleSignOut} aria-label="Sign out">
          <span className="material-symbols-outlined">logout</span>
          <span className="label-md">Sign Out / Switch</span>
        </button>
      </div>
    </aside>
  );
}
