import styles from './IngredientCard.module.css';

const colorMap = {
  primary:   { bg: 'var(--color-primary-container)',   text: 'var(--color-primary)',   chip: 'rgba(69,97,78,0.1)' },
  secondary: { bg: 'var(--color-secondary-container)', text: 'var(--color-secondary)', chip: 'rgba(151,71,37,0.1)' },
  tertiary:  { bg: 'var(--color-tertiary-container)',  text: 'var(--color-tertiary)',  chip: 'rgba(113,92,0,0.1)' },
};

export default function IngredientCard({ ingredient }) {
  const c = colorMap[ingredient.color] || colorMap.primary;

  return (
    <div className={styles.card}>
      {/* Color accent strip */}
      <div className={styles.accent} style={{ backgroundColor: c.bg }}>
        <span className="material-symbols-outlined fill" style={{ fontSize: 32, color: c.text }}>
          {ingredient.icon}
        </span>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <h4 className={`headline-sm ${styles.name}`} style={{ color: c.text }}>
          {ingredient.name}
        </h4>
        <p className={`body-sm ${styles.benefit}`}>{ingredient.benefit}</p>

        {/* Nutrient chips */}
        <div className={styles.chips}>
          {ingredient.nutrients.map(n => (
            <span key={n} className={`label-sm ${styles.chip}`} style={{ background: c.chip, color: c.text }}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
