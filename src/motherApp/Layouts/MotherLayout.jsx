import styles from "../styles/MotherLayout.module.css";

export default function MotherLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.phone}>
        {children}
      </div>
    </div>
  );
}