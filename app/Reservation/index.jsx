// Page "Mes réservations" — liste toutes les réservations de l'utilisateur
// avec la possibilité de filtrer par statut et d'annuler une réservation.

import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import EtatChargement from "../../components/EtatChargement";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ReservationCard from "./_components/ReservationCard";
import CancelModal from "./_components/CancelModal";
import { useTheme, useStyles } from "../../context/ThemeContext";
import { getMesReservations, supprimerReservation } from "../../services/apiService";

// Traduction des statuts reçus du serveur
const MAP_STATUT = {
  EN_ATTENTE: "en attente",
  VALIDEE:    "confirmé",
  REFUSEE:    "refusé",
};

// Options de filtre disponibles
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

  // ─── État ────────────────────────────────────────────────────
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [selectedId, setSelectedId]     = useState(null);
  const [showCancel, setShowCancel]     = useState(false);
  const [filtre, setFiltre]             = useState(null);

  // ─── Chargement des réservations ─────────────────────────────
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

  // Annulation d'une réservation après confirmation
  const handleAnnuler = async () => {
    try {
      await supprimerReservation(selectedId);
      // Je supprime la réservation de la liste sans recharger toute la page
      setReservations((prev) => prev.filter((r) => r.id !== selectedId));
    } catch (e) {
      // Silencieux : la fenêtre se ferme même en cas d'erreur
    } finally {
      setShowCancel(false);
      setSelectedId(null);
    }
  };

  // Mise en forme des données pour l'affichage dans la carte
  const toCardFormat = (r) => ({
    id:      r.id,
    salle:   r.salle?.nom?.trim() || "Salle",
    type:    r.typeResa === "mensuel" ? "Mensuel" : "Ponctuel",
    motif:   r.motif,
    date:    r.dateDebut === r.dateFin ? r.dateDebut : `${r.dateDebut} → ${r.dateFin}`,
    creneau: `${r.heureDebut} – ${r.heureFin}`,
    statut:  MAP_STATUT[r.statut] ?? "en attente",
  });

  // Filtrage par statut et tri (les refusées en bas de liste)
  const filtered = filtre
    ? reservations.filter((r) => r.statut === filtre)
    : reservations;

  const sorted = filtered
    .map(toCardFormat)
    .sort((a, b) => (a.statut === "refusé" ? 1 : b.statut === "refusé" ? -1 : 0));

  return (
    <SafeAreaView style={commonStyles.safe}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.surface} />

      {/* En-tête */}
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

      {/* Filtres par statut */}
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

      {/* Chargement / erreur / liste */}
      <EtatChargement chargement={loading} erreur={error} />
      {!loading && !error && (
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

      {/* Fenêtre de confirmation d'annulation */}
      <CancelModal
        visible={showCancel}
        onCancel={() => setShowCancel(false)}
        onConfirm={handleAnnuler}
      />
    </SafeAreaView>
  );
}
