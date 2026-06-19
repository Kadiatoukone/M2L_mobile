import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SalleCard from "../../components/SalleCard";
import { rechercheStyles, componentStyles, commonStyles } from "../../styles/styles";
import { COLORS } from "../../constants/theme";

const RESULTS_MOCK = [
  { id: "1", nom: "Salle Omnisports A",    adresse: "12 rue de la Liberté, Nancy",   type: "Football",   note: 4.8, distance: "0.4 km" },
  { id: "2", nom: "Complexe Jules Ferry",  adresse: "5 avenue du Sport, Vandoeuvre", type: "Handball",   note: 4.5, distance: "1.2 km" },
  { id: "3", nom: "Gymnase Gaston Leroux", adresse: "3 allée des Chênes, Laxou",     type: "Basketball", note: 4.2, distance: "2.1 km" },
  { id: "4", nom: "Salle Polyvalente B",   adresse: "27 bd Résistance, Nancy",       type: "Réunion",    note: 4.6, distance: "0.8 km" },
  { id: "5", nom: "Hall Sportif Est",      adresse: "18 rue Gambetta, Essey",        type: "Volleyball", note: 3.9, distance: "3.4 km" },
  { id: "6", nom: "Espace André Malraux",  adresse: "9 rue des Arts, Tomblaine",     type: "Conférence", note: 4.7, distance: "2.8 km" },
  { id: "7", nom: "Gymnase Jean Jaurès",   adresse: "14 place Carnot, Nancy",        type: "Badminton",  note: 4.4, distance: "1.6 km" },
  { id: "8", nom: "Centre Omnisports Est", adresse: "2 rue des Sports, Maxéville",   type: "Natation",   note: 4.1, distance: "4.0 km" },
];

const FILTRES_SPORTS = ["Tous","Football","Handball","Basketball","Volleyball","Badminton","Natation","Tennis","Danse"];
const FILTRES_EVENTS = ["Tous","Réunion","Conférence","Séminaire","Salle des fêtes","Formation","Exposition"];
const TYPES_EVENTS   = new Set(["Réunion","Conférence","Séminaire","Salle des fêtes","Formation","Exposition","Gala","Banquet"]);

export default function Recherche() {
  const navigation = useNavigation();
  const [adresse, setAdresse] = useState("");
  const [tab, setTab]         = useState("sports");
  const [filtre, setFiltre]   = useState("Tous");

  const filtresActifs = tab === "sports" ? FILTRES_SPORTS : FILTRES_EVENTS;

  const results = RESULTS_MOCK.filter((item) => {
    const matchAdresse = adresse.trim() === "" || item.adresse.toLowerCase().includes(adresse.toLowerCase()) || item.nom.toLowerCase().includes(adresse.toLowerCase());
    const matchFiltre  = filtre === "Tous" || item.type === filtre;
    const matchTab     = tab === "sports" ? !TYPES_EVENTS.has(item.type) : TYPES_EVENTS.has(item.type);
    return matchAdresse && matchFiltre && matchTab;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <Header titleLeft title="Recherche" showSettings showBack={false} />

      {/* Barre adresse */}
      <View style={rechercheStyles.searchContainer}>
        <SearchBar
          value={adresse}
          onChangeText={setAdresse}
          placeholder="Adresse, ville, code postal..."
        />
      </View>

      {/* Onglets Sport / Événements */}
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

      {/* Filtres spécifiques */}
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
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
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
            category={item.type}
            showDistance
            onPress={() => navigation.navigate("DetailSalle/index", { salle: item, category: item.type })}
          />
        )}
        ListEmptyComponent={
          <View style={commonStyles.emptyState}>
            <Ionicons name="search-outline" size={48} color={COLORS.border} />
            <Text style={commonStyles.emptyTitle}>Aucun résultat</Text>
            <Text style={commonStyles.emptySub}>Modifiez l'adresse ou le filtre</Text>
          </View>
        }
      />

      <Footer />
    </SafeAreaView>
  );
}
