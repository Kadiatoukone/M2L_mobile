// Barre de navigation en bas de l'application.
// Les trois onglets : Accueil, Recherche et Réservations.

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import { SHADOW } from "../constants/theme";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  // Liste des onglets avec leur nom, icône et route associée
  const tabs = [
    {
      name: "Accueil/index",
      label: "Accueil",
      icon: (active) => (
        <Foundation name="home" size={22} color={active ? colors.red : colors.grey} />
      ),
    },
    {
      name: "Recherche/index",
      label: "Recherche",
      icon: (active) => (
        <Ionicons name="search" size={21} color={active ? colors.red : colors.grey} />
      ),
    },
    {
      name: "Reservation/index",
      label: "Réservations",
      icon: (active) => (
        <Ionicons name="calendar-outline" size={21} color={active ? colors.red : colors.grey} />
      ),
    },
  ];

  return (
    <View style={styles.footer}>
      {tabs.map((tab) => {
        // L'onglet est mis en rouge si on est sur cette page
        const active = route.name === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}
          >
            {tab.icon(active)}
            <Text style={[styles.label, active && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Styles de la barre de navigation
function getStyles(colors) {
  return StyleSheet.create({
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 68,
      backgroundColor: colors.surface,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors.border,
      ...SHADOW.sm,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
    },
    label: {
      fontSize: 10,
      marginTop: 3,
      fontWeight: "500",
      color: colors.grey,
    },
    labelActive: {
      color: colors.red,
      fontWeight: "700",
    },
  });
}
