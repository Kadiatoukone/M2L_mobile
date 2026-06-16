import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";

// Layout racine : stack sans header natif (chaque écran gère le sien)
// Avec Expo Router, app/Login/index.jsx → nom de route "Login"
export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <UserProvider>
          <Stack initialRouteName="LoginHome/index" screenOptions={{ headerShown: false }}>
            {/* ── Authentification ── */}
            <Stack.Screen name="LoginHome" />
            <Stack.Screen name="Login" />
            <Stack.Screen name="Register" />

            {/* ── Navigation principale ── */}
            <Stack.Screen name="Accueil" />
            <Stack.Screen name="Recherche" />
            <Stack.Screen name="Reservation" />

            {/* ── Flux réservation ── */}
            <Stack.Screen name="ListeSalles" />
            <Stack.Screen name="DetailSalle" />
            <Stack.Screen name="Calendrier" />

            {/* ── Profil & Paramètres ── */}
            <Stack.Screen name="Profil" />
            <Stack.Screen name="Parametres" />
          </Stack>
        </UserProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
