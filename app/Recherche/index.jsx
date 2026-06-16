// Page de recherche — permet de trouver une salle par nom, adresse ou ville,
// et de filtrer par type (sport ou événement).

import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import EtatChargement from "../../components/EtatChargement";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SalleCard from "../../components/SalleCard";
import { useTheme, useStyles } from "../../context/ThemeContext";
import { getSalles, getTypesSalles } from "../../services/apiService";

export default function Recherche() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const { rechercheStyles, componentStyles, commonStyles } = useStyles();

  // ─── État ────────────────────────────────────────────────────
  const [adresse, setAdresse] = useState("");
  const [tab, setTab]         = useState("sports");
  const [filtre, setFiltre]   = useState("Tous");

  const [types, setTypes]     = useState({ sport: [], evenement: [] });
  const [salles, setSalles]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  // Je charge les types de salles pour afficher les filtres
  useEffect(() => {
    getTypesSalles().then(setTypes).catch(() => {});
  }, []);

  // Je recharge les salles quand l'onglet ou le filtre change
  const fetchSalles = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const categorie = tab === "sports" ? "sport" : "evenement";
      const libelle = filtre !== "Tous" ? filtre : null;
      const data = await getSalles(categorie, libelle);
      setSalles(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [tab, filtre]);

  useEffect(() => { fetchSalles(); }, [fetchSalles]);

  // Filtres disponibles selon l'onglet actif
  const filtresActifs = [
    "Tous",
    ...(tab === "sports" ? types.sport : types.evenement).map((t) => t.libelle),
  ];

  // Filtrage local par le texte saisi dans la barre de recherche
  const results = salles.filter(
    (s) =>
      adresse.trim() === "" ||
      s.nom.toLowerCase().includes(adresse.toLowerCase()) ||
      s.adresse?.toLowerCase().includes(adresse.toLowerCase()) ||
      s.ville?.toLowerCase().includes(adresse.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.surface} />

      <Header titleLeft title="Recherche" showSettings showBack={false} />

      {/* Barre de recherche par texte */}
      <View style={rechercheStyles.searchContainer}>
        <SearchBar
          value={adresse}
          onChangeText={setAdresse}
          placeholder="Adresse, ville, nom de la salle..."
        />
      </View>

      {/* Onglets Sports / Événements */}
      <View style={rechercheStyles.tabsContainer}>
        <View style={componentStyles.tabsContainer}>
          {["sports", "events"].map((key) => (
            <TouchableOpacity
              key={key}
              style={[componentStyles.tabBtn, tab === key && componentStyles.tabBtnActive]}
              onPress={() => { setTab(key); setFiltre("Tous"); }}
            >
              <Text style={[componentStyles.tabText, tab === key && componentStyles.tabTextActive]}>
                {key === "sports" ? "Sports" : "Événements"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Filtres par type de salle */}
      <View style={rechercheStyles.filtresWrapper}>
        <FlatList
          data={filtresActifs}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={rechercheStyles.filtresList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[rechercheStyles.filtrePill, filtre === item && rechercheStyles.filtrePillActive]}
              onPress={() => setFiltre(item)}
            >
              <Text style={[rechercheStyles.filtreText, filtre === item && rechercheStyles.filtreTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Résultats */}
      <EtatChargement chargement={loading} erreur={error} />
      {!loading && !error && (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={rechercheStyles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={rechercheStyles.resultCount}>
              {results.length} résultat{results.length !== 1 ? "s" : ""} trouvé{results.length !== 1 ? "s" : ""}
            </Text>
          }
          renderItem={({ item }) => (
            <SalleCard
              salle={item}
              category={item.typeSalle?.libelle ?? (tab === "sports" ? "Sport" : "Événement")}
              onPress={() =>
                navigation.navigate("DetailSalle/index", {
                  salle: item,
                  category: item.typeSalle?.libelle ?? (tab === "sports" ? "Sport" : "Événement"),
                })
              }
            />
          )}
          ListEmptyComponent={
            <EtatChargement
              vide
              iconeVide="search-outline"
              titreVide="Aucun résultat"
              sousTitreVide="Modifiez l'adresse ou le filtre"
            />
          }
        />
      )}

      <Footer />
    </SafeAreaView>
  );
}
