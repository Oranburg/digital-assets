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

/** Get all terms for a given zone */
export function getTermsByZone(zone) {
  return getAllTerms().filter(t => t.zone === zone)
}

/** Search terms by query string (matches term name and definitions) */
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

/**
 * Zone metadata.
 * These are NOT blockchain "layers" (L1/L2/L3), which have specific
 * technical meanings in the industry. These are organizational zones
 * for navigating the glossary by the role each concept plays.
 */
export const ZONES = {
  protocol: {
    id: 'protocol',
    name: 'Protocol',
    emoji: '⛓',
    description: 'The technology law must understand: blockchain architecture, consensus mechanisms, cryptography, smart contracts, and network security.',
    color: 'var(--layer-1)',
    textColor: 'var(--layer-1-text)',
    bgColor: 'var(--layer-1-bg)',
  },
  infrastructure: {
    id: 'infrastructure',
    name: 'Infrastructure',
    emoji: '🏗',
    description: 'The financial products law must regulate: stablecoins, DeFi, tokenization, custody, settlement, and digital asset markets.',
    color: 'var(--layer-2)',
    textColor: 'var(--layer-2-text)',
    bgColor: 'var(--layer-2-bg)',
  },
  governance: {
    id: 'governance',
    name: 'Governance',
    emoji: '⚖',
    description: 'The regulatory architecture itself: federal and state legislation, agency jurisdiction, entity formation, and compliance frameworks.',
    color: 'var(--layer-3)',
    textColor: 'var(--layer-3-text)',
    bgColor: 'var(--layer-3-bg)',
  },
}
