// Une ligne d'information avec une icône colorée à gauche.
// Props : icon (nom de l'icône), text (texte affiché)

import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../../../context/ThemeContext";

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
