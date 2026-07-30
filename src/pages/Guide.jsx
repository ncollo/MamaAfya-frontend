import { useState } from 'react';
import { dailyMeals } from '../data/nutrition';
import PlateChart from '../components/PlateChart';
import IngredientCard from '../components/IngredientCard';
import styles from './Guide.module.css';

const mealKeys = ['breakfast', 'lunch', 'dinner'];

export default function Guide() {
  const [activeMeal, setActiveMeal] = useState('breakfast');
  const meal = dailyMeals[activeMeal];

  return (
    <div className={styles.page}>
      {/* Page header */}
      <header className={styles.header}>
        <h1 className={`headline-lg ${styles.title}`}>MamaAfya Guide</h1>
        <p className={`body-md ${styles.sub}`}>Nourishing you and your baby with local goodness.</p>
      </header>

      {/* Meal tab switcher */}
      <div className={styles.tabRow}>
        {mealKeys.map(key => {
          const m = dailyMeals[key];
          return (
            <button
              key={key}
              className={`label-md ${styles.tab} ${activeMeal === key ? styles.tabActive : ''}`}
              onClick={() => setActiveMeal(key)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{m.icon}</span>
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Daily plate section */}
      <section className={styles.plateSection}>
        <div className={styles.plateSectionHeader}>
          <h2 className={`headline-md ${styles.plateTitle}`}>{meal.title}</h2>
          <span className="material-symbols-outlined fill" style={{ color: 'var(--color-secondary)', fontSize: 28 }}>restaurant_menu</span>
        </div>
        <p className={`body-md ${styles.plateDesc}`}>{meal.description}</p>

        {/* Plate visual */}
        <div className={styles.plateWrapper}>
          <PlateChart segments={meal.plate.segments} />
        </div>
      </section>

      {/* Ingredients */}
      <section>
        <h3 className={`headline-sm ${styles.ingredientsTitle}`}>Key Ingredients</h3>
        <div className={styles.ingredientsList}>
          {meal.ingredients.map(ingredient => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </section>

      {/* MamaBot CTA */}
      <div className={styles.botCta}>
        <div className={styles.botCtaIcon}>
          <span className="material-symbols-outlined fill">smart_toy</span>
        </div>
        <div className={styles.botCtaText}>
          <p className="label-md">Ask MamaBot</p>
          <p className="body-sm">For local recipes using these ingredients</p>
        </div>
        <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary)', opacity: 0.7 }}>chevron_right</span>
      </div>
    </div>
  );
}
