import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { marked } from 'marked'
import { getAllTerms } from '../utils/terms'
import './StatuteReader.css'

/** HTML-escape a plain string for safe use in attributes and text */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Build a slug from a heading string */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[§\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Extract headings from markdown for the TOC */
function extractHeadings(markdown) {
  const headings = []
  const lines = markdown.split('\n')
  for (const line of lines) {
    const m2 = line.match(/^##\s+(.+)$/)
    const m3 = line.match(/^###\s+(.+)$/)
    if (m2) {
      headings.push({ level: 2, text: m2[1].trim(), slug: slugify(m2[1]) })
    } else if (m3) {
      headings.push({ level: 3, text: m3[1].trim(), slug: slugify(m3[1]) })
    }
  }
  return headings
}

/** Highlight glossary terms in HTML content */
function highlightGlossaryTerms(html, terms) {
  if (!terms.length) return html
  // Only highlight top-level terms with short names to avoid false positives
  const shortTerms = terms
    .filter(t => t.term.length > 4 && t.term.length < 40)
    .slice(0, 30)

  let result = html
  for (const term of shortTerms) {
    const safe = term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`\\b(${safe})\\b(?![^<]*>)`, 'gi')
    result = result.replace(
      re,
      `<a href="#/glossary/${term.id}" class="statute-term-link" title="${escapeHtml(term.definitions?.lay?.slice(0, 80) || '')}">$1</a>`
    )
  }
  return result
}

/** Configure marked renderer to add slug IDs to headings */
function configureMarked() {
  const renderer = new marked.Renderer()
  renderer.heading = function ({ text, depth }) {
    const slug = slugify(text)
    const Tag = `h${depth}`
    return `<${Tag} id="${slug}" class="statute-heading statute-h${depth}">${text}</${Tag}>\n`
  }
  // Style blockquotes (used for LawJ notes)
  renderer.blockquote = function ({ tokens }) {
    const body = this.parser.parse(tokens)
    return `<blockquote class="statute-note">${body}</blockquote>\n`
  }
  marked.use({ renderer, breaks: false, gfm: true })
}

configureMarked()

export default function StatuteReader({ meta, markdownText }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [tocOpen, setTocOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const contentRef = useRef(null)
  const allTerms = getAllTerms()

  const headings = extractHeadings(markdownText || '')

  // Render markdown to HTML with glossary term highlighting
  const rawHtml = marked.parse(markdownText || '')
  const html = highlightGlossaryTerms(rawHtml, allTerms)

  // Highlight search matches in the content — operate only on text nodes to avoid
  // injecting raw HTML from user input, which would be an XSS vector.
  const displayHtml = searchQuery.length > 2
    ? (() => {
        // Escape the query for safe regex use AND safe HTML substitution
        const escapedRegex = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const escapedHtml = escapeHtml(searchQuery)
        return html.replace(
          // Only match text outside HTML tags: use a negative lookahead for `>`
          new RegExp(`(${escapedRegex})(?=[^<]*(?:<|$))`, 'gi'),
          `<mark class="statute-highlight">${escapedHtml}</mark>`
        )
      })()
    : html

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!contentRef.current) return
    const els = contentRef.current.querySelectorAll('h2[id], h3[id]')
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [html])

  const scrollToSection = useCallback((slug) => {
    const el = document.getElementById(slug)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTocOpen(false)
    }
  }, [])

  const statusLabel = {
    available: { text: '✓ Full Text', cls: 'statute-status--available' },
    shell: { text: '⬡ Shell', cls: 'statute-status--shell' },
    placeholder: { text: '○ Coming Soon', cls: 'statute-status--placeholder' },
  }[meta.status] || { text: meta.status, cls: '' }

  return (
    <div className="statute-reader">
      {/* Header */}
      <header className="statute-header">
        <nav className="statute-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/laws/states">State Laws</Link>
          <span>/</span>
          <span>{meta.shortTitle}</span>
        </nav>
        <div className="statute-header__inner">
          <div className="statute-header__meta">
            <span className="statute-state-badge" style={{ background: meta.color }}>
              {meta.state}
            </span>
            <div>
              <h1 className="statute-title">{meta.title}</h1>
              <p className="statute-cite">{meta.cite}</p>
              <div className="statute-meta-row">
                <span className={`statute-status ${statusLabel.cls}`}>{statusLabel.text}</span>
                <span className="statute-meta-item">Enacted: {meta.enacted}</span>
                {meta.sections > 0 && (
                  <span className="statute-meta-item">{meta.sections} sections</span>
                )}
                <span className="statute-meta-item">Effective: {meta.effective}</span>
              </div>
            </div>
          </div>
          <div className="statute-header__desc">
            <p className="serif">{meta.description}</p>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="statute-search-bar">
        <div className="container">
          <input
            type="text"
            className="statute-search"
            placeholder="Search within statute…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Search statute text"
          />
          {searchQuery && (
            <button
              className="statute-search__clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Layout */}
      <div className="statute-layout container">
        {/* TOC Sidebar */}
        <aside className={`statute-toc ${tocOpen ? 'statute-toc--open' : ''}`}>
          <button
            className="statute-toc__toggle"
            onClick={() => setTocOpen(o => !o)}
            aria-expanded={tocOpen}
          >
            <span>§ Contents</span>
            <span>{tocOpen ? '▲' : '▼'}</span>
          </button>
          <nav className="statute-toc__nav" aria-label="Table of contents">
            <p className="statute-toc__label">Table of Contents</p>
            <ul className="statute-toc__list">
              {headings.map(h => (
                <li
                  key={h.slug}
                  className={`statute-toc__item statute-toc__item--h${h.level} ${activeSection === h.slug ? 'statute-toc__item--active' : ''}`}
                >
                  <button
                    className="statute-toc__link"
                    onClick={() => scrollToSection(h.slug)}
                  >
                    {h.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Statute Content */}
        <main className="statute-content">
          <div
            ref={contentRef}
            className="statute-body"
            dangerouslySetInnerHTML={{ __html: displayHtml }}
          />
        </main>
      </div>
    </div>
  )
}
