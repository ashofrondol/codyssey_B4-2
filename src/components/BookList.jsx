import { Link } from 'react-router-dom'
import Card from './Card.jsx'
import RatingStars from './RatingStars.jsx'
import styles from './BookList.module.css'

export default function BookList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((book) => (
        <li key={book.id}>
          <Link to={`/books/${book.id}`} className={styles.link}>
            <Card hoverable>
              <div className={styles.row}>
                <div className={styles.main}>
                  <h3 className={styles.title}>{book.title}</h3>
                  <p className="muted">{book.author || '저자 미상'}</p>
                </div>
                <RatingStars value={book.rating ?? 0} readOnly size="md" />
              </div>
              {book.note && <p className={styles.note}>{book.note}</p>}
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  )
}
