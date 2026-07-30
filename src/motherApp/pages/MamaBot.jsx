import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MamaBot.module.css";

import ChatBubble from "../components/Chatbot/ChatBubble";
import WarningBubble from "../components/Chatbot/WarningBubble";
import QuickReplyChip from "../components/Chatbot/QuickReplyChip";
import TypingIndicator from "../components/Chatbot/TypingIndicator";
import MessageInput from "../components/Chatbot/MessageInput";

import { ArrowLeft, Mic } from "lucide-react";

const INITIAL_MESSAGES = [
  {
    id: 1,
    type: "bot",
    text: "Habari Amina! 🌿 Tell me what you are feeling, or tap a button below.",
    time: "12:28",
  },
  {
    id: 2,
    type: "user",
    text: "Miguu inavimba na naumwa na kichwa",
    translation: "My feet are swelling and I have a headache",
    time: "12:29",
  },
  {
    id: 3,
    type: "alert",
    text: "⚠️ Danger sign detected: Foot swelling + headache may indicate pre-eclampsia. Escalating your case to Community Health Worker Nurse Mary Otieno…",
    time: "12:29",
  },
  {
    id: 4,
    type: "bot",
    text: "Nurse Mary has been notified and will call you within 15 minutes. Please lie on your left side and avoid salty foods. Shall I send you directions to the nearest clinic?",
    time: "12:30",
  },
];

const QUICK_REPLIES = [
  "I feel fine / Niko sawa",
  "Clinic dates",
  "Baby movements",
  "Nutrition help",
  "Contact CHW",
  "Emergency",
];

const BOT_RESPONSES = {
  "I feel fine / Niko sawa":
    "That's wonderful 🌿 Continue taking your supplements and monitoring baby movements.",

  "Clinic dates":
    "Your next ANC appointment is Thursday, 19 June 2026 at 9:00 AM.",

  "Baby movements":
    "From week 24 you should feel at least 10 baby movements within 2 hours.",

  "Nutrition help":
    "Eat iron-rich foods like sukuma wiki, omena and lentils. Drink plenty of water too.",

  "Contact CHW":
    "Connecting you with Nurse Mary Otieno...",

  Emergency:
    "If this is a real emergency please proceed to the nearest health facility immediately.",
};

export default function MamaBot() {

  const navigate = useNavigate();

  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null); 
    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTyping(true);

    setTimeout(() => {

      setTyping(false);

      const reply = {
        id: Date.now() + 1,
        type: "bot",
        text:
          BOT_RESPONSES[text] ||
          "Asante. I've recorded your symptoms. Is there anything else you'd like help with today?",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, reply]);

    }, 1200);
  };

  return (

    <div className={styles.page}>

      <div className={styles.chatContainer}>

        <header className={styles.header}>

          <button
            className={styles.backButton}
            onClick={() => navigate("/mother/home")}
          >
            <ArrowLeft size={22} />
          </button>

          <div className={styles.botAvatar}>
            👩‍⚕️
          </div>

          <div className={styles.headerInfo}>

            <h2>MamaBot</h2>

            <p>● Online • AI Pregnancy Assistant</p>

          </div>

          <div className={styles.languageBadge}>
            EN | SW
          </div>

          <button className={styles.headerMic}>
            <Mic size={18} />
          </button>

        </header>

        <div className={styles.messages}>

          <div className={styles.dateDivider}>
            Today, 16 June
          </div>

          {messages.map((message) => {

            if (message.type === "alert") {
              return (
                <WarningBubble
                  key={message.id}
                  message={message}
                />
              );
            }

            return (
              <ChatBubble
                key={message.id}
                message={message}
              />
            );

          })}

          {typing && <TypingIndicator />}

          <div ref={messagesEndRef} />

        </div>
        <MessageInput onSend={sendMessage} />

      </div>
      <div className={styles.quickRepliesContainer}>
        <QuickReplyChip onReply={sendMessage} />
      </div>
    </div>
  );
}