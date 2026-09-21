import { NavLink } from 'react-router-dom'
import { ROUTES, NAV_LINKS } from '../routes.js'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to={ROUTES.home} className={styles.brand}>
          📚 Reading Log
        </NavLink>
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
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
