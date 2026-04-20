import { Link } from 'react-router-dom'
import { getTermsByZone, ZONES } from '../utils/terms'
import './MapPage.css'

const zoneOrder = ['governance', 'infrastructure', 'protocol']

function ZoneBand({ zoneId }) {
  const meta = ZONES[zoneId]
  const terms = getTermsByZone(zoneId)

  return (
    <section
      className="map-layer"
      style={{ '--layer-accent': meta.color, '--layer-text': meta.textColor, '--layer-bg': meta.bgColor }}
    >
      <div className="map-layer__header">
        <Link to={`/zones/${meta.id}`} className="map-layer__title">
          <span className="map-layer__emoji">{meta.emoji}</span>
          <span>
            <strong>{meta.name}</strong>
          </span>
        </Link>
        <p className="map-layer__desc serif">{meta.description}</p>
      </div>

      <div className="map-layer__terms">
        {terms.map(t => (
          <Link
            key={t.id}
            to={`/glossary/${t.id}`}
            className="map-term"
          >
            <span className="map-term__name">{t.term}</span>
          </Link>
        ))}
        {terms.length === 0 && (
          <span className="map-layer__empty">Terms coming soon</span>
        )}
      </div>
    </section>
  )
}

export default function MapPage() {
  return (
    <div className="map-page">
      <header className="map-hero container">
        <h1 className="map-hero__title">Digital Assets</h1>
        <p className="map-hero__subtitle serif">
          An exploratory learning web covering blockchain technology, digital asset infrastructure, and the legal frameworks governing them.
        </p>
      </header>

      <div className="map-stack container">
        {zoneOrder.map((zoneId, i) => (
          <div key={zoneId}>
            {i > 0 && <div className="map-connector" />}
            <ZoneBand zoneId={zoneId} />
          </div>
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
