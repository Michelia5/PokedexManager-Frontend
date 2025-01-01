import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderSection from "../components/HeaderSection";
import NavigationButtons from "../components/NavigationButtons";
import DescriptionCard from "../components/DescriptionCard";
import BasicInfoCard from "../components/BasicInfoCard";
import AbilitiesCard from "../components/AbilitiesCard";
import StatsCard from "../components/StatsCard";
import EvolutionsCard from "../components/EvolutionsCard";
import Header from "../components/Header";
import BackgroundImage from "/images/other/sfondo.jpg";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";


interface Pokemon {
    nationalNumber: number;
    englishName: string;
    primaryType: string;
    secondaryType?: string;
    classification: string;
    percentMale?: number;
    percentFemale?: number;
    heightM: number;
    weightKg: number;
    captureRate: number;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    abilities0: string;
    abilities1?: string;
    abilitiesSpecial?: string;
    isLegendary: boolean;
    isMythical: boolean;
    description: string;
    evochain0?: string;
    evochain2?: string;
    evochain4?: string;
    evochain6?: string;
    evochain8?: string;
    evochain10?: string;
    evo1Id?: number;
    evo2Id?: number;
    evo3Id?: number;
    evo4Id?: number;
    evo5Id?: number;
    evo6Id?: number;
}

const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
        Acciaio: "#5a8ea1",
        Acqua: "#4d90d5",
        Buio: "#5a5366",
        Coleottero: "#90c12c",
        Drago: "#0a6dc4",
        Elettro: "#f3d23b",
        Erba: "#63bb5b",
        Folletto: "#ec8fe6",
        Fuoco: "#ff9c54",
        Ghiaccio: "#74cec0",
        Lotta: "#ce4069",
        Normale: "#9099a1",
        Psico: "#f97176",
        Roccia: "#c7b78b",
        Spettro: "#5269ac",
        Terra: "#d97746",
        Veleno: "#ab6ac8",
        Volante: "#8fa8dd",
    };
    return colors[type] || "#A8A878";
};


const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`http://localhost:7000/pokemon/${id}`);
        if (!response.ok) throw new Error("Errore nel caricamento del Pokémon.");
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchPokemonDetails();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setConfirmation(null);
    }, error ? 8000 : confirmation ? 4000 : 0);
  
    return () => clearTimeout(timer);
  }, [error, confirmation]);  

  if (!pokemon) return <p>Caricamento...</p>;

  const addToCollection = async (pokemonId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Devi effettuare il login per aggiungere Pokémon alla collezione.");
        return;
      }
      await axios.post("http://localhost:7000/collections",
        { pokemonId, status: "owned" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConfirmation("Pokémon aggiunto con successo alla Collezione.");
    } catch (err: any) {
      const errorMessage = err.response?.data || "Errore durante l'aggiunta.";
      if (err.response?.status === 400 && errorMessage.includes("già presente")) {
        setError("Questo Pokémon è già nella tua collezione!");
      } else {
        setError(errorMessage);
      }
    }
        
  };

  const addToWishlist = async (pokemonId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Devi effettuare il login per aggiungere Pokémon alla wishlist.");
        return;
      }
      await axios.post("http://localhost:7000/collections",
        { pokemonId, status: "wishlist" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConfirmation("Pokémon aggiunto con successo alla Wishlist.");
    } catch (err: any) {
      setError(err.response?.data || "Errore durante l'aggiunta alla wishlist.");
    }
  };

  const handleNavigation = (direction: "prev" | "next") => {
    if (!pokemon) return;
    const newId = direction === "prev" ? pokemon.nationalNumber - 1 : pokemon.nationalNumber + 1;
    navigate(`/pokemon/${newId}`);
  };

  return (
    <>
      <Header />
      
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
      >
        <div className="pokemon-details max-w-4xl mx-auto p-4 space-y-8 text-center mt-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeaderSection
              englishName={pokemon.englishName}
              nationalNumber={pokemon.nationalNumber}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => navigate("/pokemon")}
            >
              Torna alla Lista Pokémon
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            
            <div>
              <NavigationButtons
                onNavigate={handleNavigation}
                onAddToCollection={() => addToCollection(pokemon.nationalNumber)}
                onAddToWishlist={() => addToWishlist(pokemon.nationalNumber)}
                nationalNumber={pokemon.nationalNumber}
              />
            </div>

            {/* Alert di conferma e di errore */}
            <AnimatePresence>
              {confirmation && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Alert
                    variant="default"
                    className="mx-auto max-w-md my-4 bg-green-500 text-lg"
                  >
                    <AlertTitle>Successo</AlertTitle>
                    <AlertDescription>{confirmation}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Alert
                    variant="destructive"
                    className="mx-auto max-w-md my-4 bg-red-600 text-white text-lg"
                  >
                    <AlertTitle>Errore</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <DescriptionCard description={pokemon.description} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <BasicInfoCard
              primaryType={pokemon.primaryType}
              secondaryType={pokemon.secondaryType}
              heightM={pokemon.heightM}
              weightKg={pokemon.weightKg}
              percentMale={pokemon.percentMale}
              percentFemale={pokemon.percentFemale}
              classification={pokemon.classification}
              captureRate={pokemon.captureRate}
              rarity={
                pokemon.isMythical
                  ? "Mitico"
                  : pokemon.isLegendary
                  ? "Leggendario"
                  : "Normale"
              }
              getTypeColor={getTypeColor}
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <AbilitiesCard
              abilities0={pokemon.abilities0}
              abilities1={pokemon.abilities1}
              abilitiesSpecial={pokemon.abilitiesSpecial}
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <StatsCard
              stats={[
                { label: "HP", value: pokemon.hp },
                { label: "Attacco", value: pokemon.attack },
                { label: "Difesa", value: pokemon.defense },
                { label: "Velocità", value: pokemon.speed },
              ]}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <EvolutionsCard
              evolutions={[
                { id: pokemon.evo1Id, name: pokemon.evochain0 },
                { id: pokemon.evo2Id, name: pokemon.evochain2 },
                { id: pokemon.evo3Id, name: pokemon.evochain4 },
                { id: pokemon.evo4Id, name: pokemon.evochain6 },
                { id: pokemon.evo5Id, name: pokemon.evochain8 },
                { id: pokemon.evo6Id, name: pokemon.evochain10 },
              ]}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetail;
