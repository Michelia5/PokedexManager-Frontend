import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardFooter } from "../components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import PokemonCard from "../components/PokemonCard";
import Header from "../components/Header";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import BackgroundImage from "/images/other/sfondo.jpg";
import BackgroundImageNoAccess from "/images/other/pokedex-wallpapers.png";

interface CollectionItem {
  id: number;
  userId: number;
  pokemonId: number;
  status: string;
  englishName: string;
  primaryType: string;
  secondaryType: string | null;
}

const CollectionPage: React.FC = () => {
  const { user } = useUserContext();
  const [owned, setOwned] = useState<CollectionItem[]>([]);
  const [wishlist, setWishlist] = useState<CollectionItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<CollectionItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [primaryType, setPrimaryType] = useState("");
  const [secondaryType, setSecondaryType] = useState("");
  const [activeTab, setActiveTab] = useState<"collection" | "wishlist">("collection");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCollection();
    }
  }, [user]);

  const fetchCollection = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non trovato. Effettua il login.");
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const ownedResponse = await axios.get(
        "http://localhost:7000/collections?status=owned",
        config
      );
      setOwned(ownedResponse.data);

      const wishlistResponse = await axios.get(
        "http://localhost:7000/collections?status=wishlist",
        config
      );
      setWishlist(wishlistResponse.data);
    } catch (err: any) {
      setError(err.response?.data || "Errore durante il recupero della collezione.");
    }
  };

  const removeFromCollection = async (pokemonId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token non trovato.");
      
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(`http://localhost:7000/collections`, {
        ...config,
        params: { pokemon_id: pokemonId },
      });
  
      if (response.status === 200) {
        setOwned((prev) => prev.filter((item) => item.pokemonId !== pokemonId));
        setWishlist((prev) => prev.filter((item) => item.pokemonId !== pokemonId));
      } else {
        throw new Error("Errore durante la rimozione del Pokémon.");
      }
    } catch (err: any) {
      setError(err.response?.data || "Errore durante la rimozione del Pokémon.");
    }
  };
  

  const switchStatus = async (pokemonId: number, newStatus: "owned" | "wishlist") => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token non trovato.");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put("http://localhost:7000/collections", { pokemonId, newStatus }, config);
      fetchCollection();
    } catch (err: any) {
      setError(err.response?.data || "Errore durante l'aggiornamento dello status.");
    }
  };

  const filteredItems = (activeTab === "collection" ? owned : wishlist).filter((item) => {
    return (
      (!searchQuery || item.englishName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!primaryType || item.primaryType === primaryType) &&
      (!secondaryType || item.secondaryType === secondaryType)
    );
  });

  const getMostCommon = <T extends Record<string, any>>(items: T[], key: keyof T): string | null => {
    if (items.length === 0) return null;
    const counts = items.reduce((acc, item) => {
      const value = item[key];
      if (value) acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), "");
  };

  const confirmRemove = (pokemon: CollectionItem) => {
    setSelectedPokemon(pokemon);
    setIsDialogOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (selectedPokemon) {
      await removeFromCollection(selectedPokemon.pokemonId);
      setIsDialogOpen(false);
      setSelectedPokemon(null);
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <div
          style={{
            backgroundImage: `url(${BackgroundImageNoAccess})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            backgroundColor: "#f8f9fa",
            paddingTop: "20px",
          }}
        >
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Alert variant="destructive" className="max-w-md bg-gray-100">
              <AlertTitle>Accesso richiesto per utilizzare le collezioni</AlertTitle>
              <AlertDescription>
                Non hai effettuato il login. Clicca sul pulsante sottostante per accedere.
              </AlertDescription>
            </Alert>
            <Button className="mt-4" onClick={() => navigate("/login")}>
              Vai al Login
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            backgroundColor: "#f8f9fa",
            paddingTop: "20px",
            minHeight: "100vh",
          }}
        >
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">Gestione Collezione Pokémon</h1>

          {/* Barra delle statistiche */}
          <div className="flex justify-center mt-8">
            <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md w-80">
              <h2 className="font-bold text-xl mb-4 text-center">Statistiche</h2>
              <p className="mt-3"><strong>Totale Pokémon:</strong> {owned.length + wishlist.length}</p>
              <p className="mt-3"><strong>Tipo più presente (Collezione):</strong> {getMostCommon(owned, "primaryType") || "N/A"}</p>
              <p className="mt-3"><strong>Tipo più presente (Wishlist):</strong> {getMostCommon(wishlist, "primaryType") || "N/A"}</p>
            </div>
          </div>

          {/* Barra di ricerca */}
          <div className="mb-6 flex justify-center items-center mt-12">
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
              <option value="Volante">Volante</option>
            </select>
          </div>

          <div className="tabs flex justify-center mb-4">
            <button
              className={`px-4 py-2 ${
                activeTab === "collection" ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded-l`}
              onClick={() => setActiveTab("collection")}
            >
              Collezione
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "wishlist" ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded-r`}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist
            </button>
          </div>

          {/* Griglia Pokémon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="p-2 bg-gray-100 shadow-md rounded-lg">
                <CardHeader className="flex justify-center">
                  <PokemonCard
                    nationalNumber={item.pokemonId}
                    englishName={item.englishName}
                    primaryType={item.primaryType}
                    secondaryType={item.secondaryType}
                    imageUrl={`/images/large/${String(item.pokemonId).padStart(3, "0")}.png`}
                  />
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button
                    className="bg-blue-500 text-white"
                    variant="outline"
                    onClick={() =>
                      switchStatus(
                        item.pokemonId,
                        activeTab === "collection" ? "wishlist" : "owned"
                      )
                    }
                  >
                    {activeTab === "collection" ? "Wishlist" : "Collezione"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => confirmRemove(item)}
                  >
                    Rimuovi
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Conferma Rimozione</DialogTitle>
              </DialogHeader>
              <p>
                Sei sicuro di voler rimuovere{" "}
                <span className="font-bold">{selectedPokemon?.englishName}</span> dalla tua {activeTab === "collection" ? "collezione" : "wishlist"}?
              </p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annulla
                </Button>
                <Button variant="destructive" onClick={handleConfirmRemove}>
                  Conferma
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default CollectionPage;
