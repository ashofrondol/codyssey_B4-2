import styles from './RatingStars.module.css'

const MAX = 5

export default function RatingStars({ value = 0, onChange, readOnly = false, size = 'md' }) {
  const handle = (next) => {
    if (readOnly) return
    onChange?.(next)
  }

  return (
    <div className={`${styles.wrap} ${styles[size]}`} role={readOnly ? undefined : 'radiogroup'}>
      {Array.from({ length: MAX }, (_, i) => {
        const n = i + 1
        const filled = n <= value
        return (
          <button
            type="button"
            key={n}
            className={`${styles.star} ${filled ? styles.filled : ''}`}
            onClick={() => handle(n)}
            disabled={readOnly}
            aria-label={`${n}점`}
          >
            ★
          </button>
        )
      })}
      <span className={styles.count}>
        {value}/{MAX}
      </span>
    </div>
  )
}
