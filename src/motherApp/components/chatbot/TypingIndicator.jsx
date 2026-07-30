import styles from "../../styles/MamaBot.module.css";

export default function TypingIndicator() {
  return (
    <div className={styles.botMessageContainer}>

      <div className={styles.botBubbleAvatar}>
        👩‍⚕️
      </div>

      <div className={styles.typingBubble}>

        <span className={styles.typingDot}></span>

        <span className={styles.typingDot}></span>

        <span className={styles.typingDot}></span>

      </div>

    </div>
  );
}