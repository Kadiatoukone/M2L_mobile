import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { CATEGORY_COLORS, COLORS, SPACING } from "../../constants/theme";
import { getTypesSalles } from "../../services/apiService";
import {
  accueilStyles,
  commonStyles,
  componentStyles,
} from "../../styles/styles";
import CategoryCard from "./_components/CategoryCard";

// Attribue une couleur différente à chaque type, piochée aléatoirement
// dans la palette — comme la palette contient plus de couleurs que de
// types existants, deux cartes affichées en même temps n'ont jamais la
// même couleur (et un nouveau type ajouté en BDD en récupère une autre couleur).
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
  const [tab, setTab] = useState("sports");

  const [sports, setSports] = useState([]);
  const [evenements, setEvenements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header avec localisation */}
      <Header
        showSettings
        left={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              flex: 1,
            }}
          >
            <Ionicons name="location-outline" size={16} color={COLORS.red} />
            <Text style={{ fontSize: 13, color: COLORS.textGrey }}>
              Maison des Ligues, Nancy
            </Text>
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

        {/* Ligne décorative */}
        <View
          style={{
            width: 40,
            height: 3,
            backgroundColor: COLORS.red,
            borderRadius: 2,
            marginTop: SPACING.md,
            marginBottom: SPACING.lg,
          }}
        />

        {/* Onglets */}
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

        {/* Sous-titre */}
        <Text style={accueilStyles.sectionLabel}>
          {tab === "sports" ? "Sports disponibles" : "Types d'événements"}
        </Text>

        {/* Grille */}
        {loading ? (
          <View style={commonStyles.emptyState}>
            <ActivityIndicator size="large" color={COLORS.red} />
          </View>
        ) : error ? (
          <View style={commonStyles.emptyState}>
            <Ionicons name="wifi-outline" size={48} color={COLORS.border} />
            <Text style={commonStyles.emptyTitle}>Impossible de charger</Text>
            <Text style={commonStyles.emptySub}>{error}</Text>
          </View>
        ) : categories.length === 0 ? (
          <View style={commonStyles.emptyState}>
            <Ionicons name="albums-outline" size={48} color={COLORS.border} />
            <Text style={commonStyles.emptyTitle}>Aucun type disponible</Text>
          </View>
        ) : (
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
