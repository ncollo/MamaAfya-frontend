import styles from "../../styles/MamaBot.module.css";

export default function ChatBubble({ message }) {
  const isUser = message.type === "user";

  return (
    <div
      className={
        isUser
          ? styles.userMessageContainer
          : styles.botMessageContainer
      }
    >
      {!isUser && (
        <div className={styles.botBubbleAvatar}>
          👩‍⚕️
        </div>
      )}

      <div
        className={
          isUser
            ? styles.userBubble
            : styles.botBubble
        }
      >
        <p>{message.text}</p>

        {message.translation && (
          <div className={styles.translation}>
            "{message.translation}"
          </div>
        )}

        <span className={styles.messageTime}>
          {message.time}
          {isUser && " ✓✓"}
        </span>
      </div>
    </div>
  );
}