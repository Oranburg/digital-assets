/**
 * Term data loader.
 * Reads all JSON files from src/data/terms/ at build time via Vite's
 * import.meta.glob, resolves bidirectional links, and provides lookup helpers.
 */

const termModules = import.meta.glob('../data/terms/*.json', { eager: true })

// Build the term map
const termMap = new Map()
for (const [path, mod] of Object.entries(termModules)) {
  const term = mod.default || mod
  termMap.set(term.id, term)
}

// Resolve bidirectional "related" links
for (const term of termMap.values()) {
  if (!term.related) term.related = []
  for (const relId of term.related) {
    const rel = termMap.get(relId)
    if (rel && !rel.related.includes(term.id)) {
      rel.related.push(term.id)
    }
  }
}

// Resolve parent/children
for (const term of termMap.values()) {
  if (!term.children) term.children = []
}
for (const term of termMap.values()) {
  if (term.parent) {
    const parent = termMap.get(term.parent)
    if (parent && !parent.children.includes(term.id)) {
      parent.children.push(term.id)
    }
  }
}

/** Get all terms as an array, sorted alphabetically */
export function getAllTerms() {
  return [...termMap.values()].sort((a, b) =>
    a.term.localeCompare(b.term)
  )
}

/** Get a single term by id */
export function getTerm(id) {
  return termMap.get(id) || null
}

/** Get all unique tags across all terms */
export function getAllTags() {
  const tags = new Set()
  for (const term of termMap.values()) {
    for (const tag of (term.tags || [])) {
      tags.add(tag)
    }
  }
  return [...tags].sort()
}

/** Get all terms matching a tag */
export function getTermsByTag(tag) {
  return getAllTerms().filter(t => t.tags?.includes(tag))
}

/** Get root terms (no parent) */
export function getRootTerms() {
  return getAllTerms().filter(t => !t.parent)
}

/** Search terms by query string (matches term name, definitions, and tags) */
export function searchTerms(query) {
  if (!query) return getAllTerms()
  const q = query.toLowerCase()
  return getAllTerms().filter(t =>
    t.term.toLowerCase().includes(q) ||
    t.definitions?.lay?.toLowerCase().includes(q) ||
    t.definitions?.technical?.toLowerCase().includes(q) ||
    t.tags?.some(tag => tag.toLowerCase().includes(q))
  )
}
