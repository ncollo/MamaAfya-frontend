import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import { useAppState } from '../context/AppStateContext';
import styles from './TopNav.module.css';

export default function TopNav() {
  const navigate = useNavigate();
  const { user, logout, language } = useAppState();
  const [showDoorsMenu, setShowDoorsMenu] = useState(false);

  return (
    <header className={styles.nav}>
      <div className={styles.left}>
        <div
          className={styles.avatar}
          aria-hidden="true"
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer' }}
        >
          <span className="material-symbols-outlined fill" style={{ fontSize: 22, color: 'var(--color-primary, #0D9488)' }}>
            pregnant_woman
          </span>
        </div>
        <span
          className={`headline-sm ${styles.logo}`}
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer', fontWeight: 800, color: '#0F172A' }}
        >
          MamaAfya
        </span>

        {/* 4 Doors Quick Nav Pill */}
        <div style={{ position: 'relative', marginLeft: 8 }}>
          <button
            onClick={() => setShowDoorsMenu(!showDoorsMenu)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              backgroundColor: '#F1F5F9',
              border: '1px solid #CBD5E1',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#334155',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            🚪 4 Doors ▾
          </button>

          {showDoorsMenu && (
            <div
              style={{
                position: 'absolute',
                top: 32,
                left: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                border: '1px solid #E2E8F0',
                padding: '6px',
                zIndex: 9999,
                width: 220,
              }}
              onMouseLeave={() => setShowDoorsMenu(false)}
            >
              <div
                onClick={() => { navigate('/home'); setShowDoorsMenu(false); }}
                style={{ padding: '8px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}
              >
                📱 Door 1: Mother PWA
              </div>
              <div
                onClick={() => { navigate('/chw/'); setShowDoorsMenu(false); }}
                style={{ padding: '8px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}
              >
                🩺 Door 2: CHW Dashboard
              </div>
              <div
                onClick={() => { navigate('/facility'); setShowDoorsMenu(false); }}
                style={{ padding: '8px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}
              >
                🏥 Door 3: Facility Portal
              </div>
              <div
                onClick={() => { navigate('/partner'); setShowDoorsMenu(false); }}
                style={{ padding: '8px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}
              >
                🤝 Door 4: Partner Companion
              </div>
              <div style={{ borderTop: '1px solid #F1F5F9', margin: '4px 0' }} />
              <div
                onClick={() => { logout(); navigate('/login'); setShowDoorsMenu(false); }}
                style={{ padding: '8px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: '#DC2626' }}
              >
                Sign Out / Switch Role
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <LanguageToggle />
        <button className={styles.iconBtn} type="button" aria-label="Notifications" onClick={() => navigate('/notifications')}>
          <span className="material-symbols-outlined">notifications</span>
          <span className={styles.badge} />
        </button>
      </div>
    </header>
  );
}
