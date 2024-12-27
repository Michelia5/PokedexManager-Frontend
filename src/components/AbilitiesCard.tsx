import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface AbilitiesCardProps {
    abilities0: string;
    abilities1?: string;
    abilitiesSpecial?: string;
}

const AbilitiesCard: React.FC<AbilitiesCardProps> = ({ abilities0, abilities1, abilitiesSpecial }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-bold">Abilità</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <h2 className="font-bold text-lg">Abilità Primaria</h2>
                <p>{abilities0 || "Nessuna"}</p>
            </div>
            <div>
                <h2 className="font-bold text-lg">Abilità Secondaria</h2>
                <p>{abilities1 || "Nessuna"}</p>
            </div>
            <div>
                <h2 className="font-bold text-lg">Abilità Speciale</h2>
                <p>{abilitiesSpecial || "Nessuna"}</p>
            </div>
        </CardContent>
    </Card>
);

export default AbilitiesCard;
