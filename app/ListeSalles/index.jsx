import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SalleCard from "../../components/SalleCard";
import { listeSallesStyles, commonStyles } from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { getSalles } from "../../services/apiService";

export default function ListeSalles() {
  const navigation = useNavigation();
  const route = useRoute();
  const { category = "Salle", tab = "sports" } = route.params ?? {};

  const [salles, setSalles]   = useState([]);
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  const fetchSalles = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // On filtre côté API par catégorie (sports / events)
      const categorie = tab === "sports" ? "sport" : "evenement";
      const data = await getSalles(categorie);
      setSalles(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => { fetchSalles(); }, [fetchSalles]);

  const filtered = salles.filter(
    (s) =>
      s.nom.toLowerCase().includes(search.toLowerCase()) ||
      s.adresse?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={commonStyles.safeGrey}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <Header title={category} showBack showSettings />

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
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <SalleCard
              salle={item}
              category={category}
              onPress={() =>
                navigation.navigate("DetailSalle", { salle: item, category })
              }
            />
          )}
          contentContainerStyle={listeSallesStyles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={commonStyles.emptyState}>
              <Ionicons name="search-outline" size={48} color={COLORS.border} />
              <Text style={commonStyles.emptyTitle}>Aucune salle trouvée</Text>
              <Text style={commonStyles.emptySub}>Essayez un autre mot-clé</Text>
            </View>
          }
        />
      )}

      <Footer />
    </SafeAreaView>
  );
}
