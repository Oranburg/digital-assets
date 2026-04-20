import { Link } from 'react-router-dom'
import { getAllStatutes } from '../data/statutes/index.js'
import './StateLaws.css'

const STATE_ORDER = ['NH', 'WY', 'UT', 'TN', 'VT']

const STATE_INFO = {
  NH: { name: 'New Hampshire', abbr: 'NH', color: '#4A90D9', note: 'Most prescriptive. Standalone entity, blockchain registry, 20% decentralization threshold.' },
  WY: { name: 'Wyoming', abbr: 'WY', color: '#8B4513', note: 'First in nation. LLC supplement, algorithmically managed option, standard LLC duties.' },
  UT: { name: 'Utah', abbr: 'UT', color: '#B8860B', note: 'Within LLC code. 9 certificate requirements, modified BJR, addresses forks and failures.' },
  TN: { name: 'Tennessee', abbr: 'TN', color: '#1A5276', note: 'Lightest touch. No fiduciary duties by default, no decentralization threshold.' },
  VT: { name: 'Vermont', abbr: 'VT', color: '#2E7D32', note: 'Single section. Blockchain governance election on existing LLC, no separate entity type.' },
}

function StatuteCard({ statute }) {
  const isAvailable = statute.status === 'available'
  const isShell = statute.status === 'shell'

  return (
    <div className={`statute-card ${isAvailable ? 'statute-card--available' : ''} ${isShell ? 'statute-card--shell' : ''}`}>
      <div className="statute-card__header">
        <span className="statute-card__name">{statute.shortTitle}</span>
        <span className={`statute-card__status ${isAvailable ? 'statute-card__status--available' : isShell ? 'statute-card__status--shell' : ''}`}>
          {isAvailable ? '✓' : isShell ? '⬡' : '○'} {statute.year}
        </span>
      </div>
      <p className="statute-card__cite">{statute.cite}</p>
      <p className="statute-card__desc serif">{statute.description}</p>
      <div className="statute-card__footer">
        {(isAvailable || isShell) ? (
          <Link to={`/laws/states/${statute.id}`} className="statute-card__link">
            Read statute →
          </Link>
        ) : (
          <span className="statute-card__coming">Coming soon</span>
        )}
        <span className="statute-card__enacted">{statute.enacted}</span>
      </div>
    </div>
  )
}

export default function StateLaws() {
  const allStatutes = getAllStatutes().filter(s => s.state !== 'US')

  const byState = STATE_ORDER.reduce((acc, abbr) => {
    acc[abbr] = allStatutes.filter(s => s.state === abbr)
    return acc
  }, {})

  return (
    <div className="state-laws section">
      <header className="state-laws__header container">
        <h1>State DAO Laws</h1>
        <p className="serif">
          Five states have enacted DAO-specific legislation. Each takes a different approach —
          from New Hampshire&apos;s prescriptive 11-requirement framework to Vermont&apos;s permissive LLC overlay.
        </p>
        <div className="state-laws__summary">
          {STATE_ORDER.map(abbr => {
            const info = STATE_INFO[abbr]
            const statutes = byState[abbr] || []
            const hasAvailable = statutes.some(s => s.status === 'available')
            return (
              <div key={abbr} className="state-pill" style={{ '--state-color': info.color }}>
                <span className="state-pill__abbr">{abbr}</span>
                <span className="state-pill__count">{statutes.length} statute{statutes.length !== 1 ? 's' : ''}</span>
                {hasAvailable && <span className="state-pill__dot" title="Full text available" />}
              </div>
            )
          })}
        </div>
      </header>

      <div className="state-laws__grid container">
        {STATE_ORDER.map(abbr => {
          const info = STATE_INFO[abbr]
          const statutes = byState[abbr] || []

          return (
            <section key={abbr} className="state-section">
              <div className="state-section__header">
                <span className="state-badge" style={{ background: info.color }}>{abbr}</span>
                <div>
                  <h2 className="state-section__name">{info.name}</h2>
                  <p className="state-section__note serif">{info.note}</p>
                </div>
              </div>
              <div className="state-section__statutes">
                {statutes.length > 0 ? (
                  statutes.map(s => <StatuteCard key={s.id} statute={s} />)
                ) : (
                  <div className="statute-card statute-card--placeholder">
                    <p className="statute-card__name">VT BBLLC</p>
                    <p className="statute-card__cite">11 V.S.A. § 4173</p>
                    <p className="statute-card__desc serif">
                      Single-section blockchain governance election for existing LLCs. First state to legislate (2018). Permissive/enabling rather than prescriptive.
                    </p>
                    <div className="statute-card__footer">
                      <span className="statute-card__coming">Coming soon</span>
                      <span className="statute-card__enacted">2018</span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>

      <div className="container">
        <div className="card" style={{ marginTop: 'var(--space-2xl)', textAlign: 'center' }}>
          <p className="serif" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
            Compare all five jurisdictions side by side, including formation requirements,
            decentralization standards, fiduciary duties, and dispute resolution.
          </p>
          <Link to="/analysis" style={{ color: 'var(--accent)' }}>
            View Comparison Table →
          </Link>
        </div>
      </div>
    </div>
  )
}
