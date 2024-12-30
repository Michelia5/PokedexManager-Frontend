import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface Evolution {
    id?: number;
    name?: string;
}

interface EvolutionsCardProps {
    evolutions: Evolution[];
}

const EvolutionsCard: React.FC<EvolutionsCardProps> = ({ evolutions }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-bold">Evoluzioni</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {evolutions.map(
                    (evolution, index) =>
                        evolution.id && (
                            <a key={index} href={`/pokemon/${evolution.id}`} className="block">
                                <p className="text-lg font-semibold">
                                    {index === 0
                                        ? "Pokémon Base"
                                        : index === 1
                                        ? "2° Evoluzione"
                                        : `${index +1}° Evoluzione`}
                                </p>
                                <img
                                    src={`/images/small/${String(evolution.id).padStart(3, "0")}.png`}
                                    alt={evolution.name}
                                    className="mx-auto"
                                />
                                <p className="text-center font-semibold">{evolution.name}</p>
                            </a>
                        )
                )}
            </div>
        </CardContent>
    </Card>
);

export default EvolutionsCard;
