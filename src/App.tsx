import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import PokemonListPage from './pages/PokemonListPage.tsx'
import PokemonDetail from './pages/PokemonDetail';
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemon" element={<PokemonListPage />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/search-results" element={<SearchResults />} />
    </Routes>
  )
}

export default App
