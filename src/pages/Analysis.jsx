import { Link } from 'react-router-dom'
import TermTooltip from '../components/TermTooltip'
import './Analysis.css'

/* ===== Comparison table data ===== */
const COMPARISON_ROWS = [
  {
    category: 'Formation',
    nh:  'File with blockchain-based UNH-IOL registry; 11 requirements',
    wy:  'Articles with Secretary of State',
    ut:  'Certificate with Division of Corporations; 9 requirements',
    tn:  'Articles with Secretary of State',
    vt:  'Standard LLC + blockchain governance election',
  },
  {
    category: 'Entity Type',
    nh:  '"New Hampshire DAO" — standalone entity, own chapter',
    wy:  '"DAO LLC" — LLC supplement (Ch. 29)',
    ut:  '"DAO LLC" — within LLC code (Ch. 5)',
    tn:  '"Decentralized Organization" (DO/DAO) — LLC supplement',
    vt:  'Blockchain-Based LLC (BBLLC) — single section overlay',
  },
  {
    category: 'Decentralization Standard',
    nh:  '20% bright-line threshold; "at all times" ongoing; 3-prong definition with rolling lookback',
    wy:  'Not defined; no numerical threshold',
    ut:  'Required at formation only; not ongoing',
    tn:  'Not defined; no numerical threshold',
    vt:  'Not addressed',
  },
  {
    category: 'Management',
    nh:  'Participant governance; administrators for specific ops',
    wy:  '"Algorithmically managed" or "member managed"',
    ut:  'Token-based governance through governance protocol',
    tn:  '"Member-managed" or "smart-contract-managed"',
    vt:  'Blockchain-governed operating agreement',
  },
  {
    category: 'Fiduciary Duties',
    nh:  'No implied fiduciary duties (§ 301-B:20)',
    wy:  'Standard LLC fiduciary duties apply by default',
    ut:  'Modified business judgment rule for smart-contract decisions (§ 48-5-307)',
    tn:  'No fiduciary duty unless contractually agreed (§ 48-250-109)',
    vt:  'Standard LLC duties unless modified in operating agreement',
  },
  {
    category: 'Dispute Resolution',
    nh:  'Internal (among participants) AND third-party (with outsiders) required',
    wy:  'Left to operating agreement',
    ut:  'Internal dispute resolution required; third-party not required',
    tn:  'Left to operating agreement',
    vt:  'Left to operating agreement',
  },
  {
    category: 'Registry / Filing',
    nh:  'Blockchain-based registry (UNH-IOL); on-chain monitoring',
    wy:  'Standard state filing; annual report',
    ut:  'Division of Corporations; annual report required',
    tn:  'Secretary of State; standard annual report',
    vt:  'Secretary of State; standard LLC filing',
  },
  {
    category: 'Smart Contracts',
    nh:  'Bylaws may be embodied in smart contract',
    wy:  'Smart contract may serve as operating agreement',
    ut:  'Smart contract required; open blockchain deployment',
    tn:  'Governing smart contract optional but allowed',
    vt:  'Blockchain governance election; smart-contract-based governance',
  },
  {
    category: 'Member Liability',
    nh:  'No personal liability for DAO obligations',
    wy:  'No personal liability; limited to capital contribution',
    ut:  'No personal liability for DAO obligations',
    tn:  'No personal liability for DAO obligations',
    vt:  'Standard LLC limited liability',
  },
  {
    category: 'Unique Feature',
    nh:  'Only state with quantitative decentralization test (20%); blockchain registry',
    wy:  'First state DAO law (2021); algorithmically managed option',
    ut:  'Addresses fork events and failure events explicitly',
    tn:  'Lightest regulatory touch; notice of restrictions requirement',
    vt:  'First state to legislate (2018); single-section enabling approach',
  },
]

const STATES = [
  { abbr: 'NH', name: 'New Hampshire', color: '#4A90D9', cite: 'RSA 301-B', year: 2024, link: '/laws/states/nh-rsa-301-b' },
  { abbr: 'WY', name: 'Wyoming', color: '#8B4513', cite: 'W.S. 17-31', year: 2021, link: '/laws/states/wy-dao-17-31' },
  { abbr: 'UT', name: 'Utah', color: '#B8860B', cite: 'U.C.A. 48-5', year: 2023, link: '/laws/states/ut-dao-48-5' },
  { abbr: 'TN', name: 'Tennessee', color: '#1A5276', cite: 'T.C.A. 48-250', year: 2022, link: '/laws/states/tn-dao-48-250' },
  { abbr: 'VT', name: 'Vermont', color: '#2E7D32', cite: '11 V.S.A. § 4173', year: 2018, link: '/laws/states' },
]

/* ===== Analysis articles ===== */
const ARTICLES = [
  {
    id: 'comparison',
    title: 'Choosing a Jurisdiction',
    description: <>Side-by-side comparison of <TermTooltip termId="dao">DAO</TermTooltip> statutes across New Hampshire, Wyoming, Utah, Tennessee, and Vermont.</>,
    emoji: '📋',
    status: 'available',
    link: null, // rendered inline below
  },
  {
    id: 'decentralization',
    title: 'Measuring Decentralization',
    description: 'Nakamoto coefficient, Gini coefficient, and the 20% bright-line test. Interactive calculator and state comparison.',
    emoji: '📐',
    status: 'migrating',
    link: 'https://oranburg.law/NH-RSA-301-B/decentralization.html',
  },
  {
    id: 'registry',
    title: 'Registry Requirements',
    description: 'Interactive checklist of the 11 requirements for New Hampshire DAO registry listing under RSA 301-B:15.',
    emoji: '✅',
    status: 'migrating',
    link: 'https://oranburg.law/NH-RSA-301-B/registry.html',
  },
  {
    id: 'stable-tokens',
    title: 'The GENIUS Dilemma',
    description: <>How the <TermTooltip termId="genius-act">GENIUS Act</TermTooltip> intersects with New Hampshire <TermTooltip termId="dao">DAO</TermTooltip> law and the Commission to Study Stable Tokens.</>,
    emoji: '⚡',
    status: 'migrating',
    link: 'https://oranburg.law/NH-RSA-301-B/stable-tokens.html',
  },
]

function ComparisonTable() {
  return (
    <section className="comparison-section">
      <h2>Jurisdiction Comparison</h2>
      <p className="serif analysis-lead">
        Five states have enacted <TermTooltip termId="dao">DAO</TermTooltip>-specific legislation. Each takes a different approach —
        from New Hampshire&apos;s prescriptive 11-requirement framework to Vermont&apos;s permissive LLC overlay.
      </p>
      <div className="comparison-table-wrap">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="comparison-table__cat">Feature</th>
              {STATES.map(s => (
                <th key={s.abbr} className="comparison-table__state">
                  <Link to={s.link} style={{ color: s.color }}>
                    <span className="state-abbr">{s.abbr}</span>
                    <span className="state-cite">{s.cite} ({s.year})</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr key={row.category} className={i % 2 === 0 ? 'comparison-table__row--even' : ''}>
                <td className="comparison-table__cat-cell">{row.category}</td>
                <td className="comparison-table__cell serif">{row.nh}</td>
                <td className="comparison-table__cell serif">{row.wy}</td>
                <td className="comparison-table__cell serif">{row.ut}</td>
                <td className="comparison-table__cell serif">{row.tn}</td>
                <td className="comparison-table__cell serif">{row.vt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="comparison-source">
        Source: <a href="https://oranburg.law/NH-RSA-301-B/comparison.html" target="_blank" rel="noopener noreferrer">NH DAO Law Explorer — Choosing a Jurisdiction</a> (Oranburg, 2024).
      </p>
    </section>
  )
}

export default function Analysis() {
  return (
    <div className="analysis-page container section">
      <header className="analysis-header">
        <h1>Analysis</h1>
        <p className="serif analysis-lead">
          Scholarly analysis, interactive tools, and data visualizations exploring digital asset law and technology.
        </p>
      </header>

      {/* Article Cards */}
      <div className="analysis-cards">
        {ARTICLES.map(article => (
          <div key={article.id} className="analysis-card card">
            <span className="analysis-card__emoji">{article.emoji}</span>
            <h3 className="analysis-card__title">{article.title}</h3>
            <p className="analysis-card__desc serif">{article.description}</p>
            <div className="analysis-card__footer">
              {article.status === 'available' ? (
                <span className="analysis-card__status analysis-card__status--available">✓ See below</span>
              ) : article.link ? (
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="analysis-card__link"
                >
                  Open on NH DAO Explorer →
                </a>
              ) : (
                <span className="analysis-card__status analysis-card__status--migrating">Migrating</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Migration notice */}
      <div className="card" style={{ marginTop: 'var(--space-2xl)', textAlign: 'center' }}>
        <p className="serif" style={{ color: 'var(--text-secondary)' }}>
          The interactive decentralization calculator, registry checklist, and GENIUS dilemma analysis are being
          migrated from the{' '}
          <a href="https://oranburg.law/NH-RSA-301-B/" target="_blank" rel="noopener noreferrer">
            NH DAO Law Explorer
          </a>.
          Full React implementations will be available soon.
        </p>
      </div>
    </div>
  )
}
