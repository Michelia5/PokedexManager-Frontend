import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

interface User {
  avatarUrl: string
  id: number
  username: string
  email: string
}

interface UserContextType {
  user: User | null
  authToken: string | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>> // Per debug o test
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
  
    if (!storedUser || storedUser === "undefined") {
      // Se storedUser è null, oppure proprio la stringa "undefined"
      return null;
    }
  
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Errore durante il parsing del JSON di localStorage:", error);
      localStorage.removeItem("user");
      return null;
    }
  });
  
  const [authToken, setAuthToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ?? null;
  });
  
  // All'avvio, reimposta l'header Axios se abbiamo un token
  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }
  }, [authToken]);
  

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:7000/login", { username, password });
      const { user, token } = response.data;
  
      // Salva in stato React
      setUser(user);
      setAuthToken(token);
  
      // Salva su localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Subito dopo aver settato localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
  
      // Configura axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
      })
    } catch (error: any) {
      if (error.response?.status === 409) {
        const errorMessage = error.response.data
        if (errorMessage.includes("Username")) {
          throw new Error("Il nome utente è già in uso. Scegline un altro.")
        }
        if (errorMessage.includes("Email")) {
          throw new Error("L'indirizzo email è già registrato.")
        }
      }
      throw new Error("Si è verificato un errore imprevisto durante la registrazione.")
    }
  }

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };
  

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        authToken, 
        login, 
        register, 
        logout,
        setAuthToken
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext deve essere usato all'interno di UserProvider")
  }
  return context
}
