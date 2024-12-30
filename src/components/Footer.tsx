import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <Link to="/info" className="hover:underline">
            Informazioni
          </Link>
          <Link to="/terms&conditions" className="hover:underline">
            Termini e Condizioni
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} Pokédex Manager. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
