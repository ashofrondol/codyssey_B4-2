import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  ...rest
}) {
  const className = `${styles.button} ${styles[variant] ?? ''}`
  return (
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? '처리 중…' : children}
    </button>
  )
}
