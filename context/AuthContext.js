// Contexte d'authentification global
// Gère le token JWT, l'utilisateur connecté, et les fonctions login/register/logout

import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

// URL de base de l'API — à adapter selon votre environnement
const API_URL = "http://192.168.1.11:8000";
const TOKEN_KEY = "jwt_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {  
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true pendant la vérification initiale du token

  // Au démarrage de l'app, on vérifie si un token est déjà stocké
  useEffect(() => {
    (async () => {
      try {
        const stored = await SecureStore.getItemAsync(TOKEN_KEY);
        if (stored) {
          setToken(stored);
          await fetchMe(stored); // charge le profil si token valide
        }
      } catch {
        // token corrompu ou expiré → on ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Récupère le profil de l'utilisateur connecté
  async function fetchMe(jwt) {
    const res = await fetch(`${API_URL}/api/adherents/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (!res.ok) throw new Error("Token invalide ou expiré");
    const data = await res.json();
    setUser(data);
    return data;
  }

  // Connexion : POST /api/login_check
  async function login(email, password) { 
    const res = await fetch(`${API_URL}/api/login_adherent_check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mot_de_passe: password }), 
    });

    if (!res.ok) {
      // L'API renvoie un message d'erreur JSON
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Identifiants incorrects");
    }

    const { token: jwt } = await res.json();

    // Stockage sécurisé du token
    await SecureStore.setItemAsync(TOKEN_KEY, jwt);
    setToken(jwt);

    // Récupération immédiate du profil
    const profile = await fetchMe(jwt);
    return profile;
  }

  // Inscription : POST /api/adherents
  async function register({ nom, prenom, email, ligue, mot_de_passe }) {
    const res = await fetch(`${API_URL}/api/adherents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom,
        prenom,
        email,
        ligue,
        mot_de_passe,
        roles: ["ROLE_USER"],
      }),
    });
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      // Affiche TOUT ce que renvoie Symfony
      throw new Error(JSON.stringify(err));
    }

    const { adherent } = await res.json();

    // Connexion automatique après inscription
    await login(email, mot_de_passe);
    return adherent;
  }

  // Déconnexion : suppression du token stocké
  async function logout() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pratique pour utiliser le contexte dans n'importe quel composant
export function useAuth() {
  return useContext(AuthContext);
}
