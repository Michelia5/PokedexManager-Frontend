import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface DescriptionCardProps {
    description: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ description }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-bold">Descrizione</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="font-semibold">{description}</p>
        </CardContent>
    </Card>
);

export default DescriptionCard;
