import { Link } from 'react-router-dom'
import { getRootTerms, getTerm } from '../utils/terms'
import './MapPage.css'

function TermNode({ term, depth = 0 }) {
  const children = (term.children || []).map(id => getTerm(id)).filter(Boolean)

  return (
    <div className="map-node" style={{ '--depth': depth }}>
      <Link to={`/glossary/${term.id}`} className="map-node__link">
        <span className="map-node__name">{term.term}</span>
        {term.tags?.length > 0 && (
          <span className="map-node__tags">
            {term.tags.slice(0, 3).map(tag => (
              <span key={tag} className="map-node__tag">{tag}</span>
            ))}
          </span>
        )}
      </Link>
      {children.length > 0 && (
        <div className="map-node__children">
          {children.map(child => (
            <TermNode key={child.id} term={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function MapPage() {
  const roots = getRootTerms()

  return (
    <div className="map-page">
      <header className="map-hero container">
        <h1 className="map-hero__title">Digital Assets</h1>
        <p className="map-hero__subtitle serif">
          An exploratory learning web covering blockchain technology, digital asset infrastructure, and the legal frameworks governing them. Click any term to explore.
        </p>
      </header>

      <div className="map-tree container">
        {roots.map(term => (
          <TermNode key={term.id} term={term} />
        ))}
      </div>

      <div className="map-spacer" />

      <nav className="map-sections container">
        <Link to="/glossary" className="map-section card">
          <span className="map-section__emoji">📖</span>
          <h3>Glossary</h3>
          <p className="serif">Search and explore all terms</p>
        </Link>
        <Link to="/laws/states" className="map-section card">
          <span className="map-section__emoji">⚖</span>
          <h3>State Laws</h3>
          <p className="serif">DAO statutes across 5+ states</p>
        </Link>
        <Link to="/laws/federal" className="map-section card">
          <span className="map-section__emoji">🏛</span>
          <h3>Federal Laws</h3>
          <p className="serif">GENIUS Act, CLARITY Act</p>
        </Link>
        <Link to="/analysis" className="map-section card">
          <span className="map-section__emoji">📊</span>
          <h3>Analysis</h3>
          <p className="serif">Interactive tools and scholarly analysis</p>
        </Link>
      </nav>
    </div>
  )
}
