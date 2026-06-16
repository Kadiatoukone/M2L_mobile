import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../../../context/ThemeContext";

/**
 * Ligne de paramètre réutilisable.
 *
 * Props :
 *  - icon        {string}   Nom icône Ionicons
 *  - iconBg      {string}   Couleur de fond de l'icône
 *  - iconColor   {string}   Couleur de l'icône
 *  - title       {string}   Titre de l'item
 *  - subtitle    {string}   Sous-texte
 *  - onPress     {func}     Si fourni, rend l'item cliquable avec flèche
 *  - right       {node}     Composant custom à droite (ex: Switch)
 *  - showSep     {boolean}  Afficher le séparateur en bas
 */
export default function SettingItem({ icon, iconBg, iconColor, title, subtitle, onPress, right, showSep = false }) {
  const { colors } = useTheme();
  const { parametresStyles } = useStyles();
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
