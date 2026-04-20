import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTerm, LAYERS } from '../utils/terms'
import './TermPage.css'

export default function TermPage() {
  const { termId } = useParams()
  const term = getTerm(termId)
  const [showTechnical, setShowTechnical] = useState(false)

  if (!term) {
    return (
      <div className="term-page container">
        <h1>Term not found</h1>
        <p>No glossary entry for "{termId}".</p>
        <Link to="/glossary">Back to Glossary</Link>
      </div>
    )
  }

  const layer = LAYERS[term.layer]
  const parentTerm = term.parent ? getTerm(term.parent) : null
  const childTerms = (term.children || []).map(id => getTerm(id)).filter(Boolean)
  const relatedTerms = (term.related || []).map(id => getTerm(id)).filter(Boolean)

  return (
    <div
      className="term-page"
      style={{ '--current-layer': layer.color, '--current-layer-text': layer.textColor, '--current-layer-bg': layer.bgColor }}
    >
      <div className="term-page__layer-bar" />

      <div className="container">
        {/* Breadcrumb */}
        <nav className="term-breadcrumb">
          <Link to="/">Map</Link>
          <span>/</span>
          <Link to={`/layers/${layer.slug}`}>L{term.layer}: {layer.name}</Link>
          <span>/</span>
          {parentTerm && (
            <>
              <Link to={`/glossary/${parentTerm.id}`}>{parentTerm.term}</Link>
              <span>/</span>
            </>
          )}
          <span className="term-breadcrumb__current">{term.term}</span>
        </nav>

        {/* Header */}
        <header className="term-header">
          <div className="term-header__meta">
            <span className={`layer-badge layer-badge--${term.layer}`}>
              {layer.emoji} Layer {term.layer}: {layer.name}
            </span>
          </div>
          <h1 className="term-header__title">{term.term}</h1>
        </header>

        {/* Lay definition (always visible) */}
        <section className="term-definition">
          <p className="term-definition__text serif">{term.definitions?.lay}</p>
        </section>

        {/* Technical definition (expandable) */}
        {term.definitions?.technical && (
          <section className="term-technical">
            <button
              className="term-technical__toggle"
              onClick={() => setShowTechnical(!showTechnical)}
            >
              {showTechnical ? '▲' : '▼'} Technical Definition
            </button>
            {showTechnical && (
              <div className="term-technical__content">
                <p className="serif">{term.definitions.technical}</p>
                {term.definitions.parenthetical && (
                  <p className="term-parenthetical">
                    <strong>Parenthetical footnote form:</strong> {term.definitions.parenthetical}
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        {/* Navigation: parent, children, related */}
        <div className="term-nav-grid">
          {parentTerm && (
            <div className="term-nav-section">
              <h3>↑ Go Broader</h3>
              <Link to={`/glossary/${parentTerm.id}`} className="term-nav-link card">
                <span className={`layer-badge layer-badge--${parentTerm.layer}`}>
                  L{parentTerm.layer}
                </span>
                {parentTerm.term}
              </Link>
            </div>
          )}

          {childTerms.length > 0 && (
            <div className="term-nav-section">
              <h3>↓ Go Deeper</h3>
              {childTerms.map(child => (
                <Link key={child.id} to={`/glossary/${child.id}`} className="term-nav-link card">
                  <span className={`layer-badge layer-badge--${child.layer}`}>
                    L{child.layer}
                  </span>
                  {child.term}
                </Link>
              ))}
            </div>
          )}

          {relatedTerms.length > 0 && (
            <div className="term-nav-section">
              <h3>↔ Related</h3>
              {relatedTerms.map(rel => (
                <Link key={rel.id} to={`/glossary/${rel.id}`} className="term-nav-link card">
                  <span className={`layer-badge layer-badge--${rel.layer}`}>
                    L{rel.layer}
                  </span>
                  {rel.term}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* See also */}
        {term.see_also?.length > 0 && (
          <section className="term-see-also">
            <h3>Deep Dives</h3>
            {term.see_also.map(link => (
              <Link key={link} to={link} className="term-see-also__link">
                {link}
              </Link>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
