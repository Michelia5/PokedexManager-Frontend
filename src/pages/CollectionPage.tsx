import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const CollectionPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const token = localStorage.getItem("token"); // Prendi il token
        const response = await axios.get("http://localhost:7000/collection", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data); // Mostra i dati della collezione
      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          setMessage(error.response.data); // Mostra il messaggio dal backend
        } else {
          setMessage("Errore imprevisto.");
        }
      }
    };

    fetchCollection();
  }, []);

  return (
    <div className="container mx-auto text-center py-10">
      <h1 className="text-3xl font-bold mb-6">Gestione Collezione</h1>
      {message ? (
        <p className="text-lg mb-4">{message}</p>
      ) : (
        <p>Caricamento...</p>
      )}
      {!localStorage.getItem("token") && (
        <Button onClick={() => navigate("/login")}>Accedi</Button>
      )}
    </div>
  );
};

export default CollectionPage;
