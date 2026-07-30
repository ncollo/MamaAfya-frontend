import { useState } from 'react';
import { weeklyPlan } from '../data/nutrition';
import styles from './Weekly.module.css';

export default function Weekly() {
  const [activeDay, setActiveDay] = useState('Mon');

  const dayData = weeklyPlan.find(d => d.day === activeDay);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={`headline-lg ${styles.title}`}>Weekly Meal Plan</h1>
        <p className={`body-md ${styles.sub}`}>A balanced 7-day plan using local Kenyan ingredients.</p>
      </header>

      {/* Day selector */}
      <div className={styles.dayRow}>
        {weeklyPlan.map(d => (
          <button
            key={d.day}
            className={`label-md ${styles.dayBtn} ${activeDay === d.day ? styles.dayBtnActive : ''}`}
            onClick={() => setActiveDay(d.day)}
          >
            {d.day}
          </button>
        ))}
      </div>

      {/* Meals for selected day */}
      {dayData && (
        <div className={styles.mealCards}>
          {[
            { label: 'Breakfast', icon: 'wb_sunny',    value: dayData.breakfast, color: 'primary' },
            { label: 'Lunch',     icon: 'light_mode',  value: dayData.lunch,     color: 'tertiary' },
            { label: 'Dinner',    icon: 'nights_stay', value: dayData.dinner,    color: 'secondary' },
          ].map(m => (
            <div key={m.label} className={`${styles.mealCard} ${styles[`meal_${m.color}`]}`}>
              <div className={styles.mealCardIcon}>
                <span className="material-symbols-outlined fill">{m.icon}</span>
              </div>
              <div className={styles.mealCardInfo}>
                <p className={`label-sm ${styles.mealLabel}`}>{m.label}</p>
                <p className={`headline-sm ${styles.mealValue}`}>{m.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full week list */}
      <section>
        <h2 className={`headline-sm ${styles.sectionTitle}`}>Full Week Overview</h2>
        <div className={styles.weekTable}>
          {weeklyPlan.map(d => (
            <button
              key={d.day}
              className={`${styles.weekRow} ${activeDay === d.day ? styles.weekRowActive : ''}`}
              onClick={() => setActiveDay(d.day)}
            >
              <span className={`label-md ${styles.dayTag}`}>{d.day}</span>
              <div className={styles.weekRowMeals}>
                <span className="body-sm">{d.breakfast}</span>
                <span className={`label-sm ${styles.dot}`}>·</span>
                <span className="body-sm">{d.lunch}</span>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-outline)' }}>
                chevron_right
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
