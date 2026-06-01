import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

const TOKEN_KEY = "jwt_token";

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

export async function register(payload) {
  const res = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
