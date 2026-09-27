export default function ProgressBar({ value = 0, max = 100, label, color = 'var(--color-primary, #0D9488)', height = 10, showPercentage = true }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div style={{ width: '100%', marginBottom: '8px' }}>
      {(label || showPercentage) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary, #475569)',
            marginBottom: '6px',
          }}
        >
          {label && <span style={{ fontWeight: 500 }}>{label}</span>}
          {showPercentage && <span style={{ fontWeight: 600 }}>{percentage}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: 'var(--color-surface-subtle, #E2E8F0)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: '9999px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}
