import Constants from "expo-constants";

// Je cherche automatiquement l'adresse IP de mon PC en regardant
// l'adresse qu'utilise déjà Expo pour afficher l'app sur le téléphone.
// Comme ça, pas besoin de changer l'IP à la main à chaque fois.
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

    // Si l'IP n'est pas trouvée, on utilise localhost par défaut
    return "http://localhost:8000";
  }

  // En production, mettre ici l'adresse du vrai serveur
  return "https://api.exemple.com";
}

export const API_URL = getApiUrl();
