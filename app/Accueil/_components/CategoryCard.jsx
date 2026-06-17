// Carte d'une catégorie (sport ou événement) affichée sur l'accueil.
// Props : name (nom de la catégorie), color (couleur de fond), onPress

import { TouchableOpacity, Text, View } from "react-native";
import { useStyles } from "../../../context/ThemeContext";

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
