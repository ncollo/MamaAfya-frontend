import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MamaBot.module.css";

import ChatBubble from "../components/Chatbot/ChatBubble";
import WarningBubble from "../components/Chatbot/WarningBubble";
import QuickReplyChip from "../components/Chatbot/QuickReplyChip";
import TypingIndicator from "../components/Chatbot/TypingIndicator";
import MessageInput from "../components/Chatbot/MessageInput";
import LanguageToggle from "../../components/LanguageToggle";
import { useAppState } from "../../context/AppStateContext";
import { ArrowLeft, Sparkles, Heart } from "lucide-react";

const QUICK_REPLIES = [
  "🌸 Weekly Mental Wellness",
  "I feel fine / Niko sawa",
  "Severe headache & vision",
  "Baby movements",
  "Clinic dates",
  "Emergency SOS",
];

export default function MamaBot() {
  const navigate = useNavigate();
  const { user, language, phase, setSyncStatus } = useAppState();
  const firstName = user?.full_name?.split(" ")[0] || user?.fullName?.split(" ")[0] || "Amina";

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: language === "sw"
        ? `Habari ya leo, ${firstName}! 🌿 Mimi ni MamaBot. Unajisikiaje leo? Unaweza kuandika au kuchagua mada hapa chini.`
        : `Hello ${firstName}! 🌿 I'm MamaBot. How are you feeling today? Type your symptoms or tap a topic below.`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const triggerTriageSubmission = async (symptomText) => {
    setSyncStatus("pending");
    try {
      await fetch("/api/pwa/submit-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mother_id: user?.id || "+254700000001",
          gestational_week: phase === "postpartum" ? 40 : 32,
          symptoms: [symptomText],
        }),
      });
    } catch (e) {
      console.warn("Triage submission fallback:", e);
    }
    setSyncStatus("synced");
  };

  const handleMentalHealthCheckin = () => {
    const userMsg = {
      id: Date.now(),
      type: "user",
      text: language === "sw" ? "🌸 Ukaguzi wa Hali ya Moyo (Mental Wellness)" : "🌸 Weekly Mental Wellness Check-in",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const botCheckin = {
        id: Date.now() + 1,
        type: "bot",
        text: language === "sw"
          ? `Asante kwa kujali afya yako ya kiakili, ${firstName}. Ujauzito na uzazi huleta mabadiliko mengi ya hisia. Je, wiki hii umekuwa ukijisikia vipi mara nyingi?`
          : `Thank you for taking a moment for yourself, ${firstName}. Pregnancy and postpartum bring deep hormonal and emotional shifts. How have you been feeling emotionally this past week?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botCheckin]);
    }, 900);
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    if (text === "🌸 Weekly Mental Wellness") {
      handleMentalHealthCheckin();
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const lower = text.toLowerCase();

      // Check for High Risk / Danger signs
      if (
        lower.includes("headache") ||
        lower.includes("kichwa") ||
        lower.includes("vision") ||
        lower.includes("damu") ||
        lower.includes("bleeding") ||
        lower.includes("emergency")
      ) {
        triggerTriageSubmission(text);

        const alertMsg = {
          id: Date.now() + 1,
          type: "alert",
          text: language === "sw"
            ? "⚠️ ALAMA YA HATARI KUBWA (Hatari Kubwa): Maumivu makali ya kichwa au macho yenye giza yanaweza kuashiria shinikizo la damu (pre-eclampsia). Taarifa imetumwa kwa Jane Mutua (CHW)."
            : "⚠️ HIGH RISK DANGER SIGN: Severe headache and vision changes detected. Case escalated immediately to your Community Health Worker Jane Mutua.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        const followUp = {
          id: Date.now() + 2,
          type: "bot",
          text: language === "sw"
            ? "Jane Mutua amearifiwa na atakupigia simu mara moja. Tafadhali pumzika upande wa kushoto na unywe maji safi. Kama maumivu yanaongezeka, fika Mathare Sub-County Hospital mara moja."
            : "Jane Mutua (CHW) has been alerted on her triage dashboard. Please rest on your left side. If pain persists or worsens, proceed immediately to Mathare Sub-County Hospital.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, alertMsg, followUp]);
        return;
      }

      // Mental wellness responses
      if (
        lower.includes("overwhelmed") ||
        lower.includes("sad") ||
        lower.includes("huzuni") ||
        lower.includes("wasiwasi") ||
        lower.includes("anxious")
      ) {
        const response = {
          id: Date.now() + 1,
          type: "bot",
          text: language === "sw"
            ? "Ni kawaida kabisa kujisikia umechoka au mwenye wasiwasi wakati mwingine, Mama. Hauko peke yako. Nimeandika maelezo haya kwa CHW wako ili akupigie kukujulia hali na kukupa mawaidha. Ungependa nikuonyeshe zoezi fupi la kupumua?"
            : "It is completely valid and normal to feel overwhelmed at times, Mama. You are doing an incredible job. I have noted this in your care log so CHW Jane Mutua can provide supportive guidance. Would you like a 2-minute calming breathing exercise?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, response]);
        return;
      }

      // Default responses
      let replyText = language === "sw"
        ? "Asante. Nimepokea ujumbe wako na kuuhifadhi kwenye kumbukumbu zako za afya. Je, kuna jambo lingine ningependa nikusaidie?"
        : "Thank you, Mama. I have logged your check-in in your medical history. Is there anything else you'd like guidance on today?";

      if (lower.includes("baby movements") || lower.includes("mtoto")) {
        replyText = language === "sw"
          ? "Kuanzia wiki ya 24, unapaswa kuhisi mtoto akicheza angalau mara 10 ndani ya masaa 2 ukiwa umepumzika."
          : "From week 24 onwards, track at least 10 kicks/movements within 2 hours while resting on your left side.";
      } else if (lower.includes("clinic") || lower.includes("tarehe")) {
        replyText = language === "sw"
          ? "Kliniki yako inayofuata ya ANC imeratibiwa katika Hospitali ya Mathare Sub-County."
          : "Your upcoming clinic visit is scheduled at Mathare Sub-County Hospital.";
      } else if (lower.includes("niko sawa") || lower.includes("fine")) {
        replyText = language === "sw"
          ? "Safi sana! 🌿 Endelea kumeza vidonge vyako vya madini ya chuma (IFAS) na kunywa maji ya kutosha."
          : "Wonderful to hear! 🌿 Continue taking your daily IFAS iron supplements and drinking plenty of water.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 900);
  };

  return (
    <div className={styles.page}>
      <div className={styles.chatContainer}>
        <header className={styles.header}>
          <button className={styles.backButton} onClick={() => navigate("/home")} aria-label="Back to dashboard">
            <ArrowLeft size={22} />
          </button>

          <div className={styles.botAvatar}>👩‍⚕️</div>

          <div className={styles.headerInfo}>
            <h2>MamaBot</h2>
            <p>{language === "sw" ? "Msaidizi wa Afya na Akili" : "Maternal & Mental Health AI"}</p>
          </div>

          <LanguageToggle />
        </header>

        <div className={styles.messages}>
          <div className={styles.dateDivider}>
            {language === "sw" ? "Leo • Triage & Mazungumzo" : "Today • Triage & Check-in"}
          </div>

          {messages.map((message) => {
            if (message.type === "alert") {
              return <WarningBubble key={message.id} message={message} />;
            }
            return <ChatBubble key={message.id} message={message} />;
          })}

          {typing && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className={styles.quickReplies}>
          {QUICK_REPLIES.map((reply) => (
            <QuickReplyChip key={reply} text={reply} onClick={() => sendMessage(reply)} />
          ))}
        </div>

        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}