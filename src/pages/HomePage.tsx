import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Input } from "../components/ui/input";
import HomeBackground from "/images/other/pokemon-wallpaper.jpg";
import RandomBackground from "/images/other/pokeball.jpg";
import FunctionalityBackground from "/images/other/sfondo.jpg";
import Footer from "../components/Footer";
import PokemonCard from "../components/PokemonCard";
import { motion } from "framer-motion";
import axios from "axios";

const HomePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [randomPokemon, setRandomPokemon] = useState<any[]>([]);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(search.trim())}`);
    }
  };

  const navigateToRandomPokemon = () => {
    if (randomPokemon.length > 0) {
      const randomIndex = Math.floor(Math.random() * randomPokemon.length);
      navigate(`/pokemon/${randomPokemon[randomIndex].nationalNumber}`);
    }
  };

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const response = await axios.get("http://localhost:7000/pokemon");
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        setRandomPokemon(shuffled.slice(0, 5));
      } catch (error) {
        console.error("Errore nel recupero dei Pokémon casuali", error);
      }
    };

    fetchRandomPokemon();
  }, []);

  return (
    <>
      <Header />

      {/* Sezione Hero */}
      <div className="relative min-h-[70vh] bg-gradient-to-b from-blue-500 to-purple-600 text-white flex items-center">
        <div className="w-1/2 h-full ml-6">
          <img
            src={HomeBackground}
            alt="pokemon-background"
            className="ml- object-cover w-full h-full"
          />
        </div>
        <div className="z-10 w-1/2 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            className="text-5xl font-bold mb-4 drop-shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Benvenuto su Pokédex Manager!
          </motion.h1>
          <motion.p
            className="text-lg mb-6 max-w-md drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Trova, gestisci e scopri tutto sui tuoi Pokémon preferiti in pochi
            clic.
          </motion.p>
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Input
              placeholder="Cerca pokémon per nome"
              className="w-72 text-black bg-white border-none rounded-full shadow-lg focus:outline-none px-4 py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="ml-4 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              onClick={handleSearch}
            >
              Cerca
            </Button>
          </motion.div>
          <motion.p
            className="mb-4 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            oppure
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link to="/pokemon">
              <Button className="px-6 py-3 text-lg rounded-lg transition-transform">
                Esplora i Pokémon
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Sezione Funzionalità Principali */}
      <div
        className="py-12 text-white"
        style={{
          backgroundImage: `url(${FunctionalityBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Funzionalità Principali
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="bg-gray-700 bg-opacity-70 p-6 rounded-lg text-center transform transition hover:scale-105 cursor-pointer shadow-2xl border border-white"
            onClick={() => navigate("/pokemon")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-2 text-white">Esplora Pokémon</h3>
            <p className="text-sm text-white">
              Trova informazioni dettagliate sui tuoi Pokémon preferiti.
            </p>
          </motion.div>
          <motion.div
            className="bg-gray-700 bg-opacity-70 p-6 rounded-lg text-center transform transition hover:scale-105 cursor-pointer shadow-2xl border border-white"
            onClick={navigateToRandomPokemon}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-2 text-white">Scopri le Evoluzioni</h3>
            <p className="text-sm text-white">Scopri tutte le evoluzioni dei Pokémon.</p>
          </motion.div>
          <motion.div
            className="bg-gray-700 bg-opacity-70 p-6 rounded-lg text-center transform transition hover:scale-105 cursor-pointer shadow-2xl border border-white"
            onClick={() => navigate("/collection")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-2 text-white">Gestisci Collezione</h3>
            <p className="text-sm text-white">
              Organizza la tua collezione Pokémon personale.
            </p>
          </motion.div>
        </div>
      </div>


      {/* Sezione Pokémon Casuali */}
      <div
        className="py-12 text-white"
        style={{
          backgroundImage: `url(${RandomBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Pokémon Casuali da conoscere
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {randomPokemon.map((pokemon, index) => (
            <motion.div
              key={pokemon.nationalNumber}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <PokemonCard
                nationalNumber={pokemon.nationalNumber}
                englishName={pokemon.englishName}
                primaryType={pokemon.primaryType}
                secondaryType={pokemon.secondaryType}
                imageUrl={`/images/large/${String(
                  pokemon.nationalNumber
                ).padStart(3, "0")}.png`}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
