import { useNavigate } from "react-router-dom";
import { Sparkles, ClipboardCheck, ArrowRight, Baby, Calendar } from "lucide-react";
import Header from "../components/Dashboard/Header";
import GestationCard from "../components/Dashboard/GestationCard";
import InfantRecoveryCard from "../components/Dashboard/InfantRecoveryCard";
import MamaBotPreview from "../components/Dashboard/MamaBotPreview";
import QuickStats from "../components/Dashboard/QuickStats";
import AppointmentCard from "../components/Dashboard/AppointmentCard";
import DailyTip from "../components/Dashboard/DailyTip";
import FloatingButtons from "../components/Dashboard/FloatingButtons";
import { useAppState } from "../../context/AppStateContext";
import styles from "../styles/MotherDashboard.module.css";

export default function MotherDashboard() {
  const navigate = useNavigate();
  const { phase, togglePhase, language, recordDelivery } = useAppState();

  const isPostpartum = phase === "postpartum";

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        {/* Phase Toggle / Demo Affordance */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#F1F5F9",
            borderRadius: 12,
            padding: "8px 14px",
            marginBottom: 16,
            border: "1px solid #CBD5E1",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={15} color="var(--color-primary)" />
            {language === "sw" ? "Awamu ya Huduma:" : "Care Phase:"}{" "}
            <strong style={{ color: "#0F172A" }}>
              {isPostpartum
                ? (language === "sw" ? "Baada ya Kujifungua (Postpartum)" : "Postpartum Care")
                : (language === "sw" ? "Mimba Inayoendelea (Antenatal)" : "Antenatal (Pregnancy)")}
            </strong>
          </span>

          <button
            onClick={togglePhase}
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "5px 10px",
              borderRadius: 6,
              backgroundColor: isPostpartum ? "#0D9488" : "#334155",
              color: "#FFFFFF",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {isPostpartum
              ? (language === "sw" ? "Onyesha Awamu ya Mimba" : "Switch to Antenatal")
              : (language === "sw" ? "Rekodi Kujifungua (Postpartum)" : "Log Delivery (Postpartum)")}
          </button>
        </div>

        {/* ==========================
            HERO SECTION (Phase Driven)
        ========================== */}
        <section className={styles.heroSection}>
          {isPostpartum ? (
            <InfantRecoveryCard onLogSymptom={() => navigate("/chat")} />
          ) : (
            <GestationCard />
          )}
        </section>

        {/* ==========================
            BIRTH PLAN CALLOUT (Antenatal Only)
        ========================== */}
        {!isPostpartum && (
          <section style={{ margin: "18px 0" }}>
            <div
              onClick={() => navigate("/birth-plan")}
              style={{
                background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",
                border: "1px solid #BFDBFE",
                borderRadius: 14,
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: "#DBEAFE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ClipboardCheck size={24} color="#1D4ED8" />
                </div>
                <div>
                  <strong style={{ fontSize: "0.95rem", color: "#1E3A8A", display: "block" }}>
                    {language === "sw" ? "Mpango wa Uzazi wa Dijitali" : "Digital Birth Plan"}
                  </strong>
                  <span style={{ fontSize: "0.8rem", color: "#475569" }}>
                    {language === "sw"
                      ? "Tayarisha hospitali, usafiri, na vitu vya kujifungulia"
                      : "Prepare hospital, emergency ride & maternity bag"}
                  </span>
                </div>
              </div>
              <ArrowRight size={18} color="#1D4ED8" />
            </div>
          </section>
        )}

        {/* ==========================
            SECOND ROW (MamaBot AI)
        ========================== */}
        <section className={styles.secondRow}>
          <MamaBotPreview onClick={() => navigate("/chat")} />
        </section>

        {/* ==========================
            HEALTH OVERVIEW
        ========================== */}
        <section className={styles.healthSection}>
          <div className={styles.sectionHeader}>
            <h2>{language === "sw" ? "Muhtasari wa Afya" : "Health Overview"}</h2>
            <p>{language === "sw" ? "Maendeleo ya leo" : "Today's progress"}</p>
          </div>
          <QuickStats />
        </section>

        {/* ==========================
            APPOINTMENT
        ========================== */}
        <section className={styles.cardSection}>
          <AppointmentCard />
        </section>

        {/* ==========================
            DAILY TIP
        ========================== */}
        <section className={styles.cardSection}>
          <DailyTip />
        </section>
      </main>

      <FloatingButtons onChat={() => navigate("/chat")} />
    </div>
  );
}