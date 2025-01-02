import React from "react";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  nationalNumber: number;
  englishName: string;
  primaryType: string;
  secondaryType: string | null;
  imageUrl: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  nationalNumber,
  englishName,
  primaryType,
  secondaryType,
  imageUrl,
}) => {
  const getTypeColor = (type: string) => {
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

  const getTypeImageUrl = (type: string) => `public/images/type/${type}.png`;

  return (
    <Link to={`/pokemon/${nationalNumber}`} className="block">
      <div
        className="pokemon-card p-2 shadow-md rounded-lg text-center transition-transform transform hover:translate-y-1"
        style={{
          backgroundImage: `url("/images/other/battlefield.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "2px solid #000",
          color: "white",
        }}
      >
        <img
          src={imageUrl}
          alt={`${englishName} sprite`}
          className="max-w-[200px] max-h-[200px] object-contain"
        />

        <p className="text-lg font-bold drop-shadow-lg">
          #{nationalNumber} - {englishName}
        </p>

        {/* Contenitore tipi */}
        <div className="flex flex-col items-center justify-center space-y-1" style={{ minHeight: "90px" }}>
          <div
            className="flex items-center justify-center py-1 px-2 rounded-full"
            style={{
              backgroundColor: getTypeColor(primaryType),
              color: "white",
              fontWeight: "bold",
              border: "1px solid #000",
            }}
          >
            <p>{primaryType}</p>
            <img
              src={getTypeImageUrl(primaryType)}
              alt={primaryType}
              className="h-7 w-7 ml-2"
            />
          </div>

          {secondaryType ? (
            <div
              className="flex items-center justify-center py-1 px-2 rounded-full"
              style={{
                backgroundColor: getTypeColor(secondaryType),
                color: "white",
                fontWeight: "bold",
                border: "1px solid #000",
              }}
            >
              <p>{secondaryType}</p>
              <img
                src={getTypeImageUrl(secondaryType)}
                alt={secondaryType}
                className="h-7 w-7 ml-2"
              />
            </div>
          ) : (
            <div className="h-7" /> // Placeholder per mantenere l'altezza fissa
          )}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
