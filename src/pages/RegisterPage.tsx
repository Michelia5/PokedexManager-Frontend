import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import registerBackground from "/images/other/pokemon-wallpaper.jpg";
import { useUserContext } from "../context/UserContext";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register } = useUserContext();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/login"); // Reindirizza a login in caso di successo
    } catch (err: any) {
      setError(err.message); // Mostra messaggio di errore specifico
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${registerBackground})`,
      }}
    >
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center"
      >
        <h1 className="text-2xl font-bold mb-4">Registrati</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Input
          placeholder="Username"
          className="mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
          Registrati
        </Button>
        <p className="mt-4">
          Hai già un account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Accedi
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

export default RegisterPage;
