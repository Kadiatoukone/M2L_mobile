import { View, Text, TouchableOpacity } from "react-native";
import { useStyles } from "../../../context/ThemeContext";

/**
 * Grille de créneaux d'1h. Permet de sélectionner une plage continue
 * (comme le calendrier : on touche un créneau de début, puis un créneau
 * de fin, tout ce qui est entre les deux est inclus).
 *
 * Props :
 *  - creneaux        {Array<{debut,fin}>}  Créneaux disponibles dans la fenêtre d'ouverture
 *  - occupes          {Set<string>}         Heures de début déjà réservées (non sélectionnables)
 *  - selectionDebut   {string|null}         Heure de début sélectionnée ("09:00")
 *  - selectionFin      {string|null}         Heure de fin sélectionnée ("11:00")
 *  - onSelect          {func}                Appelé avec le créneau touché
 *  - readOnly          {boolean}             Affichage seul (page détail salle)
 */
export default function SlotGrid({
  creneaux,
  occupes = new Set(),
  selectionDebut,
  selectionFin,
  onSelect,
  readOnly = false,
}) {
  const { calendrierStyles } = useStyles();
  if (creneaux.length === 0) {
    return <Text style={calendrierStyles.emptyHint}>Aucun créneau disponible pour cette sélection.</Text>;
  }

  return (
    <View style={calendrierStyles.slotsGrid}>
      {creneaux.map((c) => {
        const occupe = occupes.has(c.debut);
        const dansSelection =
          !readOnly && selectionDebut &&
          c.debut >= selectionDebut &&
          (selectionFin ? c.fin <= selectionFin : c.debut === selectionDebut);

        return (
          <TouchableOpacity
            key={c.debut}
            disabled={occupe || readOnly}
            onPress={() => onSelect?.(c)}
            style={[
              calendrierStyles.slotChip,
              dansSelection && calendrierStyles.slotChipSelected,
              occupe && calendrierStyles.slotChipOccupied,
            ]}
          >
            <Text
              style={[
                calendrierStyles.slotText,
                dansSelection && calendrierStyles.slotTextSelected,
                occupe && calendrierStyles.slotTextOccupied,
              ]}
            >
              {c.debut.replace(":", "h")}
            </Text>
            {occupe && <Text style={calendrierStyles.slotOccupeLabel}>Réservé</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
