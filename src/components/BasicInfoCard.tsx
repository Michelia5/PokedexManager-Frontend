import React from "react";
import { Badge } from "../components/ui/badge";

interface BasicInfoCardProps {
    primaryType: string;
    secondaryType?: string;
    heightM: number;
    weightKg: number;
    percentMale?: number;
    percentFemale?: number;
    classification: string;
    captureRate: number;
    rarity: string; // "Mitico", "Leggendario", o "Normale"
    getTypeColor: (type: string) => string;
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
    primaryType,
    secondaryType,
    heightM,
    weightKg,
    percentMale,
    percentFemale,
    classification,
    captureRate,
    rarity,
    getTypeColor,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white shadow-md p-4 rounded-xl">

        {/* Tipo */}
        <div>
            <h2 className="font-bold text-lg mb-4">Tipo</h2>
            <div className="flex justify-center space-x-2">
                <Badge
                    className="text-white"
                    style={{ backgroundColor: getTypeColor(primaryType) }}
                >
                    {primaryType}
                </Badge>
                {secondaryType && (
                    <Badge
                        className="text-white"
                        style={{ backgroundColor: getTypeColor(secondaryType) }}
                    >
                        {secondaryType}
                    </Badge>
                )}
            </div>
        </div>

        {/* Dimensioni */}
        <div>
            <h2 className="font-bold text-lg">Dimensioni</h2>
            <p>Altezza: {heightM} m</p>
            <p>Peso: {weightKg} kg</p>
        </div>

        {/* Genere */}
        <div>
            <h2 className="font-bold text-lg">Genere</h2>
            {percentMale !== null && percentFemale !== null ? (
                <>
                    <p>Maschio: {percentMale}%</p>
                    <p>Femmina: {percentFemale}%</p>
                </>
            ) : (
                <p>Sconosciuto</p>
            )}
        </div>

        {/* Classificazione */}
        <div>
            <h2 className="font-bold text-lg">Classificazione</h2>
            <p>{classification}</p>
        </div>

        {/* Tasso di Cattura */}
        <div>
            <h2 className="font-bold text-lg">Tasso di Cattura</h2>
            <p>
                {captureRate}{" "}
                <a
                    href="https://bulbapedia.bulbagarden.net/wiki/Catch_rate"
                    className="text-xs underline"
                >
                    Info sulla cattura
                </a>
            </p>
        </div>

        {/* Rarità */}
        <div>
            <h2 className="font-bold text-lg">Rarità</h2>
            <p>{rarity}</p>
        </div>
    </div>
);

export default BasicInfoCard;
