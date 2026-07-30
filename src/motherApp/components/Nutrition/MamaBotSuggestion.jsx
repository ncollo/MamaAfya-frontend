import { MessageCircle, ChevronRight } from "lucide-react";
import styles from "../../styles/NutritionGuide.module.css";

export default function MamaBotSuggestion({ onClick }) {
  return (
    <button
      className={styles.chatPrompt}
      onClick={onClick}
    >
      <div className={styles.chatIcon}>
        <MessageCircle size={18} />
      </div>

      <div className={styles.chatText}>
        <h4>Ask MamaBot</h4>
        <p>Get local recipes using these ingredients.</p>
      </div>

      <ChevronRight size={18} />
    </button>
  );
}