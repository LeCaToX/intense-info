import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CategoriesPage from './pages/CategoriesPage'
import CategoryDetail from './pages/CategoryDetail'
import ComparePage from './pages/ComparePage'
import ExplorePage from './pages/ExplorePage'
import FaqPage from './pages/FaqPage'
import HistoryPage from './pages/HistoryPage'
import HomePage from './pages/HomePage'
import IntensePage from './pages/IntensePage'
import ProgramDetail from './pages/ProgramDetail'
import SourcesPage from './pages/SourcesPage'
import StatisticsPage from './pages/StatisticsPage'
import UniversitiesPage from './pages/UniversitiesPage'
import UniversityDetail from './pages/UniversityDetail'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ExplorePage />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />
          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="/universities/:id" element={<UniversityDetail />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/intense" element={<IntensePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/sources" element={<SourcesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
