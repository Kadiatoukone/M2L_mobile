// Fenêtre affichée juste après une inscription réussie.
// La fermeture redirige l'utilisateur vers la page de connexion.

import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStyles } from "../../../context/ThemeContext";

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
          {/* Icône de succès */}
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
