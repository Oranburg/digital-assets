/**
 * Statute registry.
 * Central metadata for all statute documents available in the reader.
 */

export const STATUTES = {
  'nh-rsa-301-b': {
    id: 'nh-rsa-301-b',
    state: 'NH',
    stateName: 'New Hampshire',
    title: 'RSA 301-B — Decentralized Autonomous Organizations',
    shortTitle: 'NH RSA 301-B',
    cite: 'N.H. Rev. Stat. Ann. ch. 301-B',
    year: 2024,
    enacted: 'HB 645-FN (2024, ch. 263)',
    effective: '2025-07-01',
    status: 'available',
    category: 'dao',
    description: 'Comprehensive DAO entity statute creating the "New Hampshire DAO" as a standalone legal entity. Requires blockchain-based registry, ongoing decentralization (20% threshold), and both internal and third-party dispute resolution.',
    glossaryTerm: 'dao',
    file: 'nh-rsa-301-b',
    sections: 31,
    color: '#4A90D9',
    tags: ['DAO', 'LLC', 'blockchain', 'governance', 'entity'],
  },
  'wy-dao-17-31': {
    id: 'wy-dao-17-31',
    state: 'WY',
    stateName: 'Wyoming',
    title: 'Wyo. Stat. §§ 17-31-101 to -116 — DAO Supplement',
    shortTitle: 'WY DAO LLC',
    cite: 'Wyo. Stat. §§ 17-31-101 to -116',
    year: 2021,
    enacted: 'SF 0038 (2021)',
    effective: '2021-07-01',
    status: 'available',
    category: 'dao',
    description: 'First state DAO statute. Supplements Wyoming\'s LLC Act to allow formation as a "DAO LLC." Allows algorithmically managed or member-managed DAOs with token-based membership interests. Standard LLC fiduciary duties apply by default.',
    glossaryTerm: 'dao',
    file: 'wy-dao-17-31',
    sections: 16,
    color: '#8B4513',
    tags: ['DAO', 'LLC', 'blockchain', 'governance', 'entity'],
  },
  'wy-duna': {
    id: 'wy-duna',
    state: 'WY',
    stateName: 'Wyoming',
    title: 'Wyoming Decentralized Unincorporated Nonprofit Association Act',
    shortTitle: 'WY DUNA',
    cite: 'Wyo. Stat. §§ 17-22-101 et seq.',
    year: 2024,
    enacted: 'HB 0078 (2024)',
    effective: '2024-07-01',
    status: 'available',
    category: 'duna',
    description: 'Creates the "Decentralized Unincorporated Nonprofit Association" (DUNA) entity type for nonprofit DAOs. Provides limited liability for members, legal personhood, and governance through smart contracts and token voting without annual fees or prescriptive compliance requirements.',
    glossaryTerm: 'dao',
    file: 'wy-duna',
    sections: 11,
    color: '#8B4513',
    tags: ['DUNA', 'nonprofit', 'blockchain', 'governance', 'entity'],
  },
  'ut-dao-48-5': {
    id: 'ut-dao-48-5',
    state: 'UT',
    stateName: 'Utah',
    title: 'Utah Code §§ 48-5-101 to -406 — DAO Act',
    shortTitle: 'UT DAO LLC',
    cite: 'Utah Code §§ 48-5-101 to -406',
    year: 2023,
    enacted: 'HB 0357 (2023)',
    effective: '2023-05-03',
    status: 'available',
    category: 'dao',
    description: 'Comprehensive DAO LLC statute within Utah\'s LLC code. Requires decentralization at formation (9 certificate requirements) with a modified business judgment rule for smart-contract decisions. Addresses fork events and failure events. Closest to NH in technical requirements.',
    glossaryTerm: 'dao',
    file: 'ut-dao-48-5',
    sections: 26,
    color: '#B8860B',
    tags: ['DAO', 'LLC', 'blockchain', 'governance', 'entity'],
  },
  'ut-dunu': {
    id: 'ut-dunu',
    state: 'UT',
    stateName: 'Utah',
    title: 'Utah Uniform Unincorporated Nonprofit Association Act',
    shortTitle: 'UT UNA/DUNU',
    cite: 'Utah Code §§ 16-11-101 et seq.',
    year: 2024,
    enacted: 'SB 0163 (2024)',
    effective: '2024-05-01',
    status: 'shell',
    category: 'duna',
    description: 'Utah\'s unincorporated nonprofit association law with DAO-relevant provisions. Utah does not currently have a standalone DUNA statute; DAO nonprofit structures use the general unincorporated nonprofit association framework. Shell pending LawJ corpus population.',
    glossaryTerm: 'dao',
    file: 'ut-dunu',
    sections: 0,
    color: '#B8860B',
    tags: ['DUNA', 'nonprofit', 'blockchain', 'entity'],
  },
  'tn-dao-48-250': {
    id: 'tn-dao-48-250',
    state: 'TN',
    stateName: 'Tennessee',
    title: 'Tenn. Code Ann. §§ 48-250-101 to -115 — Decentralized Organizations',
    shortTitle: 'TN DAO',
    cite: 'Tenn. Code Ann. §§ 48-250-101 to -115',
    year: 2022,
    enacted: 'SB 2854 (112th G.A., 2022)',
    effective: '2023-01-01',
    status: 'available',
    category: 'dao',
    description: 'Creates the "Decentralized Organization" entity type supplementing Tennessee\'s LLC Act. Lightest regulatory touch of the state DAO statutes: no fiduciary duties unless agreed to, no decentralization threshold, allows smart-contract management.',
    glossaryTerm: 'dao',
    file: 'tn-dao-48-250',
    sections: 15,
    color: '#1A5276',
    tags: ['DAO', 'LLC', 'blockchain', 'governance', 'entity'],
  },
  'genius-act': {
    id: 'genius-act',
    state: 'US',
    stateName: 'Federal',
    title: 'GENIUS Act — Stablecoin Regulation',
    shortTitle: 'GENIUS Act',
    cite: 'Pub. L. No. 119-27, 139 Stat. 419 (2025)',
    year: 2025,
    enacted: 'S. 1582, 119th Cong.',
    effective: '2025-07-18',
    status: 'available',
    category: 'federal',
    description: 'Guiding and Establishing National Innovation for U.S. Stablecoins Act. Establishes the first federal framework for payment stablecoin issuers: reserve requirements, attestation cycles, insolvency priority, redemption rights, and tri-agency coordination.',
    glossaryTerm: 'genius-act',
    file: 'genius-act',
    sections: null,
    color: '#2459A9',
    tags: ['stablecoin', 'federal', 'regulation', 'payment', 'reserve'],
  },
}

/** Get all statutes as an array */
export function getAllStatutes() {
  return Object.values(STATUTES)
}

/** Get statutes by category */
export function getStatutesByCategory(category) {
  return getAllStatutes().filter(s => s.category === category)
}

/** Get statutes by state */
export function getStatutesByState(state) {
  return getAllStatutes().filter(s => s.state === state)
}

/** Get a single statute by id */
export function getStatute(id) {
  return STATUTES[id] || null
}
