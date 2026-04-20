import { useState } from 'react'
import { Link } from 'react-router-dom'
import { searchTerms, ZONES } from '../utils/terms'
import './GlossaryIndex.css'

export default function GlossaryIndex() {
  const [query, setQuery] = useState('')
  const results = searchTerms(query)

  return (
    <div className="glossary-index container">
      <header className="glossary-index__header">
        <h1>Glossary</h1>
        <p className="serif">Search and explore digital asset terminology across Protocol, Infrastructure, and Governance.</p>
        <input
          type="text"
          className="glossary-search"
          placeholder="Search terms..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </header>

      <div className="glossary-results">
        {results.length === 0 && (
          <p className="glossary-empty">No terms match "{query}"</p>
        )}
        {results.map(term => {
          const zone = ZONES[term.zone]
          return (
            <Link
              key={term.id}
              to={`/glossary/${term.id}`}
              className="glossary-card card"
            >
              <div className="glossary-card__header">
                <h3 className="glossary-card__term">{term.term}</h3>
                {zone && (
                  <span className={`zone-badge zone-badge--${term.zone}`}>
                    {zone.emoji} {zone.name}
                  </span>
                )}
              </div>
              <p className="glossary-card__def serif">{term.definitions?.lay}</p>
              {term.tags?.length > 0 && (
                <div className="glossary-card__tags">
                  {term.tags.map(tag => (
                    <span key={tag} className="glossary-tag">{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
