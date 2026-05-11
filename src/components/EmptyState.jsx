import styles from './Status.module.css'

export default function EmptyState({
  title = '표시할 데이터가 없습니다.',
  description,
  action,
}) {
  return (
    <div className={styles.status}>
      <p className={styles.message}>📭 {title}</p>
      {description && <p className="muted">{description}</p>}
      {action}
    </div>
  )
}
