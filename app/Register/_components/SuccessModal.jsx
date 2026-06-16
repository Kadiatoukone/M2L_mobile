import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStyles } from "../../../context/ThemeContext";

/**
 * Modal de succès affiché après une inscription réussie.
 *
 * Props :
 *  - visible  {boolean}  Afficher ou non la modal
 *  - onClose  {func}     Fermeture → redirige vers Login
 */
export default function SuccessModal({ visible, onClose }) {
  const { componentStyles } = useStyles();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={componentStyles.overlay}>
        <View style={componentStyles.modalCard}>
          {/* Icône succès */}
          <View style={componentStyles.iconCircle}>
            <Ionicons name="checkmark" size={36} color="white" />
          </View>

          <Text style={componentStyles.modalTitle}>Compte créé !</Text>
          <Text style={componentStyles.modalText}>
            Votre compte a bien été créé.{"\n"}
            Vous pouvez maintenant vous connecter.
          </Text>

          <TouchableOpacity
            style={[componentStyles.btnPrimary, { width: "100%" }]}
            onPress={onClose}
          >
            <Text style={componentStyles.btnPrimaryText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
