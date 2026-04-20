import { useState } from 'react'
import { Link } from 'react-router-dom'
import { searchTerms, getAllTags, getTermsByTag } from '../utils/terms'
import './GlossaryIndex.css'

export default function GlossaryIndex() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState(null)
  const allTags = getAllTags()

  const results = activeTag
    ? getTermsByTag(activeTag).filter(t =>
        !query || t.term.toLowerCase().includes(query.toLowerCase())
      )
    : searchTerms(query)

  return (
    <div className="glossary-index container">
      <header className="glossary-index__header">
        <h1>Glossary</h1>
        <p className="serif">Search and explore digital asset terminology. Click a tag to filter.</p>
        <input
          type="text"
          className="glossary-search"
          placeholder="Search terms..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
        <div className="glossary-tags">
          {activeTag && (
            <button
              className="glossary-tag-btn glossary-tag-btn--active"
              onClick={() => setActiveTag(null)}
            >
              ✕ {activeTag}
            </button>
          )}
          {!activeTag && allTags.map(tag => (
            <button
              key={tag}
              className="glossary-tag-btn"
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      <div className="glossary-results">
        {results.length === 0 && (
          <p className="glossary-empty">No terms found.</p>
        )}
        {results.map(term => (
          <Link
            key={term.id}
            to={`/glossary/${term.id}`}
            className="glossary-card card"
          >
            <div className="glossary-card__header">
              <h3 className="glossary-card__term">{term.term}</h3>
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
        ))}
      </div>
    </div>
  )
}
