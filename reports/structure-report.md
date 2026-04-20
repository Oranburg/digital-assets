# Digital Assets Glossary: Structure Report

Generated 2026-04-19. Covers 10 existing term files plus ~80 new terms from the OCC Comment Letter glossaries.


## 1. Proposed Hierarchy

Three top-level zones matching the existing `zone` field convention: Protocol, Infrastructure, Governance.

```
Protocol
  blockchain
    distributed-ledger
    fork
      soft-fork
      hard-fork
    smart-contract
      evm
    block
  consensus
    bft
      liveness-attack
    proof-of-work
      51-percent-attack
    proof-of-stake
    finality
  cryptography
    hash-function
    merkle-tree
    zero-knowledge-proof
      zk-snark
      zk-stark

Infrastructure
  stablecoin
    payment-stablecoin
      permitted-issuer
      outstanding-issuance-value
      redemption
        extended-redemption-window
        10-pct-redemption-threshold
      settlement-asset
      wholesale-banking-payments
    fiat-backed-stablecoin
    algorithmic-stablecoin
    yield-bearing-stablecoin
    depeg
    usdc
    usdt
  reserve-management
    reserve-requirement
      one-to-one-reserve
      reserve-composition
      reserve-impairment
      fair-value
    reserve-assets
      treasury-bill
      demand-deposits
      repurchase-agreement
        bilateral-reverse-repo
      money-market-fund-shares
    reserve-liquidity
      market-side-liquidity-risk
      receivership-side-liquidity-risk
      operational-capability-to-monetize
    diversification-requirements
      concentration-cap
      single-custodian-concentration
      option-a-principles-based
      option-b-mandatory-quantitative
    custodian
      custodian-insolvency
      commingling-prohibition
      rehypothecation-prohibition
    contingency-plan
    stress-testing
      dodd-frank-stress-tests
      basel-iii-lcr
      repo-market-dislocation
  defi
    liquidity-pool
      curve-3pool
    cascading-liquidations
    collateral
    token
    defi-protocol
  tradfi
    svb
    fdic
      fdic-receivership
      systemic-risk-exception
    insured-depository-institution
    national-bank
    federal-savings-association
  crosstagion
    forward-channel-risk
    reverse-channel-risk
    cross-notification-obligation

Governance
  genius-act
    part-15
    commodity-exclusion-17f
    interagency-coordination-13b
    stablecoin-certification-review-committee
    attestation
      attestation-cycle
      ceo-cfo-certification
  regulatory-agencies
    occ
    cftc
    fdic
    sec
    futures-commission-merchant
  regulatory-concepts
    nprm
    administrative-record
    arbitrary-and-capricious-review
    preamble
    federal-register
    cfr
    safe-harbor
    principles-based-standard
    jurisdictional-ambiguity
    memorandum-of-understanding
    dasp
  dao
    dao-llc
    duna
    dao-registry
    decentralization-threshold
  state-dao-statutes
    nh-rsa-301-b
    wyoming-dao
    utah-dao
    tennessee-dao
    vermont-bbllc
  other-federal
    commodity-exchange-act
    clarity-act
    dodd-frank-act
```


## 2. Cross-Link Recommendations

Each term below lists 2-4 `related` entries that deliberately bridge across zones or across branches within a zone. Existing terms are marked with (E); all others are new.

| Term | related (cross-zone links) |
|---|---|
| **blockchain** (E) | distributed-ledger, consensus, smart-contract, dao |
| **smart-contract** (E) | dao, defi, cascading-liquidations, evm |
| **consensus** (E) | bft, proof-of-stake, proof-of-work, decentralization-threshold |
| **bft** (E) | liveness-attack, 51-percent-attack, finality, decentralization-threshold |
| **liveness-attack** (E) | bft, receivership-side-liquidity-risk, depeg |
| **51-percent-attack** (E) | proof-of-work, bft, decentralization-threshold |
| **stablecoin** (E) | payment-stablecoin, depeg, genius-act, reserve-requirement |
| **depeg** (E) | cascading-liquidations, genius-act, smart-contract, receivership-side-liquidity-risk |
| **genius-act** (E) | payment-stablecoin, occ, cftc, commodity-exclusion-17f |
| **dao** (E) | smart-contract, blockchain, dao-registry, nh-rsa-301-b |
| distributed-ledger | blockchain, dao-registry, smart-contract |
| fork | consensus, blockchain, dao |
| proof-of-work | 51-percent-attack, consensus, finality |
| proof-of-stake | consensus, finality, decentralization-threshold |
| finality | consensus, bft, settlement-asset |
| payment-stablecoin | genius-act, reserve-requirement, permitted-issuer, commodity-exclusion-17f |
| algorithmic-stablecoin | stablecoin, depeg, genius-act |
| fiat-backed-stablecoin | stablecoin, reserve-composition, usdc |
| yield-bearing-stablecoin | stablecoin, sec, payment-stablecoin |
| permitted-issuer | genius-act, occ, payment-stablecoin, jurisdictional-ambiguity |
| usdc | stablecoin, depeg, svb, curve-3pool |
| reserve-requirement | one-to-one-reserve, reserve-composition, genius-act, stablecoin |
| reserve-composition | reserve-assets, reserve-liquidity, attestation, diversification-requirements |
| reserve-liquidity | receivership-side-liquidity-risk, market-side-liquidity-risk, custodian-insolvency, depeg |
| receivership-side-liquidity-risk | fdic-receivership, custodian-insolvency, depeg, crosstagion |
| market-side-liquidity-risk | repo-market-dislocation, treasury-bill, stress-testing |
| custodian | custodian-insolvency, commingling-prohibition, reserve-liquidity, fdic |
| custodian-insolvency | fdic-receivership, depeg, contingency-plan, systemic-risk-exception |
| cascading-liquidations | depeg, smart-contract, curve-3pool, defi |
| curve-3pool | usdc, cascading-liquidations, liquidity-pool, depeg |
| crosstagion | forward-channel-risk, reverse-channel-risk, depeg, genius-act |
| forward-channel-risk | reserve-requirement, genius-act, crosstagion |
| reverse-channel-risk | fdic-receivership, depeg, crosstagion, custodian-insolvency |
| concentration-cap | diversification-requirements, single-custodian-concentration, svb |
| svb | fdic-receivership, usdc, depeg, systemic-risk-exception |
| fdic-receivership | fdic, svb, systemic-risk-exception, receivership-side-liquidity-risk |
| systemic-risk-exception | fdic-receivership, svb, depeg |
| stress-testing | dodd-frank-stress-tests, basel-iii-lcr, repo-market-dislocation, reserve-liquidity |
| contingency-plan | custodian-insolvency, cross-notification-obligation, stress-testing |
| occ | genius-act, part-15, nprm, cftc |
| cftc | commodity-exclusion-17f, occ, jurisdictional-ambiguity, commodity-exchange-act |
| commodity-exclusion-17f | genius-act, cftc, jurisdictional-ambiguity, payment-stablecoin |
| jurisdictional-ambiguity | commodity-exclusion-17f, cftc, occ, memorandum-of-understanding |
| attestation | attestation-cycle, ceo-cfo-certification, reserve-composition, genius-act |
| part-15 | occ, genius-act, nprm, reserve-requirement |
| nprm | occ, part-15, administrative-record, preamble |
| dao-registry | dao, nh-rsa-301-b, blockchain, distributed-ledger |
| decentralization-threshold | dao, bft, 51-percent-attack, nh-rsa-301-b |
| nh-rsa-301-b | dao, dao-registry, decentralization-threshold, smart-contract |
| dasp | stablecoin, genius-act, permitted-issuer |
| stablecoin-certification-review-committee | genius-act, occ, fdic |
| memorandum-of-understanding | occ, cftc, interagency-coordination-13b |
| collateral | cascading-liquidations, defi, rehypothecation-prohibition, stablecoin |
| settlement-asset | payment-stablecoin, wholesale-banking-payments, finality |
| redemption | depeg, extended-redemption-window, reserve-liquidity, payment-stablecoin |
| outstanding-issuance-value | depeg, reserve-requirement, payment-stablecoin |


## 3. Article Links (see_also)

Article pages are referenced by their likely site paths, derived from the legacy HTML filenames.

| Article page | Terms that should link to it via `see_also` |
|---|---|
| `/analysis/comparison/` | dao, dao-llc, duna, nh-rsa-301-b, wyoming-dao, utah-dao, tennessee-dao, vermont-bbllc, dao-registry, decentralization-threshold |
| `/analysis/decentralization/` | consensus, bft, liveness-attack, 51-percent-attack, proof-of-work, proof-of-stake, decentralization-threshold, dao, finality |
| `/analysis/registry/` | dao, dao-registry, nh-rsa-301-b, blockchain, distributed-ledger, smart-contract |
| `/analysis/stable-tokens/` | stablecoin, payment-stablecoin, depeg, usdc, genius-act, algorithmic-stablecoin, fiat-backed-stablecoin, yield-bearing-stablecoin, reserve-requirement, commodity-exclusion-17f, permitted-issuer |
| `/analysis/genius/` | genius-act, part-15, occ, cftc, attestation, commodity-exclusion-17f, payment-stablecoin, reserve-requirement, stablecoin-certification-review-committee, interagency-coordination-13b, nprm |
| `/laws/nh-rsa-301-b/` | dao, dao-registry, nh-rsa-301-b, blockchain, smart-contract, decentralization-threshold, fork |


## 4. Entry Points

Recommended "start here" terms for each zone. These are high-connectivity nodes that orient new readers before they branch into specialist subtopics.

**Protocol zone** (3 terms)

1. **blockchain** -- root concept; connects to consensus, smart-contract, distributed-ledger
2. **consensus** -- gateway to security subtree (bft, proof-of-work, proof-of-stake)
3. **smart-contract** -- bridge from Protocol to both Infrastructure (defi, cascading-liquidations) and Governance (dao)

**Infrastructure zone** (5 terms)

1. **stablecoin** -- root of the entire stablecoin family; links to payment-stablecoin, depeg, reserve-requirement
2. **depeg** -- narrative anchor (SVB case study); bridges to cascading-liquidations, genius-act, receivership-side-liquidity-risk
3. **reserve-requirement** -- entry to the reserve-management subtree
4. **crosstagion** -- conceptual framework unique to this site; links forward-channel and reverse-channel risk
5. **usdc** -- concrete example readers can relate to; connects stablecoin theory to the SVB facts

**Governance zone** (4 terms)

1. **genius-act** -- central federal statute; connects to occ, cftc, payment-stablecoin, commodity-exclusion-17f
2. **dao** -- central entity concept; connects to smart-contract, nh-rsa-301-b, dao-registry
3. **occ** -- primary regulator for stablecoin issuers; gateway to part-15, nprm
4. **nh-rsa-301-b** -- anchor state statute; connects to dao-registry, decentralization-threshold


## Notes on Design Decisions

**Why three zones instead of more.** The existing JSON files use exactly three zone values (protocol, infrastructure, governance). Adding more would require schema changes across the codebase. The three-zone model is also pedagogically clean: how it works (Protocol), what runs on it (Infrastructure), who regulates it (Governance).

**Crosstagion placement.** Crosstagion sits in Infrastructure rather than Governance because the concept describes a market-contagion mechanism (stress transmission between TradFi and DeFi), not a regulatory structure. Its children (forward-channel-risk, reverse-channel-risk) describe directional risk flows. However, crosstagion's `related` links reach heavily into Governance (genius-act, occ) to create the intended cross-zone connectivity.

**Deduplication across glossaries.** The two source glossaries overlap on approximately 20 terms (stablecoin, depeg, GENIUS Act, USDC, custodian, DeFi, smart contract, redemption, etc.). The hierarchy above merges these into single entries. Where definitions differ, the OCC Comment Letter Glossary (70 terms) should be treated as the primary source because its definitions are more technically precise and cite-rich.

**Leaf vs. branch terms.** Some terms from the glossaries (e.g., "tenor," "federal register," "preamble") are reference-only concepts that do not need rich definition pages. These are placed as leaves under their logical parent and can be implemented as tooltip-only entries rather than full term pages if desired.
