import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ReservationCard from "./_components/ReservationCard";
import CancelModal from "./_components/CancelModal";
import { reservationStyles, commonStyles } from "../../styles/styles";
import { COLORS } from "../../constants/theme";
import { getMesReservations, supprimerReservation } from "../../services/apiService";

const MAP_STATUT = {
  EN_ATTENTE: "en attente",
  VALIDEE:    "confirmé",
  REFUSEE:    "annulé",
};

export default function Reservation() {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [selectedId, setSelectedId]     = useState(null);
  const [showCancel, setShowCancel]     = useState(false);

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
    salle:   r.motif || "Réservation",
    type:    "",
    date:    r.dateDebut,
    creneau: `${r.heureDebut} \u2013 ${r.heureFin}`,
    statut:  MAP_STATUT[r.statut] ?? "en attente",
  });

  const sorted = reservations
    .map(toCardFormat)
    .sort((a, b) => (a.statut === "annulé" ? 1 : b.statut === "annulé" ? -1 : 0));

  return (
    <SafeAreaView style={commonStyles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <Header
        left={
          <View style={reservationStyles.userInfo}>
            <View style={reservationStyles.avatar}>
              <Ionicons name="person" size={20} color={COLORS.white} />
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

      {loading ? (
        <View style={commonStyles.emptyState}>
          <ActivityIndicator size="large" color={COLORS.red} />
        </View>
      ) : error ? (
        <View style={commonStyles.emptyState}>
          <Ionicons name="wifi-outline" size={52} color={COLORS.border} />
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
              <Ionicons name="calendar-outline" size={52} color={COLORS.border} />
              <Text style={commonStyles.emptyTitle}>Aucune réservation</Text>
              <Text style={commonStyles.emptySub}>Réservez une salle depuis l'accueil</Text>
              <TouchableOpacity
                style={[reservationStyles.emptyBtn, { marginTop: 16 }]}
                onPress={() => navigation.navigate("Accueil")}
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
