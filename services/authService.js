// Tout ce qui concerne la connexion et la déconnexion.
// Le jeton reçu après la connexion est sauvegardé sur l'appareil
// et utilisé dans toutes les requêtes vers le serveur.

import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

// Nom de la clé où le jeton est stocké sur l'appareil
const TOKEN_KEY = "jwt_token";

// Connexion : j'envoie l'email et le mot de passe au serveur.
// Si c'est bon, je reçois un jeton et je le sauvegarde.
export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/adherent/login_check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Email ou mot de passe incorrect");
  }

  await AsyncStorage.setItem(TOKEN_KEY, data.token);
  return data.token;
}

// Inscription : j'envoie les informations du nouveau compte au serveur
export async function register(payload) {
  const res = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom: payload.nom,
      prenom: payload.prenom,
      email: payload.email,
      password: payload.password,
      ligue: payload.ligue,
      poste: payload.poste,
      numero_adherent: payload.numero_adherent,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Erreur lors de l'inscription");
  }

  return data;
}

// Déconnexion : je supprime le jeton sauvegardé
export async function logout() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

// Je récupère le jeton stocké sur l'appareil (ou null si pas connecté)
export async function getToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}
