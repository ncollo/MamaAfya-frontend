import styles from "../../styles/MotherDashboard.module.css";

export default function MamaBotPreview({ onClick }) {
  return (
    <button
      className={styles.mamaBotCard}
      onClick={onClick}
    >
      <div className={styles.botAvatar}>
        👩‍⚕️
      </div>

      <div className={styles.botContent}>

        <div className={styles.botHeader}>

          <h3>MamaBot</h3>

          <span className={styles.onlineBadge}>
            ● ONLINE
          </span>

        </div>

        <p className={styles.botMessage}>
          Habari! How are you feeling today?
        </p>

        <p className={styles.botHint}>
          Tap to chat or report symptoms →
        </p>

      </div>

    </button>
  );
}