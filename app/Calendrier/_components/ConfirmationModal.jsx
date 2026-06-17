// Fenêtre affichée avant l'envoi de la réservation.
// Récapitule la salle, le type, la date, l'horaire et la note,
// puis demande confirmation à l'utilisateur.

import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../../../context/ThemeContext";

export default function ConfirmationModal({
  visible,
  salleName,
  periode,
  horaire,
  typeResa,
  description,
  onCancel,
  onConfirm,
}) {
  const { colors } = useTheme();
  const { componentStyles, calendrierStyles } = useStyles();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={componentStyles.overlayBottom}>
        <View style={componentStyles.modalCardBottom}>
          {/* Titre */}
          <View style={componentStyles.modalHeader}>
            <Ionicons name="calendar-check-outline" size={28} color={colors.red} />
            <Text style={componentStyles.modalTitle}>Confirmer la réservation</Text>
          </View>

          <View style={componentStyles.modalDivider} />

          {/* Récapitulatif de la demande */}
          <View style={calendrierStyles.recapRow}>
            <Text style={calendrierStyles.recapLabel}>Salle</Text>
            <Text style={calendrierStyles.recapValue} numberOfLines={1}>{salleName}</Text>
          </View>

          <View style={calendrierStyles.recapRow}>
            <Text style={calendrierStyles.recapLabel}>Type</Text>
            <View style={[
              calendrierStyles.typeBadge,
              typeResa === "mensuel" && calendrierStyles.typeBadgeMensuel,
            ]}>
              <Text style={calendrierStyles.typeBadgeText}>
                {typeResa === "unique" ? "Réservation unique" : "Réservation mensuelle"}
              </Text>
            </View>
          </View>

          <View style={calendrierStyles.recapRow}>
            <Text style={calendrierStyles.recapLabel}>Date</Text>
            <Text style={calendrierStyles.recapValue}>{periode}</Text>
          </View>

          <View style={calendrierStyles.recapRow}>
            <Text style={calendrierStyles.recapLabel}>Horaire</Text>
            <Text style={calendrierStyles.recapValue}>{horaire}</Text>
          </View>

          {description?.trim().length > 0 && (
            <View style={[calendrierStyles.recapRow, { alignItems: "flex-start" }]}>
              <Text style={calendrierStyles.recapLabel}>Note</Text>
              <Text style={[calendrierStyles.recapValue, { flex: 1 }]} numberOfLines={2}>
                {description.trim()}
              </Text>
            </View>
          )}

          {/* Boutons */}
          <View style={componentStyles.modalBtns}>
            <TouchableOpacity style={componentStyles.modalBtnBack} onPress={onCancel}>
              <Text style={componentStyles.modalBtnBackText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={componentStyles.modalBtnConfirm} onPress={onConfirm}>
              <Text style={componentStyles.modalBtnConfirmText}>Oui, réserver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
