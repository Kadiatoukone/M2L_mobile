import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CategoryCard from "./_components/CategoryCard";
import { accueilStyles, componentStyles } from "../../styles/styles";
import { COLORS, SPACING } from "../../constants/theme";

const SPORTS = [
  { name: "Football",   color: "#1B5E20" },
  { name: "Handball",   color: "#B71C1C" },
  { name: "Basketball", color: "#E65100" },
  { name: "Volleyball", color: "#F57F17" },
  { name: "Badminton",  color: "#4A148C" },
  { name: "Natation",   color: "#01579B" },
  { name: "Tennis",     color: "#33691E" },
  { name: "Danse",      color: "#880E4F" },
  { name: "Ping-Pong",  color: "#006064" },
  { name: "Athlétisme", color: "#3E2723" },
];

const EVENEMENTS = [
  { name: "Réunion",         color: "#1B5E20" },
  { name: "Salle des fêtes", color: "#B71C1C" },
  { name: "Conférence",      color: "#01579B" },
  { name: "Séminaire",       color: "#4A148C" },
  { name: "Formation",       color: "#E65100" },
  { name: "Exposition",      color: "#33691E" },
  { name: "Gala",            color: "#880E4F" },
  { name: "Banquet",         color: "#006064" },
];

export default function Accueil() {
  const navigation = useNavigation();
  const [tab, setTab] = useState("sports");

  const categories = tab === "sports" ? SPORTS : EVENEMENTS;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header avec localisation */}
      <Header
        showSettings
        left={
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, flex: 1 }}>
            <Ionicons name="location-outline" size={16} color={COLORS.red} />
            <Text style={{ fontSize: 13, color: COLORS.textGrey }}>
              Maison des Ligues, Nancy
            </Text>
          </View>
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: SPACING.lg, paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Titre */}
        <Text style={accueilStyles.title}>
          Vous cherchez{"\n"}une salle pour ?
        </Text>

        {/* Ligne décorative */}
        <View style={{ width: 40, height: 3, backgroundColor: COLORS.red, borderRadius: 2, marginTop: SPACING.md, marginBottom: SPACING.lg }} />

        {/* Onglets */}
        <View style={[componentStyles.tabsContainer, { alignSelf: "flex-start", marginBottom: SPACING.lg }]}>
          {["sports", "events"].map((key) => (
            <View
              key={key}
              style={[componentStyles.tabBtn, tab === key && componentStyles.tabBtnActive]}
            >
              <Text
                style={[componentStyles.tabText, tab === key && componentStyles.tabTextActive]}
                onPress={() => setTab(key)}
              >
                {key === "sports" ? "Sports" : "Événements"}
              </Text>
            </View>
          ))}
        </View>

        {/* Sous-titre */}
        <Text style={accueilStyles.sectionLabel}>
          {tab === "sports" ? "Sports disponibles" : "Types d'événements"}
        </Text>

        {/* Grille */}
        <View style={accueilStyles.grid}>
          {categories.map((item, index) => (
            <CategoryCard
              key={index}
              name={item.name}
              color={item.color}
              onPress={() =>
                navigation.navigate("ListeSalles/index", {
                  category: item.name,
                  tab,
                })
              }
            />
          ))}
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}
