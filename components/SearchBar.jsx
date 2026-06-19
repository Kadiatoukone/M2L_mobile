import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { componentStyles } from "../styles/styles";
import { COLORS } from "../constants/theme";

/**
 * Barre de recherche réutilisable.
 *
 * Props :
 *  - value       {string}   Valeur du champ
 *  - onChangeText {func}    Callback changement
 *  - placeholder {string}   Texte indicatif
 *  - icon        {string}   Nom d'icône Ionicons (défaut : "location-outline")
 *  - style       {object}   Style supplémentaire pour le conteneur
 */
export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Rechercher...",
  icon = "location-outline",
  style,
}) {
  return (
    <View style={[componentStyles.searchBar, style]}>
      <Ionicons name={icon} size={18} color={COLORS.red} />
      <TextInput
        style={componentStyles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey}
        value={value}
        onChangeText={onChangeText}
      />
      {value?.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close-circle" size={18} color={COLORS.grey} />
        </TouchableOpacity>
      )}
    </View>
  );
}
