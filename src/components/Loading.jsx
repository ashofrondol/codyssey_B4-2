import styles from './Status.module.css'

export default function Loading({ message = '불러오는 중…' }) {
  return (
    <div className={styles.status} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </div>
  )
}
