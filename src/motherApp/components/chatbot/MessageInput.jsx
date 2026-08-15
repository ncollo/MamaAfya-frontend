import { useState } from 'react';
import { Send } from 'lucide-react';
import { useAppState } from '../../../context/AppStateContext';
import styles from '../../styles/MamaBot.module.css';

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState('');
  const { language } = useAppState();

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage('');
  };

  return (
    <div className={styles.inputSection}>
      <div className={styles.inputContainer}>
        <textarea
          rows={2}
          placeholder={language === 'sw' ? 'Andika kwa Kiswahili au Kiingereza...' : 'Type in English or Swahili...'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
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
    </div>
  );
}