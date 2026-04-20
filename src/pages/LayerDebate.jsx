import { Link } from 'react-router-dom'
import TermTooltip from '../components/TermTooltip'
import './LayerDebate.css'

const T = TermTooltip

const SCALING_MODEL = [
  { layer: 'Layer 0', name: 'Cross-chain Infrastructure', examples: 'Polkadot, Cosmos, Avalanche', description: 'Protocols that enable communication between independent blockchains. Sometimes called the "internet of blockchains."' },
  { layer: 'Layer 1', name: 'Base Chain', examples: 'Bitcoin, Ethereum, Solana', description: 'The primary blockchain that processes transactions, maintains consensus, and provides the security guarantees that everything else inherits.' },
  { layer: 'Layer 2', name: 'Scaling Solutions', examples: 'Lightning Network, Arbitrum, Optimism', description: 'Protocols built on top of a Layer 1 chain to increase transaction throughput and reduce costs while inheriting the base chain\'s security.' },
  { layer: 'Layer 3', name: 'Application Layer', examples: 'Metamask, Uniswap, Chainlink', description: 'User-facing applications and services that interact with Layer 1 and Layer 2 infrastructure. Wallets, exchanges, oracles, and DeFi protocols.' },
]

const ARCHITECTURE_MODEL = [
  { layer: 'Layer 0', name: 'Hardware / Physical', description: 'Servers, internet connections, data centers, and the physical infrastructure that runs blockchain nodes.' },
  { layer: 'Layer 1', name: 'Data Layer', description: 'The blockchain data structure itself: blocks, transactions, Merkle trees, and the append-only ledger.' },
  { layer: 'Layer 2', name: 'Network Layer', description: 'Peer-to-peer communication between nodes: transaction propagation, block broadcasting, and network topology.' },
  { layer: 'Layer 3', name: 'Consensus Layer', description: 'The consensus mechanism (Proof of Work, Proof of Stake, BFT variants) that determines how nodes agree on the state of the ledger.' },
  { layer: 'Layer 4', name: 'Application Layer', description: 'Smart contracts, dApps, wallets, and all software that enables users to interact with the blockchain.' },
]

const CONFLICTS = [
  { concept: 'Consensus', scaling: 'Part of Layer 1 (embedded in the base chain)', architecture: 'Its own layer (Layer 3)', implication: 'When a regulator asks "which layer does consensus operate on?" the answer depends on which framework they learned from.' },
  { concept: 'Layer 2', scaling: 'Rollups, state channels, scaling solutions', architecture: 'Network communication between nodes', implication: 'A policy paper discussing "Layer 2 regulation" could mean regulating Arbitrum or regulating how nodes communicate, depending on the author\'s framework.' },
  { concept: 'Application', scaling: 'Layer 3 (wallets, DeFi, dApps)', architecture: 'Layer 4 (same things, different number)', implication: 'Numbering alone is not a reliable shorthand. Always specify what you mean.' },
]

export default function LayerDebate() {
  return (
    <div className="layer-debate">
      <header className="layer-debate__hero">
        <div className="container">
          <h1>What Are Blockchain "Layers"?</h1>
          <p className="layer-debate__subtitle serif">
            Two Frameworks, One Vocabulary, No Consensus
          </p>
        </div>
      </header>

      <div className="container">
        <article className="layer-debate__body">
          <section className="layer-debate__section">
            <p className="layer-debate__intro serif">
              The blockchain industry uses the word "layer" to describe different levels of a technology stack. The problem is that there are two competing frameworks for what the layers are, and they assign different meanings to the same numbers. A "Layer 2" in one framework is not the same thing as a "Layer 2" in the other. This creates real confusion for lawyers, policymakers, and anyone reading technical literature for the first time.
            </p>

            <p className="serif">
              This page presents both frameworks side by side, identifies where they conflict, and explains why the ambiguity matters for legal and regulatory analysis. We do not take a side. Both frameworks describe real aspects of how <T termId="blockchain">blockchain</T> systems work. They simply answer different questions.
            </p>
          </section>

          <section className="layer-debate__section">
            <h2>Framework 1: The Scaling Model</h2>
            <p className="serif">
              This is the framework most commonly used in industry, investment, and regulatory discussions. It organizes blockchain systems by where a project sits in the scaling hierarchy: the base chain, the solutions built on top of it, and the applications built on those solutions. When a venture capitalist says "we invest in Layer 2," or when a regulatory proposal mentions "Layer 1 blockchains," this is the framework they are using.
            </p>
            <div className="layer-table">
              {SCALING_MODEL.map((row, i) => (
                <div key={i} className="layer-table__row">
                  <div className="layer-table__label">{row.layer}</div>
                  <div className="layer-table__content">
                    <strong>{row.name}</strong>
                    {row.examples && <span className="layer-table__examples">{row.examples}</span>}
                    <p className="serif">{row.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="layer-debate__section">
            <h2>Framework 2: The Architecture Model</h2>
            <p className="serif">
              This framework comes from computer science and maps more closely to how engineers think about protocol stacks (analogous to the OSI or TCP/IP models in networking). It organizes blockchain systems by functional role: hardware at the bottom, data structure above that, then networking, then <T termId="consensus">consensus</T>, then applications at the top. Academic papers and technical documentation more often use this framework.
            </p>
            <div className="layer-table">
              {ARCHITECTURE_MODEL.map((row, i) => (
                <div key={i} className="layer-table__row">
                  <div className="layer-table__label">{row.layer}</div>
                  <div className="layer-table__content">
                    <strong>{row.name}</strong>
                    <p className="serif">{row.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="layer-debate__section">
            <h2>Where the Frameworks Conflict</h2>
            <p className="serif">
              The two frameworks are not just different numbering schemes for the same concepts. They carve the technology at different joints, which means the same layer number refers to fundamentally different things depending on which framework the speaker has in mind.
            </p>
            <div className="conflict-table">
              <div className="conflict-table__header">
                <span>Concept</span>
                <span>Scaling Model</span>
                <span>Architecture Model</span>
                <span>Why It Matters</span>
              </div>
              {CONFLICTS.map((row, i) => (
                <div key={i} className="conflict-table__row">
                  <span className="conflict-table__concept">{row.concept}</span>
                  <span className="serif">{row.scaling}</span>
                  <span className="serif">{row.architecture}</span>
                  <span className="serif conflict-table__implication">{row.implication}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="layer-debate__section">
            <h2>Why This Matters for Law and Regulation</h2>
            <p className="serif">
              Legal and regulatory documents increasingly reference blockchain "layers" without specifying which framework they mean. The <T termId="genius-act">GENIUS Act</T> regulates "payment stablecoin issuers" that operate on Layer 1 blockchains, but the statute does not define "Layer 1." A court interpreting this provision after <em>Loper Bright Enterprises v. Raimondo</em>, 603 U.S. 369 (2024), would exercise independent judgment on the meaning of that term, with no agency deference to fall back on.
            </p>
            <p className="serif">
              State <T termId="dao">DAO</T> statutes reference "blockchain" and "smart contract" without specifying at which layer of the stack these concepts operate. New Hampshire's RSA 301-B defines "blockchain" (§ 301-B:5(IV)) and "smart contract" (§ 301-B:5(XXXIII)) but does not use layer terminology at all, which may be the more prudent approach.
            </p>
            <p className="serif">
              For legal professionals encountering layer terminology in technical documents, contracts, or regulatory proposals, the practical advice is straightforward: when someone says "Layer 2," ask which framework they are using. If the document does not specify, assume the scaling model (Layer 1 = base chain, Layer 2 = scaling solution) because that is the more common usage in regulatory and commercial contexts. But verify.
            </p>
          </section>

          <section className="layer-debate__section">
            <h2>Further Reading</h2>
            <p className="serif">
              The glossary entries for <T termId="blockchain">blockchain</T>, <T termId="consensus">consensus mechanism</T>, <T termId="rollup">rollup</T>, <T termId="sharding">sharding</T>, and <T termId="proof-of-stake">proof of stake</T> each provide technical, ontological, and teleological perspectives on the concepts that the layer frameworks attempt to organize.
            </p>
            <div className="layer-debate__links">
              <Link to="/glossary" className="layer-debate__link">Browse the Glossary</Link>
              <Link to="/lens/techne" className="layer-debate__link">Technology Lens</Link>
              <Link to="/lens/ontology" className="layer-debate__link">Ontology Lens</Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  )
}
