import { Calendar, ShieldCheck, AlertCircle, Baby, HeartPulse } from "lucide-react";
import { useAppState } from "../../../context/AppStateContext";
import styles from "../../styles/MotherDashboard.module.css";

export default function InfantRecoveryCard({ onLogSymptom }) {
  const { language, user } = useAppState();

  const babyAgeDays = 14; // Default demo postpartum age (2 weeks)
  const babyAgeWeeks = Math.floor(babyAgeDays / 7);

  const title = language === "sw"
    ? `Siku ${babyAgeDays} Baada ya Kujifungua (Wiki ya ${babyAgeWeeks})`
    : `${babyAgeDays} Days Postpartum (Week ${babyAgeWeeks})`;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0D9488 0%, #115E59 100%)",
        borderRadius: "var(--radius-xl, 20px)",
        padding: "24px 20px",
        color: "#FFFFFF",
        boxShadow: "0 10px 25px rgba(13, 148, 136, 0.25)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top badges */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(6px)",
            padding: "4px 12px",
            borderRadius: 9999,
            fontSize: "0.8rem",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Baby size={16} />
          {language === "sw" ? "Huduma ya Mtoto Mchanga" : "Newborn & Postpartum Care"}
        </span>

        <span
          style={{
            backgroundColor: "#22C55E",
            color: "#052E16",
            padding: "3px 10px",
            borderRadius: 9999,
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        >
          {language === "sw" ? "Maji Safi na Salama" : "Recovery Normal"}
        </span>
      </div>

      {/* Hero Content */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Baby size={38} color="#CCFBF1" />
        </div>

        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 4px", color: "#FFFFFF" }}>
            {title}
          </h2>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#CCFBF1", lineHeight: 1.4 }}>
            {language === "sw"
              ? "Ukuaji: Mtoto anaanza kutambua sauti yako. Kunyonyesha mara kwa mara (exclusive breastfeeding)."
              : "Milestone: Baby is recognizing your voice. Continue exclusive on-demand breastfeeding."}
          </p>
        </div>
      </div>

      {/* Immunization & Next Checkup Box */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          borderRadius: 12,
          padding: "12px 14px",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Calendar size={22} color="#FDE047" style={{ flexShrink: 0 }} />
        <div>
          <strong style={{ fontSize: "0.85rem", display: "block", color: "#FEF08A" }}>
            {language === "sw" ? "Chanjo Inayofuata (Wiki ya 6)" : "Next Milestone: 6-Week Immunization"}
          </strong>
          <span style={{ fontSize: "0.78rem", color: "#E2E8F0" }}>
            Penta 1, OPV 1, PCV 1 & Rota 1 • Mathare Health Centre
          </span>
        </div>
      </div>

      {/* Quick Recovery Tips / Warning Signs */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          borderRadius: 10,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          fontSize: "0.8rem",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#F1F5F9" }}>
          <HeartPulse size={16} color="#38BDF8" />
          {language === "sw" ? "Ufuatiliaji wa Afya: Hakuna Homa" : "Maternal Healing: No fever reported"}
        </span>

        <button
          onClick={onLogSymptom}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.22)",
            color: "#FFFFFF",
            padding: "4px 10px",
            borderRadius: 6,
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          {language === "sw" ? "Ripoti Dalili" : "Check-in"}
        </button>
      </div>
    </div>
  );
}
