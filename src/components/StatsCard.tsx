import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";

interface StatsCardProps {
    stats: { label: string; value: number }[];
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-bold text-center">Statistiche</CardTitle>
        </CardHeader>
        <CardContent>
            {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-center space-x-4">
                    <span className="w-24 font-bold">{stat.label}:</span>
                    <Progress value={stat.value} className="flex-1" />
                    <span className="w-10 text-right">{stat.value}</span>
                </div>
            ))}
        </CardContent>
    </Card>
);

export default StatsCard;
