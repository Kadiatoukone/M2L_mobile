// Page liste des salles — affiche toutes les salles d'une catégorie
// avec une barre de recherche pour filtrer par nom ou adresse.

import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import EtatChargement from "../../components/EtatChargement";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SalleCard from "../../components/SalleCard";
import { useTheme, useStyles } from "../../context/ThemeContext";
import { getSalles } from "../../services/apiService";

export default function ListeSalles() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const { listeSallesStyles, commonStyles } = useStyles();
  const route = useRoute();
  const { category = "Salle", tab = "sports" } = route.params ?? {};

  // ─── État ────────────────────────────────────────────────────
  const [salles, setSalles]   = useState([]);
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  // Je charge les salles correspondant à la catégorie demandée
  const fetchSalles = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const categorie = tab === 'sports' ? 'sport' : 'evenement';
      const libelle   = category !== 'Salle' ? category : null;
      const data = await getSalles(categorie, libelle);
      setSalles(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [tab, category]);

  useEffect(() => { fetchSalles(); }, [fetchSalles]);

  // Filtrage local par le texte de la barre de recherche
  const filtered = salles.filter(
    (s) =>
      s.nom.toLowerCase().includes(search.toLowerCase()) ||
      s.adresse?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={commonStyles.safeGrey}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.surface} />

      <Header title={category} showBack showSettings />

      {/* Barre de recherche */}
      <View style={listeSallesStyles.searchContainer}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher par adresse ou nom..."
        />
        {!loading && (
          <Text style={listeSallesStyles.resultCount}>
            {filtered.length} salle{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
          </Text>
        )}
      </View>

      {/* Chargement / erreur / liste */}
      <EtatChargement chargement={loading} erreur={error} />
      {!loading && !error && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <SalleCard
              salle={item}
              category={category}
              onPress={() =>
                navigation.navigate("DetailSalle/index", { salle: item, category })
              }
            />
          )}
          contentContainerStyle={listeSallesStyles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EtatChargement
              vide
              iconeVide="search-outline"
              titreVide="Aucune salle trouvée"
              sousTitreVide="Essayez un autre mot-clé"
            />
          }
        />
      )}

      <Footer />
    </SafeAreaView>
  );
}
