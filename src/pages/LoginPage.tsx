import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import loginBackground from "/images/other/pokemon-wallpaper.jpg";
import { useUserContext } from "../context/UserContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useUserContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previeni il comportamento predefinito del form
    try {
      await login(username, password);
      navigate("/"); // Reindirizza alla home dopo il login
    } catch (err) {
      setError("Credenziali non valide. Riprova.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${loginBackground})`,
      }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center"
      >
        <h1 className="text-2xl font-bold mb-4">Accedi</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Input
          placeholder="Username"
          className="mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
          Login
        </Button>
        <p className="mt-4">
          Non hai un account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Registrati
          </span>
        </p>
        <p className="mt-4">
          Torna alla{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
