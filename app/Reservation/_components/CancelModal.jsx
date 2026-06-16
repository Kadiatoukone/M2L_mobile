import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStyles } from "../../../context/ThemeContext";

/**
 * Modal de confirmation d'annulation.
 *
 * Props :
 *  - visible    {boolean}  Afficher/masquer
 *  - onCancel   {func}     Fermer sans annuler
 *  - onConfirm  {func}     Confirmer l'annulation
 */
export default function CancelModal({ visible, onCancel, onConfirm }) {
  const { componentStyles } = useStyles();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={componentStyles.overlay}>
        <View style={componentStyles.modalCard}>
          <Ionicons
            name="warning-outline"
            size={36}
            color="#F57F17"
            style={{ marginBottom: 16 }}
          />
          <Text style={componentStyles.modalTitle}>Annuler la réservation ?</Text>
          <Text style={componentStyles.modalText}>
            Cette action est irréversible.{"\n"}
            La réservation sera marquée comme annulée.
          </Text>
          <View style={componentStyles.modalBtns}>
            <TouchableOpacity style={componentStyles.modalBtnBack} onPress={onCancel}>
              <Text style={componentStyles.modalBtnBackText}>Retour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={componentStyles.modalBtnConfirm} onPress={onConfirm}>
              <Text style={componentStyles.modalBtnConfirmText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
