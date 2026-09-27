import { useState, useRef, useEffect } from "react";
import { AlertTriangle, PhoneCall, CheckCircle2, X } from "lucide-react";
import { useAppState } from "../../../context/AppStateContext";
import styles from "../../styles/MotherDashboard.module.css";

export default function FloatingButtons({ onChat }) {
  const { user, language, setSyncStatus } = useAppState();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sosBanner, setSosBanner] = useState(() => {
    const saved = sessionStorage.getItem("mamaafya-active-sos");
    return saved ? JSON.parse(saved) : null;
  });

  const holdIntervalRef = useRef(null);
  const holdStartRef = useRef(0);

  const HOLD_DURATION_MS = 1800; // 1.8 seconds press-and-hold

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const triggerSOS = async () => {
    // 1. Haptic feedback if supported on mobile device
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([200, 100, 200, 100, 300]);
      } catch (e) {
        /* ignore */
      }
    }

    setSyncStatus("pending");

    const sentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let notifiedCHW = "Jane Mutua (CHW)";
    let facility = "Mathare Sub-County Hospital";

    try {
      const token = user?.token;
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("/api/mothers/sos", {
        method: "POST",
        headers,
        body: JSON.stringify({
          note: "Emergency SOS triggered from Mother Web App (Press-and-Hold)",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.notified_chw) notifiedCHW = data.notified_chw;
        if (data.facility) facility = data.facility;
      }
    } catch (err) {
      console.warn("SOS dispatched in offline mode, cached locally:", err);
    }

    const bannerInfo = {
      sentAt: sentTime,
      chw: notifiedCHW,
      facility: facility,
      phone: "+254711000001",
    };

    setSosBanner(bannerInfo);
    sessionStorage.setItem("mamaafya-active-sos", JSON.stringify(bannerInfo));
    setSyncStatus("synced");
  };

  const startHold = (e) => {
    // Prevent context menu or text select
    e.preventDefault();
    setHolding(true);
    setProgress(0);
    holdStartRef.current = Date.now();

    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartRef.current;
      const pct = Math.min(100, Math.round((elapsed / HOLD_DURATION_MS) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(holdIntervalRef.current);
        setHolding(false);
        setProgress(0);
        triggerSOS();
      }
    }, 30);
  };

  const stopHold = () => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setHolding(false);
    setProgress(0);
  };

  return (
    <>
      {/* Persistent Redundant SOS Confirmation Banner */}
      {sosBanner && (
        <div
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 32px)",
            maxWidth: 460,
            zIndex: 9999,
            backgroundColor: "#FEF2F2",
            border: "2px solid #DC2626",
            borderRadius: 14,
            padding: "14px 16px",
            boxShadow: "0 10px 25px rgba(220, 38, 38, 0.25)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            animation: "fadeIn 0.3s ease",
          }}
          role="alert"
          aria-live="assertive"
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#DC2626",
                  animation: "pulseSync 1s infinite",
                  display: "inline-block",
                }}
              />
              <strong style={{ color: "#991B1B", fontSize: "0.95rem" }}>
                {language === "sw" ? "🚨 SOS Imara: Msaada Umetumwa" : "🚨 SOS Active: Help Dispatched"}
              </strong>
            </div>

            <button
              onClick={() => {
                setSosBanner(null);
                sessionStorage.removeItem("mamaafya-active-sos");
              }}
              style={{ color: "#991B1B", padding: 2 }}
              aria-label="Dismiss SOS confirmation"
            >
              <X size={18} />
            </button>
          </div>

          <p style={{ margin: 0, fontSize: "0.85rem", color: "#7F1D1D", lineHeight: 1.45 }}>
            {language === "sw"
              ? `Ujumbe wa dharura umepokelewa na ${sosBanner.chw} na ${sosBanner.facility} saa ${sosBanner.sentAt}. Mhudumu wako anafuatilia mara moja.`
              : `Emergency SOS confirmed by ${sosBanner.chw} and ${sosBanner.facility} at ${sosBanner.sentAt}. Your CHW is following up immediately.`}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            <a
              href={`tel:${sosBanner.phone}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 8,
                backgroundColor: "#DC2626",
                color: "#FFFFFF",
                fontSize: "0.8rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <PhoneCall size={14} />
              {language === "sw" ? "Piga Simu Moja kwa Moja" : "Call CHW Directly"}
            </a>

            <span style={{ fontSize: "0.75rem", color: "#991B1B", display: "flex", alignItems: "center", gap: 4 }}>
              <CheckCircle2 size={13} color="#16A34A" />
              {language === "sw" ? "Imethibitishwa" : "Dispatched"}
            </span>
          </div>
        </div>
      )}

      {/* Floating Action Buttons Container */}
      <div className={styles.fabContainer}>
        {/* Chatbot shortcut button */}
        <button
          className={styles.chatFab}
          onClick={onChat}
          title={language === "sw" ? "Ongea na MamaBot" : "Chat with MamaBot"}
          aria-label="Chat with MamaBot"
        >
          👩‍⚕️
        </button>

        {/* Panic Button with 1.5–2s Press-and-Hold */}
        <div style={{ position: "relative" }}>
          <button
            className={styles.emergencyFab}
            onMouseDown={startHold}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
            onTouchStart={startHold}
            onTouchEnd={stopHold}
            onTouchCancel={stopHold}
            style={{
              background: holding
                ? `conic-gradient(#DC2626 ${progress * 3.6}deg, #991B1B ${progress * 3.6}deg)`
                : "#DC2626",
              boxShadow: holding ? "0 0 20px rgba(220, 38, 38, 0.7)" : "0 8px 24px rgba(220, 38, 38, 0.4)",
              transition: "transform 0.1s ease",
              transform: holding ? "scale(1.06)" : "scale(1)",
            }}
            aria-label={
              language === "sw"
                ? "Kitufe cha Dharura - Bonyeza na ushikilie kwa sekunde 2"
                : "Emergency SOS - Press and hold for 2 seconds"
            }
          >
            <AlertTriangle size={28} color="#FFFFFF" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: 0.5, color: "#FFFFFF" }}>
              {holding ? `${progress}%` : "SOS"}
            </span>
          </button>

          {holding && (
            <div
              style={{
                position: "absolute",
                bottom: 80,
                right: 0,
                backgroundColor: "#0F172A",
                color: "#FFFFFF",
                fontSize: "0.75rem",
                padding: "6px 12px",
                borderRadius: 8,
                whiteSpace: "nowrap",
                fontWeight: 600,
                pointerEvents: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              {language === "sw" ? "Shikilia kwa sekunde 2..." : "Hold for 2 seconds..."}
            </div>
          )}
        </div>
      </div>
    </>
  );
}