import { Link } from 'react-router-dom'

const articles = [
  { id: 'comparison', title: 'Choosing a Jurisdiction', description: 'Side-by-side comparison of DAO statutes across New Hampshire, Wyoming, Utah, Tennessee, and Vermont.', emoji: '📋', status: 'migrating' },
  { id: 'decentralization', title: 'Measuring Decentralization', description: 'Nakamoto coefficient, Gini coefficient, and the 20% bright-line test. Interactive calculator and state comparison.', emoji: '📐', status: 'migrating' },
  { id: 'registry', title: 'Registry Requirements', description: 'Interactive checklist of the 11 requirements for New Hampshire DAO registry listing under RSA 301-B:15.', emoji: '✅', status: 'migrating' },
  { id: 'stable-tokens', title: 'The GENIUS Dilemma', description: 'How the GENIUS Act intersects with New Hampshire DAO law and the Commission to Study Stable Tokens.', emoji: '⚡', status: 'migrating' },
]

export default function Analysis() {
  return (
    <div className="container section">
      <header style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1>Analysis</h1>
        <p className="serif" style={{ color: 'var(--text-secondary)', maxWidth: '40rem' }}>
          Scholarly analysis, interactive tools, and data visualizations exploring digital asset law and technology.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: 'var(--space-lg)' }}>
        {articles.map(article => (
          <div key={article.id} className="card" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-sm)' }}>
              {article.emoji}
            </span>
            <h3 style={{ textTransform: 'none', marginBottom: 'var(--space-xs)' }}>
              {article.title}
            </h3>
            <p className="serif" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }}>
              {article.description}
            </p>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
              Migrating from NH DAO Law Explorer
            </span>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 'var(--space-2xl)', textAlign: 'center' }}>
        <p className="serif" style={{ color: 'var(--text-secondary)' }}>
          These analysis pages are being migrated from the <a href="https://oranburg.law/NH-RSA-301-B/" target="_blank" rel="noopener">NH DAO Law Explorer</a>.
          Full interactive features will be available as React components.
        </p>
      </div>
    </div>
  )
}
