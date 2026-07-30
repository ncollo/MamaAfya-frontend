import styles from './PlateChart.module.css';

export default function PlateChart({ segments }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.plate}>
        {/* Decorative segments */}
        <div className={styles.segmentTop}    style={{ background: segments[0].color }} />
        <div className={styles.segmentRight}  style={{ background: segments[1].color }} />
        <div className={styles.segmentBottom} style={{ background: segments[2].color }} />
        <div className={styles.inner} />
      </div>

      {/* Legend labels floating around */}
      <div className={`${styles.floatLabel} ${styles.top}`}>
        <span className={`label-md ${styles.chip}`} style={{ color: 'var(--color-primary)' }}>
          {segments[0].label}
        </span>
      </div>
      <div className={`${styles.floatLabel} ${styles.left}`}>
        <span className={`label-md ${styles.chip}`} style={{ color: 'var(--color-secondary)' }}>
          {segments[1].label}
        </span>
      </div>
      <div className={`${styles.floatLabel} ${styles.right}`}>
        <span className={`label-md ${styles.chip}`} style={{ color: 'var(--color-tertiary)' }}>
          {segments[2].label}
        </span>
      </div>
    </div>
  );
}
