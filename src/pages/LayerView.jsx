import { useParams, Link } from 'react-router-dom'
import { getTermsByLayer, LAYERS } from '../utils/terms'

const slugToLayer = { protocol: 1, infrastructure: 2, governance: 3 }

export default function LayerView() {
  const { layerId } = useParams()
  const layerNum = slugToLayer[layerId]
  const meta = LAYERS[layerNum]
  const terms = getTermsByLayer(layerNum)

  if (!meta) return <div className="container"><h1>Layer not found</h1></div>

  // Group by parent
  const roots = terms.filter(t => !t.parent || !terms.find(p => p.id === t.parent))
  const children = terms.filter(t => t.parent && terms.find(p => p.id === t.parent))

  return (
    <div className="container section">
      <header style={{ marginBottom: 'var(--space-2xl)' }}>
        <span className={`layer-badge layer-badge--${layerNum}`}>
          {meta.emoji} Layer {meta.id}
        </span>
        <h1 style={{ marginTop: 'var(--space-sm)' }}>{meta.name}</h1>
        <p className="serif" style={{ color: 'var(--text-secondary)', maxWidth: '40rem' }}>
          {meta.description}
        </p>
      </header>

      <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
        {roots.map(term => (
          <div key={term.id}>
            <Link to={`/glossary/${term.id}`} className="card" style={{ display: 'block', textDecoration: 'none', color: 'var(--text)' }}>
              <h3 style={{ textTransform: 'none', marginBottom: 'var(--space-xs)' }}>{term.term}</h3>
              <p className="serif" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {term.definitions?.lay?.slice(0, 150)}...
              </p>
            </Link>
            {children.filter(c => c.parent === term.id).map(child => (
              <Link
                key={child.id}
                to={`/glossary/${child.id}`}
                className="card"
                style={{ display: 'block', textDecoration: 'none', color: 'var(--text)', marginLeft: 'var(--space-xl)', marginTop: 'var(--space-sm)' }}
              >
                <h3 style={{ textTransform: 'none', fontSize: '1rem' }}>↳ {child.term}</h3>
                <p className="serif" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {child.definitions?.lay?.slice(0, 120)}...
                </p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
