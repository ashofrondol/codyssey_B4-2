import styles from './Input.module.css'

export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  error,
  required = false,
  rows = 5,
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
      <textarea
        className={`${styles.input} ${error ? styles.invalid : ''}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        {...rest}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  )
}
