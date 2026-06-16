// Gestion du thème clair / sombre.
// useTheme() donne accès aux couleurs et à la fonction pour changer de thème.
// useStyles() donne toutes les feuilles de style construites avec les bonnes couleurs.

import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIGHT_COLORS, DARK_COLORS } from "../constants/theme";
import createStyles from "../styles/styles";

// Clé utilisée pour sauvegarder le choix de l'utilisateur sur l'appareil
const THEME_KEY = "dark_mode";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Au démarrage, je lis le thème choisi la dernière fois
  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY)
      .then((value) => { if (value !== null) setIsDark(value === "true"); })
      .finally(() => setLoaded(true));
  }, []);

  // Quand l'utilisateur change de thème, je mets à jour et je sauvegarde
  function toggleTheme(value) {
    setIsDark(value);
    AsyncStorage.setItem(THEME_KEY, String(value)).catch(() => {});
  }

  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  // On attend d'avoir lu la préférence avant d'afficher quoi que ce soit
  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook pour accéder au thème depuis n'importe quelle page
export function useTheme() {
  return useContext(ThemeContext);
}

// Hook pour accéder aux styles construits avec les bonnes couleurs
export function useStyles() {
  const { colors } = useTheme();
  return createStyles(colors);
}
