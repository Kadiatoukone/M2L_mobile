import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../../../context/ThemeContext";

/**
 * Ligne d'information avec icône colorée.
 *
 * Props :
 *  - icon  {string}  Nom d'icône Ionicons
 *  - text  {string}  Texte affiché
 */
export default function InfoRow({ icon, text }) {
  const { colors } = useTheme();
  const { detailSalleStyles } = useStyles();
  return (
    <View style={detailSalleStyles.infoRow}>
      <View style={detailSalleStyles.infoIconBox}>
        <Ionicons name={icon} size={16} color={colors.red} />
      </View>
      <Text style={detailSalleStyles.infoText}>{text}</Text>
    </View>
  );
}
