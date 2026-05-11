import styles from './Input.module.css'

export default function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error,
  required = false,
  ...rest
}) {
  return (
    <label className={styles.field}>
      {label && (
        <span className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
      )}
      <input
        className={`${styles.input} ${error ? styles.invalid : ''}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  )
}
