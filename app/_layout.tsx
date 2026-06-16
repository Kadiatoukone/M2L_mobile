import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* ── Page de vérification d'authentification ── */}
      <Stack.Screen name="index" />

      {/* ── Authentification ── */}
      <Stack.Screen name="LoginHome/index" />
      <Stack.Screen name="Login/index" />
      <Stack.Screen name="Register/index" />

      {/* ── Navigation principale ── */}
      <Stack.Screen name="Accueil/index" />
      <Stack.Screen name="Recherche/index" />
      <Stack.Screen name="Reservation/index" />

      {/* ── Flux réservation ── */}
      <Stack.Screen name="ListeSalles/index" />
      <Stack.Screen name="DetailSalle/index" />
      <Stack.Screen name="Calendrier/index" />

      {/* ── Paramètres ── */}
      <Stack.Screen name="Parametres/index" />
    </Stack>
  );
}