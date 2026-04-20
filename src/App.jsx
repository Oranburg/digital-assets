import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import MapPage from './pages/MapPage'
import GlossaryIndex from './pages/GlossaryIndex'
import TermPage from './pages/TermPage'
import LensPage from './pages/LensPage'
import LayerView from './pages/LayerView'
import StateLaws from './pages/StateLaws'
import FederalLaws from './pages/FederalLaws'
import Analysis from './pages/Analysis'
import StatutePage from './pages/StatutePage'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/glossary" element={<GlossaryIndex />} />
          <Route path="/glossary/:termId" element={<TermPage />} />
          <Route path="/lens/:lensId" element={<LensPage />} />
          <Route path="/layer/:layerId" element={<LayerView />} />
          <Route path="/laws/states" element={<StateLaws />} />
          <Route path="/laws/states/:statuteId" element={<StatutePage />} />
          <Route path="/laws/federal" element={<FederalLaws />} />
          <Route path="/laws/federal/:statuteId" element={<StatutePage />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
