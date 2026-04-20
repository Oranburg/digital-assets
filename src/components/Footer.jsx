import { useCallback } from 'react'
import './Footer.css'

export default function Footer() {
  const handleContact = useCallback(() => {
    // Obfuscated email: assembled at runtime so scrapers can't find it in source
    const u = 'seth'
    const d = 'oranburg'
    const t = 'law'
    window.location.href = `ma` + `ilto:${u}@${d}.${t}`
  }, [])

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <a href="https://oranburg.law" className="footer__logo">
            Oranburg.Law
          </a>
          <p className="footer__tagline serif">
            Seth C. Oranburg, Professor of Law
          </p>
        </div>

        <nav className="footer__links">
          <a href="https://oranburg.law">Main Site</a>
          <a href="https://oranburg.law/cv/">CV</a>
          <a href="https://oranburg.law/blog/">Blog</a>
          <button onClick={handleContact} className="footer__contact">
            Contact
          </button>
        </nav>

        <p className="footer__copyright">
          Scholarly content is original work. Code is MIT licensed.
        </p>
      </div>
    </footer>
  )
}
