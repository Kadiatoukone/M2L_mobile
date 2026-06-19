import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import { COLORS, SHADOW } from "../constants/theme";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    {
      name: "Accueil/index",
      label: "Accueil",
      icon: (active) => (
        <Foundation name="home" size={22} color={active ? COLORS.red : COLORS.grey} />
      ),
    },
    {
      name: "Recherche/index",
      label: "Recherche",
      icon: (active) => (
        <Ionicons name="search" size={21} color={active ? COLORS.red : COLORS.grey} />
      ),
    },
    {
      name: "Reservation/index",
      label: "Réservations",
      icon: (active) => (
        <Ionicons
          name="calendar-outline"
          size={21}
          color={active ? COLORS.red : COLORS.grey}
        />
      ),
    },
  ];

  return (
    <View style={styles.footer}>
      {tabs.map((tab) => {
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

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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
    color: COLORS.grey,
  },
  labelActive: {
    color: COLORS.red,
    fontWeight: "700",
  },
});
