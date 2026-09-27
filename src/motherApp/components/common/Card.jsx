export default function Card({ children, className = '', title, subtitle, headerAction, style = {} }) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'var(--color-surface, #FFFFFF)',
        borderRadius: 'var(--radius-lg, 14px)',
        border: '1px solid var(--color-border, #E2E8F0)',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.06))',
        marginBottom: '1rem',
        ...style,
      }}
    >
      {(title || subtitle || headerAction) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem',
            borderBottom: '1px solid var(--color-border-subtle, #EEF2F6)',
            paddingBottom: '0.75rem',
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary, #0F172A)',
                  margin: 0,
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-muted, #64748B)',
                  margin: '4px 0 0',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
