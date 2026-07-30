import { useState } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import styles from "../../styles/MamaBot.module.css";

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className={styles.inputSection}>

      <div className={styles.inputContainer}>

        <button
          className={`${styles.micButton} ${
            listening ? styles.micActive : ""
          }`}
          onClick={() => setListening(!listening)}
        >
          {listening ? (
            <MicOff size={18} />
          ) : (
            <Mic size={18} />
          )}
        </button>

        <input
          type="text"
          placeholder="Type in English or Swahili..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleSend()
          }
          className={styles.messageInput}
        />

        <button
          className={styles.sendButton}
          disabled={!message.trim()}
          onClick={handleSend}
        >
          <Send size={18} />
        </button>

      </div>

      {listening && (
        <p className={styles.listeningText}>
          🎙 Listening... Speak in English or Swahili
        </p>
      )}

    </div>
  );
}