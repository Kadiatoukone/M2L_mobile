// Une ligne de la page Paramètres (icône + titre + sous-titre).
// Si onPress est fourni, la ligne devient cliquable avec une flèche à droite.
// Le prop "right" permet d'afficher un composant personnalisé à droite (ex: un Switch).

import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../../../context/ThemeContext";

export default function SettingItem({ icon, iconBg, iconColor, title, subtitle, onPress, right, showSep = false }) {
  const { colors } = useTheme();
  const { parametresStyles } = useStyles();

  // Si la ligne est cliquable, on utilise un TouchableOpacity, sinon une simple View
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <>
      <Wrapper style={parametresStyles.row} onPress={onPress}>
        <View style={parametresStyles.rowLeft}>
          <View style={[parametresStyles.iconBox, { backgroundColor: iconBg }]}>
            <Ionicons name={icon} size={18} color={iconColor} />
          </View>
          <View>
            <Text style={parametresStyles.rowTitle}>{title}</Text>
            {subtitle && <Text style={parametresStyles.rowSub}>{subtitle}</Text>}
          </View>
        </View>
        {right ?? (onPress ? <Ionicons name="chevron-forward" size={18} color={colors.grey} /> : null)}
      </Wrapper>
      {showSep && <View style={parametresStyles.sep} />}
    </>
  );
}
