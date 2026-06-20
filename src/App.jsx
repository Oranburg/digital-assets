import { Routes, Route } from 'react-router-dom'
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

const SITE_LINKS = [
  { label: "oranburg.law", href: "https://oranburg.law" },
  { label: "CV", href: "https://oranburg.law/cv/" },
  { label: "Blog", href: "https://oranburg.law/blog/" },
  { label: "Digital Assets", href: "https://oranburg.law/digital-assets/" },
]

function PageWrapper({ children }) {
  return (
    <>
      <Breadcrumb
        trail={[{ label: "oranburg.law", href: "https://oranburg.law" }]}
        current="Digital Assets"
      />
      {children}
    </>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <PageWrapper>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/glossary" element={<GlossaryIndex />} />
            <Route path="/glossary/:termId" element={<TermPage />} />
            <Route path="/lens/:lensId" element={<LensPage />} />
            <Route path="/analysis/layer-debate" element={<LayerDebate />} />
            <Route path="/laws/states" element={<StateLaws />} />
            <Route path="/laws/states/:statuteId" element={<StatutePage />} />
            <Route path="/laws/federal" element={<FederalLaws />} />
            <Route path="/laws/federal/:statuteId" element={<StatutePage />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </PageWrapper>
      </main>
      <Footer
        links={SITE_LINKS}
        copyright="2026 Seth C. Oranburg. Scholarly content is original work. Code is MIT licensed."
      />
    </>
  )
}
