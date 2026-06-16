// Point d'entrée de l'application.
// Je déclare ici toutes les pages et je mets en place
// le thème, la zone sécurisée et le profil utilisateur.

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  return (
    // ThemeProvider : gère le thème clair/sombre sur toute l'application
    <ThemeProvider>
      {/* SafeAreaProvider : évite que le contenu passe sous la barre de statut */}
      <SafeAreaProvider>
        {/* UserProvider : garde en mémoire le profil de l'adhérent connecté */}
        <UserProvider>
          <Stack initialRouteName="LoginHome/index" screenOptions={{ headerShown: false }}>
            {/* Pages de connexion / inscription */}
            <Stack.Screen name="LoginHome" />
            <Stack.Screen name="Login" />
            <Stack.Screen name="Register" />

            {/* Pages principales (onglets du bas) */}
            <Stack.Screen name="Accueil" />
            <Stack.Screen name="Recherche" />
            <Stack.Screen name="Reservation" />

            {/* Pages du parcours de réservation */}
            <Stack.Screen name="ListeSalles" />
            <Stack.Screen name="DetailSalle" />
            <Stack.Screen name="Calendrier" />

            {/* Pages du compte */}
            <Stack.Screen name="Profil" />
            <Stack.Screen name="Parametres" />
          </Stack>
        </UserProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
