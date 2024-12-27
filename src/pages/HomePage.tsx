import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Input } from '../components/ui/input';
import HomeBackground from '/images/other/pokemon.jpg';

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <Header />

      {/* Container centrale con sfondo */}
      <div className="relative min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center">
        {/* Immagine di sfondo */}
        <div className="absolute inset-0 z-0">
          <img
            src={HomeBackground}
            alt="pokemon-background"
            className="object-cover w-full h-full opacity-50"
          />
        </div>

        {/* Contenuto in primo piano */}
        <div className="z-10 text-center">
          <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
            Benvenuto su Pokédex Manager!
          </h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto drop-shadow-lg">
            Trova, gestisci e scopri tutto sui tuoi Pokémon preferiti in pochi clic.
          </p>

          {/* Barra di ricerca */}
          <div className="mb-6 flex justify-center">
            <Input
              placeholder="Cerca per nome o generazione"
              className="w-80 text-black bg-white border-none rounded-full shadow-lg focus:outline-none px-4 py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              onClick={handleSearch}
            >
              Cerca
            </Button>
          </div>

          <p className="mb-6 flex justify-center font-semibold">oppure</p>

          {/* Link a /pokemon per visualizzare l'elenco dei Pokémon */}
          <Link to="/pokemon">
            <Button className="px-6 py-3 text-lg rounded-lg transition-transform">
              Esplora i Pokémon
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
