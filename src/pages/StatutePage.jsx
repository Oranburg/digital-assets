import { useParams, Link } from 'react-router-dom'
import { getStatute } from '../data/statutes/index.js'
import StatuteReader from '../components/StatuteReader'
import './StatutePage.css'

// Load all statute markdown files at build time
const statuteModules = import.meta.glob('../data/statutes/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function getMarkdown(fileId) {
  const key = `../data/statutes/${fileId}.md`
  return statuteModules[key] || null
}

export default function StatutePage() {
  const { statuteId } = useParams()
  const meta = getStatute(statuteId)
  const markdownText = meta ? getMarkdown(meta.file) : null

  if (!meta) {
    return (
      <div className="container section">
        <h1>Statute Not Found</h1>
        <p className="serif" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
          No statute found for "{statuteId}."
        </p>
        <Link to="/laws/states">← Back to State Laws</Link>
      </div>
    )
  }

  if (!markdownText) {
    return (
      <div className="container section">
        <nav className="statute-breadcrumb" style={{ marginBottom: 'var(--space-lg)' }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/laws/states">State Laws</Link>
          <span>/</span>
          <span>{meta.shortTitle}</span>
        </nav>
        <div className="statute-placeholder card">
          <span className="statute-placeholder__badge" style={{ background: meta.color }}>
            {meta.state}
          </span>
          <h1 className="statute-placeholder__title">{meta.title}</h1>
          <p className="statute-cite" style={{ marginBottom: 'var(--space-md)' }}>{meta.cite}</p>
          <p className="serif" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
            {meta.description}
          </p>
          <div className="statute-placeholder__info">
            <div><strong>Enacted:</strong> {meta.enacted}</div>
            <div><strong>Effective:</strong> {meta.effective}</div>
            {meta.sections > 0 && <div><strong>Sections:</strong> {meta.sections}</div>}
          </div>
          <div className="statute-placeholder__note">
            <p>
              Full statutory text will be available once the LawJ markdown corpus is populated for this statute.
              The shell structure is in place and ready for content.
            </p>
          </div>
          <Link to="/laws/states" style={{ display: 'inline-block', marginTop: 'var(--space-md)' }}>
            ← Back to State Laws
          </Link>
        </div>
      </div>
    )
  }

  return <StatuteReader meta={meta} markdownText={markdownText} />
}
