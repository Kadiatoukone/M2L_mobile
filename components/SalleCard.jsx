import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { componentStyles } from "../styles/styles";
import { COLORS } from "../constants/theme";

/**
 * Carte d'une salle — utilisée dans ListeSalles et Recherche.
 *
 * Props :
 *  - salle    {object}  { nom, adresse, note, capacite }
 *  - category {string}  Nom de la catégorie (badge)
 *  - onPress  {func}    Callback au clic
 *  - showDistance {boolean} Afficher le badge distance (Recherche uniquement)
 */
export default function SalleCard({ salle, category, onPress, showDistance = false }) {
  const { nom, adresse, note = 0, capacite, distance } = salle;
  const stars = Math.round(note);

  return (
    <TouchableOpacity
      style={componentStyles.cardBase}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {/* Bandeau gauche rouge */}
      <View style={componentStyles.cardAccent} />

      <View style={componentStyles.cardBody}>
        {/* Titre + badge catégorie */}
        <View style={componentStyles.cardTop}>
          <Text style={componentStyles.cardTitle} numberOfLines={1}>
            {nom}
          </Text>
          <View style={componentStyles.badgeDark}>
            <Text style={componentStyles.badgeDarkText}>{category}</Text>
          </View>
        </View>

        {/* Étoiles + note */}
        <View style={componentStyles.ratingRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < stars ? "star" : "star-outline"}
              size={12}
              color={i < stars ? "#FFC107" : COLORS.border}
            />
          ))}
          <Text style={componentStyles.ratingNote}>{note.toFixed(1)}</Text>
        </View>

        {/* Adresse + distance optionnelle */}
        <View style={componentStyles.adresseRow}>
          <Ionicons name="location-outline" size={13} color={COLORS.red} />
          <Text style={componentStyles.adresseText} numberOfLines={1}>
            {adresse}
          </Text>
          {showDistance && distance && (
            <View style={{ backgroundColor: COLORS.lightGrey, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 100 }}>
              <Text style={{ fontSize: 11, color: COLORS.textGrey, fontWeight: "600" }}>
                {distance}
              </Text>
            </View>
          )}
        </View>

        {/* Capacité (si dispo) */}
        {capacite && (
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
            <Ionicons name="people-outline" size={13} color={COLORS.textGrey} />
            <Text style={{ fontSize: 12, color: COLORS.textGrey, marginLeft: 4 }}>
              Capacité : {capacite} pers.
            </Text>
          </View>
        )}
      </View>

      <Ionicons name="chevron-forward" size={18} color={COLORS.grey} />
    </TouchableOpacity>
  );
}
