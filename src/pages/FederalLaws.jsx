import { Link } from 'react-router-dom'

const laws = [
  { id: 'genius-act', name: 'GENIUS Act', cite: 'Pub. L. No. 119-27, 139 Stat. 419 (2025)', status: 'available', description: 'Comprehensive federal framework for payment stablecoin issuers. Reserve requirements, attestations, insolvency priority, and inter-agency coordination.' },
  { id: 'clarity-act', name: 'CLARITY Act', cite: 'H.R. 3633, 119th Cong. (2025)', status: 'placeholder', description: 'Establishes "digital commodity" category with CFTC jurisdiction. Mutual exclusion clause with GENIUS Act creates classification cliff.' },
  { id: 'dodd-frank', name: 'Dodd-Frank (Selected Sections)', cite: '12 U.S.C. §§ 5322, 5323, 5329', status: 'placeholder', description: 'FSOC coordination authority (§§ 112, 113, 119) relevant to tri-agency stablecoin oversight gaps.' },
]

export default function FederalLaws() {
  return (
    <div className="container section">
      <header style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1>Federal Laws</h1>
        <p className="serif" style={{ color: 'var(--text-secondary)', maxWidth: '40rem' }}>
          Federal legislation governing digital assets, stablecoins, and inter-agency coordination.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
        {laws.map(law => (
          <div key={law.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
              <h2 style={{ textTransform: 'none' }}>{law.name}</h2>
              <span className={`layer-badge layer-badge--3`}>
                {law.status === 'available' ? '✓ Available' : '○ Coming'}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 'var(--space-sm)' }}>
              {law.cite}
            </p>
            <p className="serif" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {law.description}
            </p>
            {law.id === 'genius-act' && (
              <div style={{ marginTop: 'var(--space-md)' }}>
                <Link to="/glossary/genius-act" style={{ fontSize: '0.9rem' }}>
                  View glossary entry →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
