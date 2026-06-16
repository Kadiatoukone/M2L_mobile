// Carte affichée dans la liste des salles et dans la recherche.
// Props :
//  - salle    : les données de la salle (nom, adresse, note, capacité...)
//  - category : le type/catégorie de la salle (affiché comme badge)
//  - onPress  : action quand on appuie sur la carte

import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../context/ThemeContext";

export default function SalleCard({ salle, category, onPress }) {
  const { colors } = useTheme();
  const { componentStyles } = useStyles();
  const { nom, adresse, note = 0, capacite } = salle;

  // Je calcule le nombre d'étoiles à afficher (arrondi)
  const stars = Math.round(note);

  return (
    <TouchableOpacity
      style={componentStyles.cardBase}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {/* Bande rouge à gauche */}
      <View style={componentStyles.cardAccent} />

      <View style={componentStyles.cardBody}>
        {/* Nom de la salle + badge catégorie */}
        <View style={componentStyles.cardTop}>
          <Text style={componentStyles.cardTitle} numberOfLines={1}>
            {nom}
          </Text>
          <View style={componentStyles.badgeDark}>
            <Text style={componentStyles.badgeDarkText}>{category}</Text>
          </View>
        </View>

        {/* Note avec étoiles */}
        <View style={componentStyles.ratingRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < stars ? "star" : "star-outline"}
              size={12}
              color={i < stars ? "#FFC107" : colors.border}
            />
          ))}
          <Text style={componentStyles.ratingNote}>{note.toFixed(1)}</Text>
        </View>

        {/* Adresse */}
        <View style={componentStyles.adresseRow}>
          <Ionicons name="location-outline" size={13} color={colors.red} />
          <Text style={componentStyles.adresseText} numberOfLines={1}>
            {adresse}
          </Text>
        </View>

        {/* Capacité (si renseignée) */}
        {capacite && (
          <View style={componentStyles.cardCapaciteRow}>
            <Ionicons name="people-outline" size={13} color={colors.textGrey} />
            <Text style={componentStyles.cardCapaciteText}>
              Capacité : {capacite} pers.
            </Text>
          </View>
        )}
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.grey} />
    </TouchableOpacity>
  );
}
