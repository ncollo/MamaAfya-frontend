import styles from "../../styles/NutritionGuide.module.css";

const foods = [
  {
    name: "Raw / Undercooked Meat",
    emoji: "🥩",
    reason: "Risk of listeria & toxoplasmosis — harmful to baby.",
    severity: "high",
  },
  {
    name: "Excessive Salt (Chumvi Nyingi)",
    emoji: "🧂",
    reason: "Raises blood pressure & worsens swelling.",
    severity: "high",
  },
  {
    name: "Alcohol (Pombe)",
    emoji: "🍺",
    reason: "Causes fetal alcohol syndrome — no safe amount.",
    severity: "high",
  },
  {
    name: "Unripe Papaya",
    emoji: "🍈",
    reason: "Contains latex which can trigger contractions.",
    severity: "medium",
  },
  {
    name: "Strong Tea / Coffee",
    emoji: "☕",
    reason: "High caffeine reduces iron absorption.",
    severity: "medium",
  },
  {
    name: "Unpasteurised Milk",
    emoji: "🥛",
    reason: "May contain harmful bacteria like listeria.",
    severity: "medium",
  },
];

export default function FoodsToAvoid() {
  return (
    <>
      {foods.map((food) => (
        <div
          key={food.name}
          className={styles.foodItem}
          style={{
            background:
              food.severity === "high" ? "#FFF1F2" : "#FFFBEB",
            border:
              food.severity === "high"
                ? "1px solid #FCA5A5"
                : "1px solid #FCD34D",
          }}
        >
          <div className={styles.foodEmoji}>
            {food.emoji}
          </div>

          <div className={styles.foodInfo}>
            <h4>{food.name}</h4>

            <p className={styles.foodBenefit}>
              {food.reason}
            </p>
          </div>

          <span
            className={styles.warningBadge}
            style={{
              background:
                food.severity === "high"
                  ? "#DC2626"
                  : "#D97706",
            }}
          >
            {food.severity === "high" ? "AVOID" : "LIMIT"}
          </span>
        </div>
      ))}
    </>
  );
}