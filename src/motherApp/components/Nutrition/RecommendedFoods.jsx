import styles from "../../styles/NutritionGuide.module.css";

const foods = [
  {
    name: "Sukuma Wiki",
    emoji: "🥬",
    benefit: "Rich in iron, folic acid & vitamin K",
    portion: "2 handfuls daily",
    trimester: "All trimesters",
    bg: "#f0fdf4",
    border: "#86efac",
    tag: "IRON",
    tagBg: "#dcfce7",
    tagColor: "#166534",
  },
  {
    name: "Uji (Millet Porridge)",
    emoji: "🫕",
    benefit: "Energy, calcium & B vitamins",
    portion: "1 large cup (300ml)",
    trimester: "All trimesters",
    bg: "#fffbeb",
    border: "#fcd34d",
    tag: "ENERGY",
    tagBg: "#fef3c7",
    tagColor: "#92400e",
  },
  {
    name: "Omena",
    emoji: "🐟",
    benefit: "Omega-3 fatty acids & protein",
    portion: "2–3 tablespoons",
    trimester: "T2 & T3",
    bg: "#fff7ed",
    border: "#fdba74",
    tag: "OMEGA-3",
    tagBg: "#ffedd5",
    tagColor: "#9a3412",
  },
  {
    name: "Lentils (Dengu)",
    emoji: "🫘",
    benefit: "Protein, iron & folate",
    portion: "½ cup cooked",
    trimester: "All trimesters",
    bg: "#f0f9ff",
    border: "#7dd3fc",
    tag: "PROTEIN",
    tagBg: "#e0f2fe",
    tagColor: "#075985",
  },
  {
    name: "Avocado",
    emoji: "🥑",
    benefit: "Healthy fats & folate",
    portion: "½ avocado",
    trimester: "T2 & T3",
    bg: "#f0fdf4",
    border: "#86efac",
    tag: "FOLATE",
    tagBg: "#dcfce7",
    tagColor: "#166534",
  },
  {
    name: "Sweet Potato",
    emoji: "🍠",
    benefit: "Vitamin A & complex carbohydrates",
    portion: "1 medium potato",
    trimester: "All trimesters",
    bg: "#fff7ed",
    border: "#fdba74",
    tag: "VIT A",
    tagBg: "#ffedd5",
    tagColor: "#9a3412",
  },
];

export default function RecommendedFoods() {
  return (
    <>
      {foods.map((food) => (
        <div
          key={food.name}
          className={styles.foodItem}
          style={{
            background: food.bg,
            border: `1px solid ${food.border}`,
          }}
        >
          <div className={styles.foodEmoji}>
            {food.emoji}
          </div>

          <div className={styles.foodInfo}>
            <div className={styles.foodTop}>

              <h4>{food.name}</h4>

              <span
                className={styles.foodTag}
                style={{
                  background: food.tagBg,
                  color: food.tagColor,
                }}
              >
                {food.tag}
              </span>

            </div>

            <p className={styles.foodBenefit}>
              {food.benefit}
            </p>
          </div>

          <div className={styles.foodRight}>
            <strong>{food.portion}</strong>
            <small>{food.trimester}</small>
          </div>
        </div>
      ))}
    </>
  );
}