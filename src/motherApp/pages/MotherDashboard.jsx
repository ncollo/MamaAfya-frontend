import { useNavigate } from "react-router-dom";

import Header from "../components/Dashboard/Header";
import GestationCard from "../components/Dashboard/GestationCard";
import MamaBotPreview from "../components/Dashboard/MamaBotPreview";
import QuickStats from "../components/Dashboard/QuickStats";
import AppointmentCard from "../components/Dashboard/AppointmentCard";
import DailyTip from "../components/Dashboard/DailyTip";
import FloatingButtons from "../components/Dashboard/FloatingButtons";

import styles from "../styles/MotherDashboard.module.css";

export default function MotherDashboard() {

    const navigate = useNavigate();

    return (

        <div className={styles.page}>

            <Header />

            <main className={styles.container}>

                {/* ==========================
                    HERO SECTION
                ========================== */}

                <section className={styles.heroSection}>

                    <GestationCard />

                </section>

                {/* ==========================
                    SECOND ROW
                ========================== */}

                <section className={styles.secondRow}>

                    <MamaBotPreview
                        onClick={() => navigate("/mother/chat")}
                    />

                </section>

                {/* ==========================
                    HEALTH OVERVIEW
                ========================== */}

                <section className={styles.healthSection}>

                    <div className={styles.sectionHeader}>

                        <h2>
                            Health Overview
                        </h2>

                        <p>
                            Today's progress
                        </p>

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

            <FloatingButtons
                onChat={() => navigate("/mother/chat")}
            />

        </div>

    );

}