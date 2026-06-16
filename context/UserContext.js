// Stocke les informations de l'adhérent connecté (nom, prénom, ligue, poste...)
// pour qu'elles soient disponibles sur toutes les pages sans refaire
// une requête au serveur à chaque fois.

import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../services/apiService";
import { getToken } from "../services/authService";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Je charge le profil de l'utilisateur connecté
  async function refreshUser() {
    const token = await getToken();
    // Si pas de jeton de connexion, l'utilisateur n'est pas connecté
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const data = await getMe();
      setUser(data);
    } catch {
      setUser(null);
    }
  }

  // Je charge le profil une seule fois au démarrage
  useEffect(() => { refreshUser(); }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook : { user, refreshUser }
export function useUser() {
  return useContext(UserContext);
}
