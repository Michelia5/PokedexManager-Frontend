import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface User {
  avatarUrl: string;
  id: number;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:7000/login", {
        username,
        password,
      });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      throw new Error("Credenziali non valide");
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await axios.post("http://localhost:7000/register", {
        username,
        email,
        password,
      });
    } catch (error: any) {
      if (error.response?.status === 409) {
        const errorMessage = error.response.data;
        if (errorMessage.includes("Username")) {
          throw new Error("Il nome utente è già in uso. Scegline un altro.");
        }
        if (errorMessage.includes("Email")) {
          throw new Error("L'indirizzo email è già registrato.");
        }
      }
      throw new Error("Si è verificato un errore imprevisto durante la registrazione.");
    }
  };  
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext deve essere usato all'interno di UserProvider");
  }
  return context;
};
