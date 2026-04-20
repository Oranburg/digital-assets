/**
 * Term data loader.
 * Reads all JSON files from src/data/terms/ at build time via Vite's
 * import.meta.glob, resolves bidirectional links, and provides lookup helpers.
 */

// ===== Zone / Layer metadata =====
export const ZONES = {
  'protocol': {
    id: 'protocol',
    name: 'Protocol Layer',
    emoji: '⛓',
    description: 'The foundational blockchain and consensus mechanisms. Distributed ledgers, Byzantine fault tolerance, and the infrastructure underneath everything.',
    color: 'var(--lens-techne)',
    tags: ['blockchain', 'consensus', 'cryptography', 'infrastructure'],
  },
  'asset': {
    id: 'asset',
    name: 'Asset Layer',
    emoji: '🪙',
    description: 'Digital assets, tokens, stablecoins, and their legal classification as securities, commodities, or payment instruments.',
    color: 'var(--lens-ontology)',
    tags: ['stablecoin', 'token', 'classification', 'digital-asset'],
  },
  'governance': {
    id: 'governance',
    name: 'Governance Layer',
    emoji: '🏛',
    description: 'DAOs, smart-contract governance, entity formation, and the regulatory frameworks that apply to decentralized decision-making.',
    color: 'var(--lens-teleology)',
    tags: ['governance', 'entity', 'DAO', 'regulation'],
  },
  'risk': {
    id: 'risk',
    name: 'Risk Layer',
    emoji: '⚠️',
    description: 'Systemic risk, liquidity failures, contagion, and the cascading consequences of digital asset market dislocations.',
    color: '#C4972F',
    tags: ['risk', 'systemic', 'liquidity', 'stablecoin'],
  },
}

const termModules = import.meta.glob('../data/terms/*.json', { eager: true })

// Build the term map
const termMap = new Map()
for (const mod of Object.values(termModules)) {
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

/** Get terms by zone (matches any zone tag) */
export function getTermsByZone(zoneId) {
  const zone = ZONES[zoneId]
  if (!zone) return []
  return getAllTerms().filter(t =>
    t.tags?.some(tag => zone.tags.some(zt => tag.toLowerCase().includes(zt.toLowerCase())))
  )
}
