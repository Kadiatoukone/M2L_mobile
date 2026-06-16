import Constants from "expo-constants";

// En dev, on récupère automatiquement l'IP LAN utilisée par Metro pour servir
// le bundle (celle que tu vois dans "Waiting on http://<ip>:8081" / le QR code).
// Comme c'est la même IP que ton téléphone utilise déjà pour parler à Metro,
// ça fonctionne sur n'importe quel réseau sans rien changer à la main.
function getApiUrl() {
  if (__DEV__) {
    const hostUri =
      Constants.expoConfig?.hostUri ??
      Constants.expoGoConfig?.debuggerHost ??
      Constants.manifest2?.extra?.expoGo?.debuggerHost;

    const host = hostUri?.split(":")[0];

    if (host) {
      return `http://${host}:8000`;
    }

    // Fallback si jamais hostUri n'est pas dispo (web, build, etc.)
    return "http://localhost:8000";
  }

  // TODO: remplacer par l'URL de l'API en production
  return "https://api.exemple.com";
}

export const API_URL = getApiUrl();
