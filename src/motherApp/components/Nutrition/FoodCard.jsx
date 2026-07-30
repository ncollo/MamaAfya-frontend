import styles from "../../styles/NutritionGuide.module.css";

export default function FoodCard() {
  return (
    <div className={styles.foodCard}>

      <h3 className={styles.cardTitle}>
        🍽 Daily Portion Plate — Week 24
      </h3>

      <div className={styles.plateContainer}>

        <div className={styles.plate}>

          <div className={styles.vegetables}></div>

          <div className={styles.carbs}></div>

          <div className={styles.protein}></div>

          <div className={styles.plateCenter}>
            <span>DAILY</span>
            <span>PLATE</span>
          </div>

        </div>

        <div className={styles.legend}>

          <div className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ background: "#52B788" }}
            />
            <div>
              <strong>½ Vegetables</strong>
              <p>Sukuma wiki, spinach, carrots</p>
            </div>
          </div>

          <div className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ background: "#E9C46A" }}
            />
            <div>
              <strong>¼ Carbohydrates</strong>
              <p>Ugali, rice, sweet potato</p>
            </div>
          </div>

          <div className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ background: "#F4A261" }}
            />
            <div>
              <strong>¼ Protein</strong>
              <p>Omena, beans, eggs, lentils</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}