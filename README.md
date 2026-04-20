# Digital Assets

An exploratory legal and technical learning web covering blockchain technology, digital asset infrastructure, and the governance frameworks that regulate them.

## The World

Five interconnected sections:

- **The Map** — Visual entry point with L1/L2/L3 layer bands
- **Glossary** — 200+ terms organized by blockchain layer with three definition registers (technical, lay, parenthetical)
- **State Laws** — Interactive statute readers for NH, WY, UT, TN, VT DAO and DUNA laws
- **Federal Laws** — GENIUS Act, CLARITY Act, Dodd-Frank selected sections
- **Analysis** — Scholarly articles, interactive tools, data visualizations

## Layer Architecture

Terms are organized by blockchain layer, and the UI reflects the stack:

- **Layer 1 (Protocol):** Consensus, cryptography, BFT, smart contracts, finality
- **Layer 2 (Infrastructure):** Stablecoins, DeFi, tokenization, custody, settlement
- **Layer 3 (Governance):** GENIUS Act, OCC, CFTC, Howey test, state DAO laws

## Adding a Term

Create one JSON file in `src/data/terms/`:

```json
{
  "id": "your-term-id",
  "term": "Your Term",
  "layer": 1,
  "parent": "parent-term-id",
  "related": ["related-id-1", "related-id-2"],
  "definitions": {
    "technical": "...",
    "lay": "...",
    "parenthetical": "(...)"
  }
}
```

The build resolves bidirectional links automatically.

## Development

```sh
npm install
npm run dev
npm run build
```

## Design System

Typography: Crimson Text (body), Oswald (headings), Roboto (UI).
Palette: NH deep blue, bright blue, gold, granite, white mountain.
Dark mode default with light toggle.

## Origin

Expanded from the [NH DAO Law Explorer](https://oranburg.law/NH-RSA-301-B/).

## Author

Seth C. Oranburg, Professor of Law

## License

Scholarly content is original work. Code is MIT licensed.
