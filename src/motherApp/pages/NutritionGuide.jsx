import { useState } from "react";
import { useNavigate } from "react-router-dom";



import MotherLayout from "../Layouts/MotherLayout";
import NutritionHeader from "../components/Nutrition/NutritionHeader";
import FoodCard from "../components/Nutrition/FoodCard";
import FoodTabs from "../components/Nutrition/FoodTabs";
import RecommendedFoods from "../components/Nutrition/RecommendedFoods";
import FoodsToAvoid from "../components/Nutrition/FoodsToAvoid";
import MamaBotSuggestion from "../components/Nutrition/MamaBotSuggestion";

import styles from "../styles/NutritionGuide.module.css";

export default function NutritionGuide() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("recommended");

  return (
    <MotherLayout>
      <div className={styles.page}>
        <NutritionHeader />

        <FoodCard />

        <FoodTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className={styles.foodList}>
          {activeTab === "recommended" ? (
            <RecommendedFoods />
          ) : (
            <FoodsToAvoid />
          )}
        </div>

        <MamaBotSuggestion
          onClick={() => navigate("/mother/chat")}
        />
      </div>
    </MotherLayout>
  );
}