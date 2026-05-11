import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const LINKS = [
  { to: '/', label: '홈', end: true },
  { to: '/books', label: '독서 목록' },
  { to: '/books/new', label: '새 기록' },
  { to: '/about', label: '소개' },
]

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand}>
          📚 Reading Log
        </NavLink>
        <nav className={styles.nav}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
