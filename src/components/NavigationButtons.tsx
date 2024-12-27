import React from "react";
import { Button } from "../components/ui/button";

interface NavigationButtonsProps {
    onNavigate: (direction: "prev" | "next") => void;
    onAddToCollection: () => void;
    onAddToWishlist: () => void;
    nationalNumber: number;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    onNavigate,
    onAddToCollection,
    onAddToWishlist,
    nationalNumber,
}) => (
    <div className="navigation-buttons flex justify-center space-x-4">
        {nationalNumber > 1 && (
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => onNavigate("prev")}>
                Precedente
            </Button>
        )}
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={onAddToCollection}>
            Aggiungi a Collezione
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={onAddToWishlist}>
            Aggiungi a Wishlist
        </Button>
        {nationalNumber < 386 && (
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => onNavigate("next")}>
                Successivo
            </Button>
        )}
    </div>
);

export default NavigationButtons;
