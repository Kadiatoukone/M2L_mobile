// Grille de créneaux d'une heure.
// On peut sélectionner une plage continue : on touche un créneau de début,
// puis un créneau de fin, et tout ce qui est entre les deux est inclus
// (même principe que la sélection de dates dans le calendrier).
//
// readOnly affiche juste les créneaux sans pouvoir les sélectionner
// (utilisé dans l'aperçu des disponibilités sur la page détail salle).

import { View, Text, TouchableOpacity } from "react-native";
import { useStyles } from "../../../context/ThemeContext";

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
