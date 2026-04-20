import { useState, useEffect } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav__inner container">
        <NavLink to="/" className="nav__brand" aria-label="Digital Assets home">
          Digital Assets
        </NavLink>

        {/* Desktop links */}
        <div className="nav__links" role="list">
          {links.map(({ to, label, emoji }) => (
            <NavLink
              key={to}
              to={to}
              role="listitem"
              className={({ isActive }) =>
                `nav__link ${isActive ? 'nav__link--active' : ''}`
              }
              end={to === '/'}
            >
              <span className="nav__emoji" aria-hidden="true">{emoji}</span>
              <span className="nav__label">{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="nav__actions">
          <ThemeToggle />
          <button
            className="nav__hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="nav__hamburger-icon" aria-hidden="true">
              {menuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="nav__mobile" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          {links.map(({ to, label, emoji }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `nav__mobile-link ${isActive ? 'nav__mobile-link--active' : ''}`
              }
              end={to === '/'}
            >
              <span className="nav__emoji" aria-hidden="true">{emoji}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
