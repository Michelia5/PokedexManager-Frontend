import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import Header from "../components/Header";
import BackgroundImage from "/images/other/sfondo.jpg";
import { Button } from "../components/ui/button";

interface Pokemon {
  nationalNumber: number;
  englishName: string;
  primaryType: string;
  secondaryType: string | null;
  imageUrl: string;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [results, setResults] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:7000/pokemon?query=${encodeURIComponent(query || "")}`);
        if (!response.ok) throw new Error("Errore nel recupero dei risultati di ricerca");
        const data = await response.json();

        const mappedResults = data.map((pokemon: any) => ({
          nationalNumber: pokemon.nationalNumber,
          englishName: pokemon.englishName,
          primaryType: pokemon.primaryType,
          secondaryType: pokemon.secondaryType || null,
          imageUrl: `/images/large/${String(pokemon.nationalNumber).padStart(3, "0")}.png`,
        }));
        setResults(mappedResults);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <p>Caricamento in corso...</p>;

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
        className="text-white"
      >
        <div className="container mx-auto p-4">

          <h1 className="text-3xl font-bold mb-8 text-center mt-8">Risultati della Ricerca: "{query}"</h1>
          {error ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg shadow-md"
                onClick={() => navigate("/pokemon")}
              >
                Vai alla Lista Completa Pokémon
              </Button>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {results.map((pokemon) => (
                <div className="max-w-xs mx-auto" key={pokemon.nationalNumber}>
                  <PokemonCard
                    nationalNumber={pokemon.nationalNumber}
                    englishName={pokemon.englishName}
                    primaryType={pokemon.primaryType}
                    secondaryType={pokemon.secondaryType}
                    imageUrl={pokemon.imageUrl}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="font-semibold text-xl">Nessun Pokémon trovato per la ricerca: "{query}".</p>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg shadow-md mt-8"
                onClick={() => navigate("/pokemon")}
              >
                Vai alla Lista Completa Pokémon
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
