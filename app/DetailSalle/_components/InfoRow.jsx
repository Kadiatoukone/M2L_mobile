import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { detailSalleStyles } from "../../../styles/styles";
import { COLORS } from "../../../constants/theme";

/**
 * Ligne d'information avec icône colorée.
 *
 * Props :
 *  - icon  {string}  Nom d'icône Ionicons
 *  - text  {string}  Texte affiché
 */
export default function InfoRow({ icon, text }) {
  return (
    <View style={detailSalleStyles.infoRow}>
      <View style={detailSalleStyles.infoIconBox}>
        <Ionicons name={icon} size={16} color={COLORS.red} />
      </View>
      <Text style={detailSalleStyles.infoText}>{text}</Text>
    </View>
  );
}
