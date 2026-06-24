// Page d'accueil — première page après la connexion.
// Elle affiche les types de salles disponibles (sports ou événements)
// pour que l'utilisateur choisisse où commencer sa recherche.

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EtatChargement from "../../components/EtatChargement";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { CATEGORY_COLORS, SPACING } from "../../constants/theme";
import { useStyles, useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { getTypesSalles } from "../../services/apiService";
import CategoryCard from "./_components/CategoryCard";

// Je mélange les couleurs et j'en attribue une à chaque type de salle.
// Il y a toujours plus de couleurs disponibles que de types,
// donc deux cartes n'auront jamais la même couleur.
function assignColors(items) {
  const palette = [...CATEGORY_COLORS];
  for (let i = palette.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [palette[i], palette[j]] = [palette[j], palette[i]];
  }
  return items.map((item, i) => ({
    ...item,
    color: palette[i % palette.length],
  }));
}

export default function Accueil() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const { accueilStyles, commonStyles, componentStyles, reservationStyles } =
    useStyles();
  const { user } = useUser();

  // ─── État ────────────────────────────────────────────────────
  const [tab, setTab] = useState("sports");
  const [sports, setSports] = useState([]);
  const [evenements, setEvenements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ─── Chargement des types depuis le serveur ───────────────────
  const fetchTypes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTypesSalles();
      setSports(assignColors(data.sport ?? []));
      setEvenements(assignColors(data.evenement ?? []));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const categories = tab === "sports" ? sports : evenements;

  return (
    <SafeAreaView style={commonStyles.safe}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.surface}
      />

      {/* En-tête avec les informations de l'adhérent connecté */}
      <Header
        showSettings
        left={
          <View style={reservationStyles.userInfo}>
            <View style={reservationStyles.avatar}>
              <Ionicons name="person" size={20} color={colors.white} />
            </View>
            <View>
              <Text style={reservationStyles.username} numberOfLines={1}>
                {user ? `${user.prenom} ${user.nom}` : "—"}
              </Text>
              <Text style={reservationStyles.ligue} numberOfLines={1}>
                {[user?.poste].filter(Boolean).join(" · ") || "Adhérent M2L"}
              </Text>
            </View>
          </View>
        }
      />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SPACING.lg,
          paddingBottom: 90,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Titre */}
        <Text style={accueilStyles.title}>
          Vous cherchez{"\n"}une salle pour ?
        </Text>

        {/* Barre décorative rouge */}
        <View
          style={{
            width: 40,
            height: 3,
            backgroundColor: colors.red,
            borderRadius: 2,
            marginTop: SPACING.md,
            marginBottom: SPACING.lg,
          }}
        />

        {/* Onglets Sports / Événements */}
        <View
          style={[
            componentStyles.tabsContainer,
            { alignSelf: "flex-start", marginBottom: SPACING.lg },
          ]}
        >
          {["sports", "events"].map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                componentStyles.tabBtn,
                tab === key && componentStyles.tabBtnActive,
              ]}
              onPress={() => setTab(key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  componentStyles.tabText,
                  tab === key && componentStyles.tabTextActive,
                ]}
              >
                {key === "sports" ? "Sports" : "Événements"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={accueilStyles.sectionLabel}>
          {tab === "sports" ? "Sports disponibles" : "Types d'événements"}
        </Text>

        {/* Chargement / erreur / grille de catégories */}
        <EtatChargement
          chargement={loading}
          erreur={error}
          vide={!loading && !error && categories.length === 0}
          iconeVide="albums-outline"
          titreVide="Aucun type disponible"
        />
        {!loading && !error && categories.length > 0 && (
          <View style={accueilStyles.grid}>
            {categories.map((item) => (
              <CategoryCard
                key={item.id}
                name={item.libelle}
                color={item.color}
                onPress={() =>
                  navigation.navigate("ListeSalles/index", {
                    category: item.libelle,
                    tab,
                  })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}
