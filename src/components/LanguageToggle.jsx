import { useAppState } from '../context/AppStateContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useAppState();

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleLanguage}
      aria-label={`Switch language to ${language === 'en' ? 'Swahili' : 'English'}`}
    >
      <span className={language === 'en' ? styles.active : ''}>EN</span>
      <span className={styles.separator}>|</span>
      <span className={language === 'sw' ? styles.active : ''}>SW</span>
    </button>
  );
}
