// Carte d'une réservation, avec une couleur différente selon le statut
// (en attente, confirmée, refusée).

import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../../../context/ThemeContext";

// Couleurs associées à chaque statut
const STATUT_COLORS = {
  confirmé:     { bg: "#E8F5E9", text: "#2E7D32" },
  "en attente": { bg: "#FFF8E1", text: "#F57F17" },
  refusé:       { bg: "#FFEBEE", text: "#C62828" },
};

export default function ReservationCard({ reservation, onAnnuler }) {
  const { colors } = useTheme();
  const { componentStyles, reservationStyles } = useStyles();
  const { salle, type, date, creneau, statut } = reservation;
  const sc = STATUT_COLORS[statut] ?? STATUT_COLORS["en attente"];

  return (
    <View style={componentStyles.cardBase}>
      {/* Bande de couleur selon le statut */}
      <View style={[componentStyles.cardAccent, { backgroundColor: sc.text }]} />

      <View style={componentStyles.cardBody}>
        {/* Nom de la salle + badge type */}
        <View style={componentStyles.cardTop}>
          <Text style={componentStyles.cardTitle} numberOfLines={1}>{salle}</Text>
          <View style={componentStyles.badgeDark}>
            <Text style={componentStyles.badgeDarkText}>{type}</Text>
          </View>
        </View>

        {/* Date + créneau horaire */}
        <View style={reservationStyles.cardRow}>
          <Ionicons name="calendar-outline" size={13} color={colors.textGrey} />
          <Text style={reservationStyles.cardRowText}>{date}</Text>
          <Ionicons name="time-outline" size={13} color={colors.textGrey} style={{ marginLeft: 8 }} />
          <Text style={reservationStyles.cardRowText}>{creneau}</Text>
        </View>

        {/* Statut + bouton annuler (sauf si déjà refusée) */}
        <View style={reservationStyles.cardFooter}>
          <View style={[reservationStyles.statutBadge, { backgroundColor: sc.bg }]}>
            <Text style={[reservationStyles.statutText, { color: sc.text }]}>
              {statut.charAt(0).toUpperCase() + statut.slice(1)}
            </Text>
          </View>
          {statut !== "refusé" && (
            <TouchableOpacity style={componentStyles.btnOutline} onPress={onAnnuler}>
              <Text style={componentStyles.btnOutlineText}>Annuler</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
