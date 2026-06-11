import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

const TOKEN_KEY = "jwt_token";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/login_adherent_check`, { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      email,          
      mot_de_passe: password  
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Email ou mot de passe incorrect");
  }

  await AsyncStorage.setItem(TOKEN_KEY, data.token);
  return data.token;
}

export async function register(payload) {
  const res = await fetch(`${API_URL}/api/adherents`, {  
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom: payload.nom,
      prenom: payload.prenom,
      email: payload.email,
      mot_de_passe: payload.password,   
      ligue: payload.ligue,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Erreur lors de l'inscription");
  }

  return data;
}

export async function logout() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function getToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}
