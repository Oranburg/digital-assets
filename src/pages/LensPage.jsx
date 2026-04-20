import { useParams, Link } from 'react-router-dom'
import { getAllTerms } from '../utils/terms'
import TermTooltip from '../components/TermTooltip'
import './LensPage.css'

const T = TermTooltip

const LENS_CONTENT = {
  ontology: () => (
    <>
      <p className="lens-body__intro serif">
        Ontology is the branch of philosophy concerned with the nature of being: what exists, what kinds of things exist, and how they relate to one another. In the context of digital assets, ontology asks the classification question. Is a <T termId="stablecoin">token</T> a security or a commodity? Is a <T termId="stablecoin">stablecoin</T> money or a financial instrument? Is a <T termId="dao">DAO</T> a partnership, a corporation, or something entirely new?
      </p>
      <p className="lens-body__text serif">
        These are not abstract questions. The legal classification of a digital asset determines which agency regulates it, which laws apply, which courts have jurisdiction, and what rights its holders possess. When the SEC argues that a token is an investment contract under the Howey test, it is making an ontological claim: this thing IS a security, regardless of what its creators call it. When the CLARITY Act proposes that certain tokens are "digital commodities," it is making a competing ontological claim. When New Hampshire RSA 301-B defines a <T termId="dao">DAO</T> as a legal entity with limited liability, it is settling an ontological question that other jurisdictions have left open.
      </p>
      <p className="lens-body__conclusion serif">
        Every term in this glossary has an ontological dimension, surfaced in the "What is it?" section. That section answers: what is this thing, how is it classified, and what does the classification mean for who governs it?
      </p>
    </>
  ),
  techne: () => (
    <>
      <p className="lens-body__intro serif">
        Techne is the Greek word for craft, skill, or the systematic knowledge of how to make or do something. Aristotle distinguished techne from episteme (theoretical knowledge) because techne is productive: it is knowledge directed toward making things work. In the context of digital assets, techne asks the mechanistic question. How does a <T termId="consensus">consensus mechanism</T> achieve agreement without a central authority? How does a <T termId="smart-contract">smart contract</T> execute? What happens inside a flash loan transaction?
      </p>
      <p className="lens-body__text serif">
        Lawyers and policymakers routinely make regulatory decisions about technology they do not understand mechanistically. A legislator who votes on <T termId="reserve-requirement">stablecoin reserve requirements</T> without understanding how <T termId="fdic-receivership">FDIC receivership</T> freezes assets is making policy in the dark. A judge deciding whether a <T termId="dao">DAO</T> is an unincorporated association without understanding how on-chain governance voting works is applying legal categories to a mechanism that does not fit them. The technical perspective is not optional background for legal professionals. It is the factual foundation on which classification, liability, and enforcement depend.
      </p>
      <p className="lens-body__conclusion serif">
        Every term in this glossary has a mechanistic dimension, surfaced in the "How does it work?" section. That section explains the process, the components, and the failure modes, so that readers making legal or economic judgments do so on the basis of how the technology actually operates.
      </p>
    </>
  ),
  teleology: () => (
    <>
      <p className="lens-body__intro serif">
        Teleology is the study of ends, purposes, and consequences. It asks not what a thing is or how it works, but what it is for, what it causes, and what follows from its existence. In the context of digital assets, teleology asks the consequential question. What happens when a <T termId="stablecoin">stablecoin</T> <T termId="depeg">depegs</T>? What incentives does a <T termId="consensus">consensus mechanism</T> create? What risks does composability introduce? Why does a regulator care?
      </p>
      <p className="lens-body__text serif">
        The teleological perspective is where law, economics, and technology converge. A <T termId="51-percent-attack">51% attack</T> is a technical vulnerability (techne), a threat to property rights (ontology), and a source of systemic risk with cascading market consequences (teleology). A <T termId="dao">DAO</T> is a novel legal entity (ontology), a governance mechanism encoded in <T termId="smart-contract">smart contracts</T> (techne), and a structure that either concentrates or distributes economic power depending on its token distribution (teleology). No single perspective is sufficient. The teleological lens asks the question that matters most to policymakers: so what? What follows from this, and what should we do about it?
      </p>
      <p className="lens-body__conclusion serif">
        Every term in this glossary has a consequential dimension, surfaced in the "What is it for?" section. That section connects the concept to its legal, economic, and regulatory implications, so that readers understand not just what exists and how it works, but what is at stake.
      </p>
    </>
  ),
}

const LENS_DATA = {
  ontology: {
    title: 'Ontology of Digital Assets',
    emoji: '🏷️',
    greek: 'ὀντολογία',
    pronunciation: 'on-tol-oh-GEE-ah',
    image: '/digital-assets/images/lenses/ontology.png',
    subtitle: 'What is it?',
    field: 'lay',
    intro: 'Ontology is the branch of philosophy concerned with the nature of being: what exists, what kinds of things exist, and how they relate to one another. In the context of digital assets, ontology asks the classification question. Is a token a security or a commodity? Is a stablecoin money or a financial instrument? Is a DAO a partnership, a corporation, or something entirely new?',
    body: 'These are not abstract questions. The legal classification of a digital asset determines which agency regulates it, which laws apply, which courts have jurisdiction, and what rights its holders possess. When the SEC argues that a token is an investment contract under the Howey test, it is making an ontological claim: this thing IS a security, regardless of what its creators call it. When the CLARITY Act proposes that certain tokens are "digital commodities," it is making a competing ontological claim. When New Hampshire RSA 301-B defines a DAO as a legal entity with limited liability, it is settling an ontological question that other jurisdictions have left open.',
    conclusion: 'Every term in this glossary has an ontological dimension, surfaced in the "What is it?" section. That section answers: what is this thing, how is it classified, and what does the classification mean for who governs it?',
    color: 'var(--lens-ontology)',
  },
  techne: {
    title: 'Techne of Digital Assets',
    emoji: '⚙️',
    greek: 'τέχνη',
    pronunciation: 'TEKH-nee',
    image: '/digital-assets/images/lenses/techne.png',
    subtitle: 'How does it work?',
    field: 'technical',
    intro: 'Techne is the Greek word for craft, skill, or the systematic knowledge of how to make or do something. Aristotle distinguished techne from episteme (theoretical knowledge) because techne is productive: it is knowledge directed toward making things work. In the context of digital assets, techne asks the mechanistic question. How does a consensus mechanism achieve agreement without a central authority? How does a smart contract execute? What happens inside a flash loan transaction?',
    body: 'Lawyers and policymakers routinely make regulatory decisions about technology they do not understand mechanistically. A legislator who votes on stablecoin reserve requirements without understanding how FDIC receivership freezes assets is making policy in the dark. A judge deciding whether a DAO is an unincorporated association without understanding how on-chain governance voting works is applying legal categories to a mechanism that does not fit them. The technical perspective is not optional background for legal professionals. It is the factual foundation on which classification, liability, and enforcement depend.',
    conclusion: 'Every term in this glossary has a mechanistic dimension, surfaced in the "How does it work?" section. That section explains the process, the components, and the failure modes, so that readers making legal or economic judgments do so on the basis of how the technology actually operates.',
    color: 'var(--lens-techne)',
  },
  teleology: {
    title: 'Teleology of Digital Assets',
    emoji: '🎯',
    greek: 'τελεολογία',
    pronunciation: 'tel-ee-OL-oh-gee-ah',
    image: '/digital-assets/images/lenses/telos.png',
    subtitle: 'What is it for?',
    field: 'legal_significance',
    intro: 'Teleology is the study of ends, purposes, and consequences. It asks not what a thing is or how it works, but what it is for, what it causes, and what follows from its existence. In the context of digital assets, teleology asks the consequential question. What happens when a stablecoin depegs? What incentives does a consensus mechanism create? What risks does composability introduce? Why does a regulator care?',
    body: 'The teleological perspective is where law, economics, and technology converge. A 51% attack is a technical vulnerability (techne), a threat to property rights (ontology), and a source of systemic risk with cascading market consequences (teleology). A DAO is a novel legal entity (ontology), a governance mechanism encoded in smart contracts (techne), and a structure that either concentrates or distributes economic power depending on its token distribution (teleology). No single perspective is sufficient. The teleological lens asks the question that matters most to policymakers: so what? What follows from this, and what should we do about it?',
    conclusion: 'Every term in this glossary has a consequential dimension, surfaced in the "What is it for?" section. That section connects the concept to its legal, economic, and regulatory implications, so that readers understand not just what exists and how it works, but what is at stake.',
    color: 'var(--lens-teleology)',
  },
}

export default function LensPage() {
  const { lensId } = useParams()
  const lens = LENS_DATA[lensId]

  if (!lens) {
    return (
      <div className="container section">
        <h1>Page not found</h1>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  // Find terms that have content for this lens's field
  const termsWithContent = getAllTerms()
    .filter(t => t.definitions?.[lens.field])
    .slice(0, 12)

  return (
    <div className="lens-page">
      <div className="lens-hero" style={{ '--lens-color': lens.color }}>
        <img src={lens.image} alt="" className="lens-hero__image" />
        <div className="lens-hero__overlay">
          <span className="lens-hero__emoji">{lens.emoji}</span>
          <h1 className="lens-hero__title">{lens.title}</h1>
          <p className="lens-hero__greek">
            {lens.greek} <span className="lens-hero__pron">({lens.pronunciation})</span>
          </p>
          <p className="lens-hero__subtitle serif">{lens.subtitle}</p>
        </div>
      </div>

      <div className="container">
        <article className="lens-body">
          {LENS_CONTENT[lensId]?.() || (
            <>
              <p className="lens-body__intro serif">{lens.intro}</p>
              <p className="lens-body__text serif">{lens.body}</p>
              <p className="lens-body__conclusion serif">{lens.conclusion}</p>
            </>
          )}
        </article>

        <section className="lens-examples">
          <h2>Explore Terms Through This Lens</h2>
          <div className="lens-examples__grid">
            {termsWithContent.map(term => (
              <Link
                key={term.id}
                to={`/glossary/${term.id}`}
                className="lens-example card"
              >
                <h3>{term.term}</h3>
                <p className="serif">
                  {term.definitions[lens.field]?.slice(0, 120)}
                  {term.definitions[lens.field]?.length > 120 ? '\u2026' : ''}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <nav className="lens-nav">
          <h2>The Three Lenses</h2>
          <div className="lens-nav__links">
            {Object.entries(LENS_DATA).map(([id, data]) => (
              <Link
                key={id}
                to={`/lens/${id}`}
                className={`lens-nav__link ${id === lensId ? 'lens-nav__link--active' : ''}`}
                style={{ '--link-color': data.color }}
              >
                <span>{data.emoji}</span> {data.subtitle}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
