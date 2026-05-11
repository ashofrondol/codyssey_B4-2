import styles from './Card.module.css'

export default function Card({ children, as: Tag = 'div', onClick, hoverable = false, ...rest }) {
  const className = `${styles.card} ${hoverable ? styles.hoverable : ''}`
  return (
    <Tag className={className} onClick={onClick} {...rest}>
      {children}
    </Tag>
  )
}
