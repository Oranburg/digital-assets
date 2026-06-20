import { Routes, Route, useParams } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Breadcrumb from './components/Breadcrumb'
import MapPage from './pages/MapPage'
import GlossaryIndex from './pages/GlossaryIndex'
import TermPage from './pages/TermPage'
import LensPage from './pages/LensPage'
import LayerDebate from './pages/LayerDebate'
import StateLaws from './pages/StateLaws'
import FederalLaws from './pages/FederalLaws'
import Analysis from './pages/Analysis'
import StatutePage from './pages/StatutePage'
import { getTerm } from './utils/terms'
import { getStatute } from './data/statutes/index.js'

const HOME = { label: "oranburg.law", href: "https://oranburg.law" }
const DA   = { label: "Digital Assets", href: "/" }

const SITE_LINKS = [
  { label: "oranburg.law", href: "https://oranburg.law" },
  { label: "CV", href: "https://oranburg.law/cv/" },
  { label: "Blog", href: "https://oranburg.law/blog/" },
  { label: "Digital Assets", href: "https://oranburg.law/digital-assets/" },
]

// Breadcrumb wrappers: each computes trail + current from route params so the
// shared <Breadcrumb> component is the only breadcrumb nav on every page.

function DefaultBreadcrumb() {
  return <Breadcrumb trail={[HOME]} current="Digital Assets" />
}

function GlossaryBreadcrumb() {
  return <Breadcrumb trail={[HOME, DA]} current="Glossary" />
}

function TermBreadcrumb() {
  const { termId } = useParams()
  const term = getTerm(termId)
  const parent = term?.parent ? getTerm(term.parent) : null
  const trail = [HOME, DA, { label: "Glossary", href: "/glossary" }]
  if (parent) trail.push({ label: parent.term, href: `/glossary/${parent.id}` })
  return <Breadcrumb trail={trail} current={term?.term ?? termId} />
}

function LensBreadcrumb() {
  const { lensId } = useParams()
  return <Breadcrumb trail={[HOME, DA]} current={lensId} />
}

function StateLawsBreadcrumb() {
  return <Breadcrumb trail={[HOME, DA]} current="State Laws" />
}

function FederalLawsBreadcrumb() {
  return <Breadcrumb trail={[HOME, DA]} current="Federal Laws" />
}

function StatuteBreadcrumb({ base, baseLabel, basePath }) {
  const { statuteId } = useParams()
  const meta = getStatute(statuteId)
  return (
    <Breadcrumb
      trail={[HOME, DA, { label: baseLabel, href: basePath }]}
      current={meta?.shortTitle ?? statuteId}
    />
  )
}

function AnalysisBreadcrumb() {
  return <Breadcrumb trail={[HOME, DA]} current="Analysis" />
}

function LayerDebateBreadcrumb() {
  return (
    <Breadcrumb
      trail={[HOME, DA, { label: "Analysis", href: "/analysis" }]}
      current="Layer Debate"
    />
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<><DefaultBreadcrumb /><MapPage /></>} />
          <Route path="/glossary" element={<><GlossaryBreadcrumb /><GlossaryIndex /></>} />
          <Route path="/glossary/:termId" element={<><TermBreadcrumb /><TermPage /></>} />
          <Route path="/lens/:lensId" element={<><LensBreadcrumb /><LensPage /></>} />
          <Route path="/analysis/layer-debate" element={<><LayerDebateBreadcrumb /><LayerDebate /></>} />
          <Route path="/laws/states" element={<><StateLawsBreadcrumb /><StateLaws /></>} />
          <Route path="/laws/states/:statuteId" element={
            <><StatuteBreadcrumb baseLabel="State Laws" basePath="/laws/states" /><StatutePage /></>
          } />
          <Route path="/laws/federal" element={<><FederalLawsBreadcrumb /><FederalLaws /></>} />
          <Route path="/laws/federal/:statuteId" element={
            <><StatuteBreadcrumb baseLabel="Federal Laws" basePath="/laws/federal" /><StatutePage /></>
          } />
          <Route path="/analysis" element={<><AnalysisBreadcrumb /><Analysis /></>} />
        </Routes>
      </main>
      <Footer
        links={SITE_LINKS}
        copyright="2026 Seth C. Oranburg. Scholarly content is original work. Code is MIT licensed."
      />
    </>
  )
}
