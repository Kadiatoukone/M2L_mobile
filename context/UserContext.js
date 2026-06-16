// Contexte léger exposant le profil de l'adhérent connecté (nom, ligue,
// poste...) pour l'affichage dans les en-têtes — évite de refaire l'appel
// /api/adherents/me sur chaque écran.

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getMe } from "../services/apiService";
import { getToken } from "../services/authService";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const refreshUser = useCallback(async () => {
    const token = await getToken();
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
  }, []);

  useEffect(() => { refreshUser(); }, [refreshUser]);

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook pratique : { user, refreshUser }
export function useUser() {
  return useContext(UserContext);
}
