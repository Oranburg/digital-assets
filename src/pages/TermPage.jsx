import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTerm } from '../utils/terms'
import './TermPage.css'

const LENSES = [
  {
    key: 'ontology',
    field: 'lay',
    label: 'What is it?',
    emoji: '🏷️',
    cssVar: '--lens-ontology',
  },
  {
    key: 'techne',
    field: 'technical',
    label: 'How does it work?',
    emoji: '⚙️',
    cssVar: '--lens-techne',
  },
  {
    key: 'teleology',
    field: 'legal_significance',
    label: 'What is it for?',
    emoji: '🎯',
    cssVar: '--lens-teleology',
  },
]

function Accordion({ lens, content, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  if (!content) return null

  return (
    <div className={`accordion accordion--${lens.key}`}>
      <button
        className="accordion__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="accordion__icon">{lens.emoji}</span>
        <span className="accordion__label">{lens.label}</span>
        <span className="accordion__chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="accordion__body">
          <p className="serif">{content}</p>
        </div>
      )}
    </div>
  )
}

function GreekFootnote() {
  const [shown, setShown] = useState(() => {
    try {
      return !localStorage.getItem('greekFootnoteSeen')
    } catch {
      return false
    }
  })

  const dismiss = () => {
    setShown(false)
    try { localStorage.setItem('greekFootnoteSeen', 'true') } catch { /* ignore */ }
  }

  if (!shown) return null

  return (
    <aside className="greek-footnote">
      <button className="greek-footnote__close" onClick={dismiss}>✕</button>
      <p className="serif">
        These three perspectives draw on <em>ontology</em> (what a thing is), <em>techne</em> (how it works), and <em>teleology</em> (what it is for): a framework from Greek philosophy for examining any concept from multiple angles.
      </p>
    </aside>
  )
}

export default function TermPage() {
  const { termId } = useParams()
  const term = getTerm(termId)

  if (!term) {
    return (
      <div className="term-page container">
        <h1>Term not found</h1>
        <p>No glossary entry for "{termId}".</p>
        <Link to="/glossary">Back to Glossary</Link>
      </div>
    )
  }

  const parentTerm = term.parent ? getTerm(term.parent) : null
  const childTerms = (term.children || []).map(id => getTerm(id)).filter(Boolean)
  const relatedTerms = (term.related || []).map(id => getTerm(id)).filter(Boolean)

  return (
    <div className="term-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="term-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/glossary">Glossary</Link>
          {parentTerm && (
            <>
              <span>/</span>
              <Link to={`/glossary/${parentTerm.id}`}>{parentTerm.term}</Link>
            </>
          )}
          <span>/</span>
          <span className="term-breadcrumb__current">{term.term}</span>
        </nav>

        {/* Header */}
        <header className="term-header">
          <h1 className="term-header__title">{term.term}</h1>
          {term.full_name && (
            <p className="term-header__fullname serif">{term.full_name}</p>
          )}
          {term.tags?.length > 0 && (
            <div className="term-header__tags">
              {term.tags.map(tag => (
                <span key={tag} className="term-tag">{tag}</span>
              ))}
            </div>
          )}
        </header>

        {/* Plain definition — always visible */}
        <section className="term-definition">
          <p className="term-definition__text serif">{term.definitions?.lay}</p>
        </section>

        {/* Three lenses as accordions */}
        <div className="term-lenses">
          {LENSES.map((lens, i) => (
            <Accordion
              key={lens.key}
              lens={lens}
              content={term.definitions?.[lens.field]}
              defaultOpen={i === 0}
            />
          ))}
          {term.definitions?.parenthetical && (
            <div className="term-parenthetical">
              <strong>Footnote form:</strong> {term.definitions.parenthetical}
            </div>
          )}
        </div>

        {/* Greek footnote — shown once */}
        <GreekFootnote />

        {/* Navigation */}
        <div className="term-nav-grid">
          {parentTerm && (
            <div className="term-nav-section">
              <h3>↑ Go Broader</h3>
              <Link to={`/glossary/${parentTerm.id}`} className="term-nav-link card">
                {parentTerm.term}
              </Link>
            </div>
          )}

          {childTerms.length > 0 && (
            <div className="term-nav-section">
              <h3>↓ Go Deeper</h3>
              {childTerms.map(child => (
                <Link key={child.id} to={`/glossary/${child.id}`} className="term-nav-link card">
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
