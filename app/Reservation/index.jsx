import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ReservationCard from "./_components/ReservationCard";
import CancelModal from "./_components/CancelModal";
import { useTheme, useStyles } from "../../context/ThemeContext";
import { getMesReservations, supprimerReservation } from "../../services/apiService";

const MAP_STATUT = {
  EN_ATTENTE: "en attente",
  VALIDEE:    "confirmé",
  REFUSEE:    "refusé",
};

const FILTRES = [
  { label: "Toutes",     statut: null },
  { label: "En attente", statut: "EN_ATTENTE" },
  { label: "Confirmée",  statut: "VALIDEE" },
  { label: "Refusée",    statut: "REFUSEE" },
];

export default function Reservation() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const { reservationStyles, rechercheStyles, commonStyles } = useStyles();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [selectedId, setSelectedId]     = useState(null);
  const [showCancel, setShowCancel]     = useState(false);
  const [filtre, setFiltre]             = useState(null);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMesReservations();
      setReservations(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReservations(); }, [fetchReservations]);

  const handleAnnuler = async () => {
    try {
      await supprimerReservation(selectedId);
      setReservations((prev) => prev.filter((r) => r.id !== selectedId));
    } catch (e) {
      // silencieux
    } finally {
      setShowCancel(false);
      setSelectedId(null);
    }
  };

  const toCardFormat = (r) => ({
    id:      r.id,
    salle:   r.salle?.nom?.trim() || "Salle",
    type:    r.typeResa === "mensuel" ? "Mensuel" : "Ponctuel",
    motif:   r.motif,
    date:    r.dateDebut === r.dateFin ? r.dateDebut : `${r.dateDebut} → ${r.dateFin}`,
    creneau: `${r.heureDebut} – ${r.heureFin}`,
    statut:  MAP_STATUT[r.statut] ?? "en attente",
  });

  const filtered = filtre
    ? reservations.filter((r) => r.statut === filtre)
    : reservations;

  const sorted = filtered
    .map(toCardFormat)
    .sort((a, b) => (a.statut === "refusé" ? 1 : b.statut === "refusé" ? -1 : 0));

  return (
    <SafeAreaView style={commonStyles.safe}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.surface} />

      <Header
        left={
          <View style={reservationStyles.userInfo}>
            <View style={reservationStyles.avatar}>
              <Ionicons name="person" size={20} color={colors.white} />
            </View>
            <View>
              <Text style={reservationStyles.username}>Mon compte</Text>
              <Text style={reservationStyles.ligue}>Adhérent M2L</Text>
            </View>
          </View>
        }
        showSettings
      />

      <View style={reservationStyles.sectionHeader}>
        <View style={reservationStyles.sectionAccent} />
        <Text style={reservationStyles.sectionTitle}>Mes réservations</Text>
      </View>

      <View style={rechercheStyles.filtresWrapper}>
        <FlatList
          data={FILTRES}
          horizontal
          keyExtractor={(item) => item.label}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={rechercheStyles.filtresList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[rechercheStyles.filtrePill, filtre === item.statut && rechercheStyles.filtrePillActive]}
              onPress={() => setFiltre(item.statut)}
            >
              <Text style={[rechercheStyles.filtreText, filtre === item.statut && rechercheStyles.filtreTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <View style={commonStyles.emptyState}>
          <ActivityIndicator size="large" color={colors.red} />
        </View>
      ) : error ? (
        <View style={commonStyles.emptyState}>
          <Ionicons name="wifi-outline" size={52} color={colors.border} />
          <Text style={commonStyles.emptyTitle}>Impossible de charger</Text>
          <Text style={commonStyles.emptySub}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ReservationCard
              reservation={item}
              onAnnuler={() => {
                setSelectedId(item.id);
                setShowCancel(true);
              }}
            />
          )}
          contentContainerStyle={reservationStyles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={commonStyles.emptyState}>
              <Ionicons name="calendar-outline" size={52} color={colors.border} />
              <Text style={commonStyles.emptyTitle}>Aucune réservation</Text>
              <Text style={commonStyles.emptySub}>Réservez une salle depuis l'accueil</Text>
              <TouchableOpacity
                style={[reservationStyles.emptyBtn, { marginTop: 16 }]}
                onPress={() => navigation.navigate("Accueil/index")}
              >
                <Text style={reservationStyles.emptyBtnText}>Explorer les salles</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      <Footer />

      <CancelModal
        visible={showCancel}
        onCancel={() => setShowCancel(false)}
        onConfirm={handleAnnuler}
      />
    </SafeAreaView>
  );
}
