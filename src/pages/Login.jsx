import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import LanguageToggle from '../components/LanguageToggle';
import styles from './Login.module.css';

const ROLE_OPTIONS = [
  {
    value: 'mother',
    title: 'Mother (PWA)',
    titleSw: 'Mama (PWA)',
    description: 'Pregnancy tracking, birth plan builder, mental wellness, SOS panic button.',
  },
  {
    value: 'chw',
    title: 'CHW Dashboard',
    titleSw: 'Dashibodi ya CHW',
    description: 'Prioritized clinical triage queue, real-time alerts, proxy data entry.',
  },
  {
    value: 'facility_staff',
    title: 'Facility Portal',
    titleSw: 'Kituo cha Afya',
    description: 'Rapid clinical admissions intake, digital birth plan & symptom history pull-up.',
  },
  {
    value: 'partner',
    title: 'Partner Companion',
    titleSw: 'Mwandamizi / Mume',
    description: 'Read-only emergency alerts, next clinic dates, and companion guidance.',
  },
];

const PRESETS = {
  mother: { fullName: 'Amina Wanjiru', email: 'amina@mamaafya.org', phone: '+254700000001', idNumber: 'ID-887766' },
  chw: { fullName: 'Jane Mutua', email: 'chw@mamaafya.org', phone: '+254711000001', idNumber: 'CHW-1024', facility: 'Mathare Health Centre' },
  facility_staff: { fullName: 'Dr. Omondi', email: 'clinic@mamaafya.org', phone: '+254711000002', idNumber: 'MED-4421', facility: 'Mathare Sub-County Hospital' },
  partner: { fullName: 'John Wanjiru', email: 'partner@mamaafya.org', phone: '+254700000003', idNumber: 'ID-993311' },
};

export default function Login() {
  const { user, login, language } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('mother');
  const [form, setForm] = useState(PRESETS.mother);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    if (user.role === 'chw') return <Navigate to="/chw/" replace />;
    if (user.role === 'facility_staff') return <Navigate to="/facility/" replace />;
    if (user.role === 'partner') return <Navigate to="/partner/" replace />;
    return <Navigate to="/home" replace />;
  }

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setForm(PRESETS[newRole] || { fullName: '', email: '', idNumber: '', phone: '', facility: '' });
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
      if (session.role === 'chw') navigate('/chw/', { replace: true });
      else if (session.role === 'facility_staff') navigate('/facility/', { replace: true });
      else if (session.role === 'partner') navigate('/partner/', { replace: true });
      else navigate(location.state?.from || '/home', { replace: true });
    } catch (err) {
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
              <span className="material-symbols-outlined fill" style={{ fontSize: 32, color: 'var(--color-primary)' }}>
                pregnant_woman
              </span>
            </div>
            <LanguageToggle />
          </div>
          <h1 className={`headline-lg ${styles.title}`}>
            {language === 'sw' ? 'Ingia kwenye MamaAfya' : 'Sign in to MamaAfya'}
          </h1>
          <p className={`body-md ${styles.subtitle}`}>
            {language === 'sw'
              ? 'Mfumo mmoja wenye milango minne (PWA, CHW, Kituo cha Afya, Mwandamizi).'
              : 'One system with four doors (Mother PWA, CHW Dashboard, Facility Portal, Partner Interface).'}
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <p className={`label-sm ${styles.sectionLabel}`}>
              {language === 'sw' ? 'Chagua mlango wako (Role)' : 'Select access door (Role)'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {ROLE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.roleCard} ${role === option.value ? styles.roleCardActive : ''}`}
                  onClick={() => handleRoleChange(option.value)}
                  style={{ textAlign: 'left', padding: '12px' }}
                >
                  <span className={`headline-sm ${styles.roleTitle}`} style={{ fontSize: '0.95rem' }}>
                    {language === 'sw' ? option.titleSw : option.title}
                  </span>
                  <span className={`body-sm ${styles.roleBody}`} style={{ fontSize: '0.78rem', marginTop: 4, display: 'block' }}>
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <label className={styles.field}>
            <span className={`label-sm ${styles.fieldLabel}`}>
              {language === 'sw' ? 'Jina kamili' : 'Full name'}
            </span>
            <input className={styles.input} value={form.fullName} onChange={handleChange('fullName')} required />
          </label>

          <label className={styles.field}>
            <span className={`label-sm ${styles.fieldLabel}`}>
              {language === 'sw' ? 'Barua pepe' : 'Email address'}
            </span>
            <input className={styles.input} type="email" value={form.email} onChange={handleChange('email')} required />
          </label>

          <label className={styles.field}>
            <span className={`label-sm ${styles.fieldLabel}`}>
              {language === 'sw' ? 'Namba ya simu' : 'Phone number'}
            </span>
            <input className={styles.input} value={form.phone} onChange={handleChange('phone')} required />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.submit} type="submit" disabled={submitting}>
            {submitting
              ? (language === 'sw' ? 'Inaingia...' : 'Entering system...')
              : (language === 'sw' ? `Ingia kama ${role.toUpperCase()}` : `Enter as ${role.toUpperCase()}`)}
          </button>
        </form>
      </div>
    </div>
  );
}
