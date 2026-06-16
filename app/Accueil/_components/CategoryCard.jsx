import { TouchableOpacity, Text, View } from "react-native";
import { useStyles } from "../../../context/ThemeContext";

/**
 * Carte d'une catégorie (sport ou événement).
 *
 * Props :
 *  - name    {string}  Nom de la catégorie
 *  - color   {string}  Couleur de fond
 *  - onPress {func}    Callback au clic
 */
export default function CategoryCard({ name, color, onPress }) {
  const { accueilStyles } = useStyles();
  return (
    <TouchableOpacity
      style={[accueilStyles.categoryCard, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={accueilStyles.categoryCardDot} />
      <Text style={accueilStyles.categoryCardText}>{name.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}
