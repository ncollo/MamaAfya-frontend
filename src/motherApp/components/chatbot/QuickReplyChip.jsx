import styles from "../../styles/MamaBot.module.css";

export default function QuickReplyChip({ text, onClick }) {
  return (
    <button
      className={styles.quickReplyChip}
      onClick={onClick}
    >
      {text}
    </button>
  );
}