import { Stack } from "expo-router";

// Layout racine : stack sans header natif (chaque écran gère le sien)
// Avec Expo Router, app/Login/index.jsx → nom de route "Login"
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
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

      {/* ── Paramètres ── */}
      <Stack.Screen name="Parametres" />
    </Stack>
  );
}
