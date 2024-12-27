import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import BackgroundImage from "/images/other/sfondo.jpg";

interface Pokemon {
  nationalNumber: number;
  englishName: string;
  primaryType: string;
  secondaryType: string | null;
  imageUrl: string;
}

const PokemonListPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [primaryType, setPrimaryType] = useState<string>("");
  const [secondaryType, setSecondaryType] = useState<string>("");
  const [gen, setGen] = useState<string>("");

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);

    try {
      const params: any = {};
      if (searchQuery) params.query = searchQuery;
      if (primaryType) params.primaryType = primaryType;
      if (secondaryType) params.secondaryType = secondaryType;
      if (gen) params.gen = gen;

      const response = await axios.get("http://localhost:7000/pokemon", {
        params,
      });

      const data = response.data.map((pokemon: any) => ({
        ...pokemon,
        imageUrl: `/images/small/${String(pokemon.nationalNumber).padStart(3, "0")}.png`,
      }));

      setPokemonList(data);
    } catch (err) {
      setError("Errore durante il caricamento dei Pokémon");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [searchQuery, primaryType, secondaryType, gen]);

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "repeat", // Ripete il pattern
          backgroundSize: "auto",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
      >
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-center my-8 text-white drop-shadow-lg">
            Lista dei Pokémon
          </h1>

          {/* Barra di ricerca */}
          <div className="mb-6 flex justify-center items-center">
            <input
              type="text"
              placeholder="Cerca per nome o numero..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-l px-4 py-2 flex-grow max-w-md"
            />
          </div>

          {/* Filtri */}
          <div className="flex justify-center items-center mb-8 space-x-4">
            <select
              value={primaryType}
              onChange={(e) => setPrimaryType(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300"
            >
              <option value="">Tipo Primario</option>
              <option value="Acciaio">Acciaio</option>
              <option value="Acqua">Acqua</option>
              <option value="Buio">Buio</option>
              <option value="Coleottero">Coleottero</option>
              <option value="Drago">Drago</option>
              <option value="Elettro">Elettro</option>
              <option value="Erba">Erba</option>
              <option value="Folletto">Folletto</option>
              <option value="Fuoco">Fuoco</option>
              <option value="Ghiaccio">Ghiaccio</option>
              <option value="Lotta">Lotta</option>
              <option value="Normale">Normale</option>
              <option value="Psico">Psico</option>
              <option value="Roccia">Roccia</option>
              <option value="Spettro">Spettro</option>
              <option value="Terra">Terra</option>
              <option value="Veleno">Veleno</option>
              <option value="Volante">Volante</option>
            </select>

            <select
              value={secondaryType}
              onChange={(e) => setSecondaryType(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300"
            >
              <option value="">Tipo Secondario</option>
              <option value="Acciaio">Acciaio</option>
              <option value="Acqua">Acqua</option>
              <option value="Buio">Buio</option>
              <option value="Coleottero">Coleottero</option>
              <option value="Drago">Drago</option>
              <option value="Elettro">Elettro</option>
              <option value="Erba">Erba</option>
              <option value="Folletto">Folletto</option>
              <option value="Fuoco">Fuoco</option>
              <option value="Ghiaccio">Ghiaccio</option>
              <option value="Lotta">Lotta</option>
              <option value="Psico">Psico</option>
              <option value="Roccia">Roccia</option>
              <option value="Spettro">Spettro</option>
              <option value="Terra">Terra</option>
              <option value="Veleno">Veleno</option>
            </select>

            <select
              value={gen}
              onChange={(e) => setGen(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300"
            >
              <option value="">Generazione</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
            </select>
          </div>

          {/* Griglia dei Pokémon */}
          {loading ? (
            <p className="text-white text-">Caricamento in corso...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="pokemon-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {pokemonList.map((pokemon) => (
                <PokemonCard
                  key={pokemon.nationalNumber}
                  nationalNumber={pokemon.nationalNumber}
                  englishName={pokemon.englishName}
                  primaryType={pokemon.primaryType}
                  secondaryType={pokemon.secondaryType}
                  imageUrl={pokemon.imageUrl}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonListPage;
