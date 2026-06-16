// Contexte de thème clair/sombre — choix mémorisé sur l'appareil.
// useTheme() donne { isDark, colors, toggleTheme }.
// useStyles() (ci-dessous) donne les feuilles de style déjà construites
// avec les couleurs courantes : { commonStyles, componentStyles, ... }.

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIGHT_COLORS, DARK_COLORS } from "../constants/theme";
import createStyles from "../styles/styles";

const THEME_KEY = "dark_mode";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY)
      .then((value) => { if (value !== null) setIsDark(value === "true"); })
      .finally(() => setLoaded(true));
  }, []);

  const toggleTheme = useCallback((value) => {
    setIsDark(value);
    AsyncStorage.setItem(THEME_KEY, String(value)).catch(() => {});
  }, []);

  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  // On évite un flash clair→sombre au lancement en attendant la lecture
  // de la préférence sauvegardée.
  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Feuilles de style courantes, reconstruites uniquement quand le thème change.
export function useStyles() {
  const { colors } = useTheme();
  return useMemo(() => createStyles(colors), [colors]);
}
