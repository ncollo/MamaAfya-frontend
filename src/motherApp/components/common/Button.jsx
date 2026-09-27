export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon = null,
  style = {},
  className = '',
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-family)',
    fontWeight: 600,
    borderRadius: 'var(--radius-md, 10px)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.18s ease',
    minHeight: 'var(--min-tap-target, 44px)',
    width: fullWidth ? '100%' : 'auto',
    padding: size === 'sm' ? '8px 14px' : size === 'lg' ? '14px 24px' : '10px 18px',
    fontSize: size === 'sm' ? '0.8125rem' : size === 'lg' ? '1rem' : '0.9375rem',
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-primary, #0D9488)',
      color: '#FFFFFF',
      borderColor: 'var(--color-primary, #0D9488)',
    },
    secondary: {
      backgroundColor: 'var(--color-surface-subtle, #F1F5F9)',
      color: 'var(--color-text-primary, #0F172A)',
      borderColor: 'var(--color-border, #E2E8F0)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary, #0D9488)',
      borderColor: 'var(--color-primary, #0D9488)',
    },
    danger: {
      backgroundColor: 'var(--risk-high, #DC2626)',
      color: '#FFFFFF',
      borderColor: 'var(--risk-high, #DC2626)',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...baseStyles,
        ...(variantStyles[variant] || variantStyles.primary),
        ...style,
      }}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
}
