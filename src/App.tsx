import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PokemonListPage from './pages/PokemonListPage'
import PokemonDetail from './pages/PokemonDetail';
import SearchResults from "./pages/SearchResults";
import Informations from './pages/InfoPage';
import Conditions from './pages/TermsPage'
import Privacy from './pages/Privacy'
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CollectionPage from './pages/CollectionPage'

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon" element={<PokemonListPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/info" element={<Informations />} />
        <Route path="/terms&conditions" element={<Conditions />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
  )
}

export default App
