import styles from "../../styles/MamaBot.module.css";

export default function WarningBubble({ message }) {
  return (
    <div className={styles.warningContainer}>

      <div className={styles.warningCard}>

        <p className={styles.warningText}>
          {message.text}
        </p>

        <div className={styles.warningStatus}>

          <span className={styles.warningDot}></span>

          <span>ESCALATING...</span>

        </div>

      </div>

    </div>
  );
}