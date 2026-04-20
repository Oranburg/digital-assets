import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchTerms, getAllTerms } from '../utils/terms'
import './MapPage.css'

const CURATED_START = [
  'blockchain',
  'digital-asset',
  'dao',
  'smart-contract',
  'stablecoin',
  'consensus',
  'genius-act',
  'defi',
]

function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const results = query.length > 1 ? searchTerms(query).slice(0, 8) : []
  const total = getAllTerms().length

  return (
    <div className="hero-search">
      <input
        type="text"
        className="hero-search__input"
        placeholder={`Search ${total} terms\u2026`}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        onKeyDown={e => {
          if (e.key === 'Enter' && results.length > 0) {
            navigate(`/glossary/${results[0].id}`)
            setQuery('')
          }
        }}
      />
      {focused && results.length > 0 && (
        <div className="hero-search__results">
          {results.map(t => (
            <Link
              key={t.id}
              to={`/glossary/${t.id}`}
              className="hero-search__result"
              onClick={() => setQuery('')}
            >
              <span className="hero-search__term">{t.term}</span>
              <span className="hero-search__preview">
                {t.definitions?.lay?.slice(0, 80)}\u2026
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MapPage() {
  const startTerms = CURATED_START
    .map(id => {
      const all = getAllTerms()
      return all.find(t => t.id === id)
    })
    .filter(Boolean)

  return (
    <div className="map-page">
      <header className="hero">
        <h1 className="hero__title">Digital Assets, Explained Three Ways</h1>
        <p className="hero__subtitle serif">
          Every term in blockchain law sits at an intersection: what it is, how it works, and what it is for. This glossary covers all three.
        </p>
        <SearchBar />
      </header>

      <section className="entry-cards container">
        <Link to="/lens/ontology" className="entry-card">
          <img
            src="/digital-assets/images/lenses/ontology-no-bg.png"
            alt=""
            className="entry-card__img"
          />
          <h2 className="entry-card__title">🏷️ What is it?</h2>
          <p className="entry-card__desc serif">
            Classification, identity, and legal nature. How digital assets are defined and why it matters.
          </p>
          <span className="entry-card__link">Explore ontology &#8594;</span>
        </Link>

        <Link to="/lens/techne" className="entry-card">
          <img
            src="/digital-assets/images/lenses/techne-no-bg.png"
            alt=""
            className="entry-card__img"
          />
          <h2 className="entry-card__title">⚙️ How does it work?</h2>
          <p className="entry-card__desc serif">
            Consensus, cryptography, smart contracts, and the mechanics underneath.
          </p>
          <span className="entry-card__link">Explore techne &#8594;</span>
        </Link>

        <Link to="/lens/teleology" className="entry-card">
          <img
            src="/digital-assets/images/lenses/telos-no-bg.png"
            alt=""
            className="entry-card__img"
          />
          <h2 className="entry-card__title">🎯 What is it for?</h2>
          <p className="entry-card__desc serif">
            Purpose, consequences, and stakes. Regulation, systemic risk, and why it all matters.
          </p>
          <span className="entry-card__link">Explore teleology &#8594;</span>
        </Link>
      </section>

      <section className="start-here container">
        <h2 className="start-here__heading">Start Here</h2>
        <div className="start-here__list">
          {startTerms.map(term => (
            <Link
              key={term.id}
              to={`/glossary/${term.id}`}
              className="start-here__item"
            >
              <span className="start-here__name">{term.term}</span>
              <span className="start-here__def serif">
                {term.definitions?.lay?.slice(0, 120)}{term.definitions?.lay?.length > 120 ? '\u2026' : ''}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="secondary-nav container">
        <Link to="/laws/states" className="secondary-nav__block card">
          <h3>State Laws</h3>
          <p className="serif">DAO statutes across 5+ states</p>
        </Link>
        <Link to="/laws/federal" className="secondary-nav__block card">
          <h3>Federal Laws</h3>
          <p className="serif">GENIUS Act, CLARITY Act</p>
        </Link>
        <Link to="/analysis" className="secondary-nav__block card">
          <h3>Analysis</h3>
          <p className="serif">Interactive tools and scholarly analysis</p>
        </Link>
      </section>
    </div>
  )
}
