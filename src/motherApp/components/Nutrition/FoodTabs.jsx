import styles from "../../styles/NutritionGuide.module.css";

export default function FoodTabs({ activeTab, setActiveTab }) {
  return (
    <div className={styles.tabs}>

      <button
        className={
          activeTab === "recommended"
            ? `${styles.tab} ${styles.activeRecommended}`
            : styles.tab
        }
        onClick={() => setActiveTab("recommended")}
      >
        ✅ Recommended Daily
      </button>

      <button
        className={
          activeTab === "avoid"
            ? `${styles.tab} ${styles.activeAvoid}`
            : styles.tab
        }
        onClick={() => setActiveTab("avoid")}
      >
        ❌ Avoid
      </button>

    </div>
  );
}