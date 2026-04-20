import { Link } from 'react-router-dom'

const states = [
  { id: 'nh', name: 'New Hampshire', statutes: [{ name: 'RSA 301-B (DAO Act)', status: 'available', year: 2024 }], status: 'available' },
  { id: 'wy', name: 'Wyoming', statutes: [{ name: 'W.S. 17-31 (DAO LLC)', status: 'placeholder', year: 2021 }, { name: 'W.S. 17-32 (DUNA)', status: 'placeholder', year: 2024 }], status: 'placeholder' },
  { id: 'ut', name: 'Utah', statutes: [{ name: 'Utah Code 48-5 (DAO)', status: 'placeholder', year: 2023 }, { name: 'DUNA', status: 'placeholder', year: 2024 }], status: 'placeholder' },
  { id: 'tn', name: 'Tennessee', statutes: [{ name: 'Tenn. Code 48-250 (DAO)', status: 'placeholder', year: 2022 }], status: 'placeholder' },
  { id: 'vt', name: 'Vermont', statutes: [{ name: '11C V.S.A. (BBLLC)', status: 'placeholder', year: 2018 }], status: 'placeholder' },
]

export default function StateLaws() {
  return (
    <div className="container section">
      <header style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1>State DAO Laws</h1>
        <p className="serif" style={{ color: 'var(--text-secondary)', maxWidth: '40rem' }}>
          Interactive statute readers for state-level DAO and digital asset entity legislation.
          Each reader includes defined-term tooltips, cross-references, and links to the glossary.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
        {states.map(state => (
          <div key={state.id} className="card">
            <h2 style={{ textTransform: 'none', marginBottom: 'var(--space-sm)' }}>
              {state.name}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              {state.statutes.map(s => (
                <div
                  key={s.name}
                  style={{
                    padding: 'var(--space-sm) var(--space-md)',
                    background: s.status === 'available' ? 'var(--layer-1-bg)' : 'var(--bg-soft)',
                    border: `1px solid ${s.status === 'available' ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                  }}
                >
                  {s.status === 'available' ? '✓' : '○'} {s.name} ({s.year})
                  {s.status === 'placeholder' && (
                    <span style={{ color: 'var(--muted)', marginLeft: 'var(--space-sm)', fontSize: '0.75rem' }}>
                      Coming soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
        <p className="serif" style={{ color: 'var(--text-secondary)' }}>
          See also: <Link to="/analysis">Comparison Table</Link> for a side-by-side analysis of all five state DAO statutes.
        </p>
      </div>
    </div>
  )
}
