import { Link } from 'react-router-dom'
import { getAllStatutes } from '../data/statutes/index.js'

const EXTRA_LAWS = [
  {
    id: 'clarity-act',
    name: 'CLARITY Act',
    cite: 'H.R. 3633, 119th Cong. (2025)',
    status: 'placeholder',
    description: 'Establishes a "digital commodity" category with CFTC jurisdiction. Mutual exclusion clause with GENIUS Act creates a classification cliff — an asset cannot simultaneously be a payment stablecoin and a digital commodity.',
    glossaryLink: null,
  },
  {
    id: 'dodd-frank',
    name: 'Dodd-Frank (Selected Sections)',
    cite: '12 U.S.C. §§ 5322, 5323, 5329',
    status: 'placeholder',
    description: 'FSOC coordination authority (§§ 112, 113, 119) relevant to tri-agency stablecoin oversight gaps. Systemic risk exception and orderly liquidation authority sections intersect with GENIUS Act insolvency priority rules.',
    glossaryLink: null,
  },
]

export default function FederalLaws() {
  const federalStatutes = getAllStatutes().filter(s => s.state === 'US')

  return (
    <div className="container section">
      <header style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1>Federal Laws</h1>
        <p className="serif" style={{ color: 'var(--text-secondary)', maxWidth: '40rem', lineHeight: 1.7 }}>
          Federal legislation governing digital assets, stablecoins, and inter-agency coordination.
        </p>
      </header>

      {/* Available federal statutes from registry */}
      <div style={{ display: 'grid', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
        {federalStatutes.map(law => (
          <div key={law.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              <h2 style={{ textTransform: 'none' }}>{law.title}</h2>
              <span style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                padding: '2px 10px',
                borderRadius: '4px',
                background: 'rgba(107, 175, 141, 0.15)',
                color: '#6BAF8D',
                border: '1px solid rgba(107, 175, 141, 0.3)',
                whiteSpace: 'nowrap',
              }}>
                ✓ Full Text
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 'var(--space-sm)' }}>
              {law.cite}
            </p>
            <p className="serif" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
              {law.description}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <Link to={`/laws/federal/${law.id}`} style={{ fontSize: '0.95rem' }}>
                Read statute →
              </Link>
              {law.glossaryTerm && (
                <Link to={`/glossary/${law.glossaryTerm}`} style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                  Glossary entry
                </Link>
              )}
            </div>
          </div>
        ))}

        {/* Additional laws (not yet in reader) */}
        {EXTRA_LAWS.map(law => (
          <div key={law.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              <h2 style={{ textTransform: 'none' }}>{law.name}</h2>
              <span style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                padding: '2px 10px',
                borderRadius: '4px',
                background: 'var(--bg-soft)',
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                whiteSpace: 'nowrap',
              }}>
                ○ Coming Soon
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 'var(--space-sm)' }}>
              {law.cite}
            </p>
            <p className="serif" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              {law.description}
            </p>
          </div>
        ))}
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <p className="serif" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
          See how the GENIUS Act intersects with state DAO law in the analysis tools.
        </p>
        <Link to="/analysis" style={{ color: 'var(--accent)' }}>
          Explore Analysis →
        </Link>
      </div>
    </div>
  )
}
