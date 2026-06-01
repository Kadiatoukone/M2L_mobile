import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { componentStyles, calendrierStyles } from "../../../styles/styles";
import { COLORS } from "../../../constants/theme";

/**
 * Modal de confirmation de réservation avec récapitulatif.
 *
 * Props :
 *  - visible      {boolean}  Afficher/masquer
 *  - salleName    {string}   Nom de la salle
 *  - dateFormatee {string}   Date sélectionnée formatée
 *  - creneau      {string}   Créneau sélectionné
 *  - typeResa     {string}   "unique" | "mensuel"
 *  - description  {string}   Note de la demande
 *  - onCancel     {func}     Fermer sans confirmer
 *  - onConfirm    {func}     Confirmer la réservation
 */
export default function ConfirmationModal({
  visible,
  salleName,
  dateFormatee,
  creneau,
  typeResa,
  description,
  onCancel,
  onConfirm,
}) {
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
            <Ionicons name="calendar-check-outline" size={28} color={COLORS.red} />
            <Text style={componentStyles.modalTitle}>Confirmer la réservation</Text>
          </View>

          <View style={componentStyles.modalDivider} />

          {/* Récap */}
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
            <Text style={calendrierStyles.recapValue}>{dateFormatee}</Text>
          </View>

          <View style={calendrierStyles.recapRow}>
            <Text style={calendrierStyles.recapLabel}>Créneau</Text>
            <Text style={calendrierStyles.recapValue}>{creneau}</Text>
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
