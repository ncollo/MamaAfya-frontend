import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import LanguageToggle from '../components/LanguageToggle';
import styles from './Login.module.css';

const ROLE_OPTIONS = [
  { value: 'mother', title: 'Mother', description: 'Access meal plans, MamaBot, and your pregnancy dashboard.' },
  { value: 'chw', title: 'CHW', description: 'Review assigned mothers, alerts, and follow-up actions.' },
];

export default function Login() {
  const { user, login, language } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('mother');
  const [form, setForm] = useState({ fullName: '', email: '', idNumber: '', phone: '', facility: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to={user.role === 'chw' ? '/chw/' : '/home'} replace />;
  }

  const strings = language === 'sw'
    ? {
        title: 'Ingia kwenye MamaAfya',
        subtitle: 'Wamama na CHW hupata sehemu zao kulingana na jukumu lao.',
        action: 'Ingia',
        roleLabel: 'Chagua jukumu',
      }
    : {
        title: 'Sign in to MamaAfya',
        subtitle: 'Mothers and CHWs get role-specific access after login.',
        action: 'Sign in',
        roleLabel: 'Choose role',
      };

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const session = await login({ role, ...form });
      navigate(session.role === 'chw' ? '/chw/' : (location.state?.from || '/home'), { replace: true });
    } catch {
      setError(language === 'sw' ? 'Imeshindikana kuingia. Jaribu tena.' : 'Unable to sign in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.brandRow}>
            <div className={styles.logoMark} aria-hidden="true">
              <span className="material-symbols-outlined fill" style={{ fontSize: 30, color: 'var(--color-primary)' }}>pregnant_woman</span>
            </div>
            <LanguageToggle />
          </div>
          <h1 className={`headline-lg ${styles.title}`}>{strings.title}</h1>
          <p className={`body-md ${styles.subtitle}`}>{strings.subtitle}</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <p className={`label-sm ${styles.sectionLabel}`}>{strings.roleLabel}</p>
            <div className={styles.roleGrid}>
              {ROLE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.roleCard} ${role === option.value ? styles.roleCardActive : ''}`}
                  onClick={() => setRole(option.value)}
                >
                  <span className={`headline-sm ${styles.roleTitle}`}>{option.title}</span>
                  <span className={`body-sm ${styles.roleBody}`}>{option.description}</span>
                </button>
              ))}
            </div>
          </div>

          <label className={styles.field}>
            <span className={`label-sm ${styles.fieldLabel}`}>{language === 'sw' ? 'Jina kamili' : 'Full name'}</span>
            <input className={styles.input} value={form.fullName} onChange={handleChange('fullName')} placeholder="Amina Juma" required />
          </label>

          <label className={styles.field}>
            <span className={`label-sm ${styles.fieldLabel}`}>{language === 'sw' ? 'Barua pepe' : 'Email address'}</span>
            <input className={styles.input} type="email" value={form.email} onChange={handleChange('email')} placeholder="amina@example.com" required />
          </label>

          <label className={styles.field}>
            <span className={`label-sm ${styles.fieldLabel}`}>{role === 'chw' ? (language === 'sw' ? 'Namba ya wafanyakazi' : 'Staff ID') : (language === 'sw' ? 'Namba ya kitambulisho' : 'National ID')}</span>
            <input className={styles.input} value={form.idNumber} onChange={handleChange('idNumber')} placeholder={role === 'chw' ? 'CHW-1024' : '98765432'} required />
          </label>

          <label className={styles.field}>
            <span className={`label-sm ${styles.fieldLabel}`}>{language === 'sw' ? 'Namba ya simu' : 'Phone number'}</span>
            <input className={styles.input} value={form.phone} onChange={handleChange('phone')} placeholder="+254700000000" />
          </label>

          {role === 'chw' && (
            <label className={styles.field}>
              <span className={`label-sm ${styles.fieldLabel}`}>{language === 'sw' ? 'Kituo cha kazi' : 'Facility'}</span>
              <input className={styles.input} value={form.facility} onChange={handleChange('facility')} placeholder="Mathare Health Centre" />
            </label>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.submit} type="submit" disabled={submitting}>
            {submitting ? (language === 'sw' ? 'Inaingia...' : 'Signing in...') : strings.action}
          </button>
        </form>
      </div>
    </div>
  );
}
