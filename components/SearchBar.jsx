// Barre de recherche réutilisable, avec une croix pour vider le champ.

import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../context/ThemeContext";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Rechercher...",
  icon = "location-outline",
  style,
}) {
  const { colors } = useTheme();
  const { componentStyles } = useStyles();
  return (
    <View style={[componentStyles.searchBar, style]}>
      <Ionicons name={icon} size={18} color={colors.red} />
      <TextInput
        style={componentStyles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        value={value}
        onChangeText={onChangeText}
      />
      {value?.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close-circle" size={18} color={colors.grey} />
        </TouchableOpacity>
      )}
    </View>
  );
}
