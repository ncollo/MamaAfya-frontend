import styles from "../../styles/NutritionGuide.module.css";

export default function NutritionPlate(){

    return(

        <div className={styles.plateCard}>

            <h2>Healthy Plate</h2>

            <div className={styles.plate}>

                <div className={styles.vegetables}>
                    Vegetables
                </div>

                <div className={styles.protein}>
                    Protein
                </div>

                <div className={styles.carbs}>
                    Whole Grains
                </div>

                <div className={styles.fruit}>
                    Fruit
                </div>

            </div>

        </div>

    );

}