import { Baby } from "lucide-react";
import styles from "../../styles/MotherDashboard.module.css";

export default function GestationCard() {
  return (
    <section className={styles.gestationCard}>

      <div className={styles.statusBadge}>
        <span className={styles.liveDot}></span>
        <span>SYSTEM STATUS — LIVE</span>
      </div>

      <div className={styles.gestationContent}>

        <div className={styles.gestationInfo}>

          <p className={styles.cardLabel}>
            Gestational Age
          </p>

          <h2 className={styles.weekNumber}>
            Week 24
          </h2>

          <p className={styles.trimester}>
            Trimester 2 • Day 168 of 280
          </p>

        </div>

        <div className={styles.babySection}>

          <div className={styles.babyIconBox}>

            <Baby
              size={52}
              strokeWidth={1.8}
            />

          </div>

          <p className={styles.babySize}>

            Size of
            <br />
            maize cob

          </p>

        </div>

      </div>

      <div className={styles.progressSection}>

        <div className={styles.progressHeader}>

          <span>
            Pregnancy Progress
          </span>

          <strong>
            60%
          </strong>

        </div>

        <div className={styles.progressBar}>

          <div
            className={styles.progressFill}
            style={{ width: "60%" }}
          ></div>

        </div>

        <div className={styles.progressFooter}>

          <span>
            Conception
          </span>

          <span>
            Due • Sept 2026
          </span>

        </div>

      </div>

      <div className={styles.gestationFooter}>

        <div className={styles.footerCard}>

          <h4>Baby Growth</h4>

          <p>
            Baby is developing hearing and responds to sounds.
          </p>

        </div>

        <div className={styles.footerCard}>

          <h4>Mother</h4>

          <p>
            Stay hydrated and monitor baby's kicks today.
          </p>

        </div>

      </div>

    </section>
  );
}