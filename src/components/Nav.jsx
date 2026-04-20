import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import './Nav.css'

const links = [
  { to: '/', label: 'Map', emoji: '🗺' },
  { to: '/glossary', label: 'Glossary', emoji: '📖' },
  { to: '/laws/states', label: 'State Laws', emoji: '⚖' },
  { to: '/laws/federal', label: 'Federal Laws', emoji: '🏛' },
  { to: '/analysis', label: 'Analysis', emoji: '📊' },
]

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__inner container">
        <NavLink to="/" className="nav__brand">
          Digital Assets
        </NavLink>

        <div className="nav__links">
          {links.map(({ to, label, emoji }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav__link ${isActive ? 'nav__link--active' : ''}`
              }
              end={to === '/'}
            >
              <span className="nav__emoji">{emoji}</span>
              <span className="nav__label">{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="nav__actions">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
