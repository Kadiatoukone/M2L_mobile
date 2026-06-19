import { View, Text, TouchableOpacity } from "react-native";
import { calendrierStyles } from "../../../styles/styles";

const CRENEAUX = [
  "09:00 – 10:30",
  "11:00 – 12:30",
  "14:00 – 15:30",
  "16:00 – 17:30",
  "18:00 – 19:30",
  "20:00 – 21:30",
];

/**
 * Sélecteur de créneaux horaires.
 *
 * Props :
 *  - selected  {string}  Créneau actuellement sélectionné
 *  - onSelect  {func}    Callback au choix d'un créneau
 *  - creneaux  {array}   Liste de créneaux (optionnel, utilise CRENEAUX par défaut)
 */
export default function CreneauPicker({ selected, onSelect, creneaux = CRENEAUX }) {
  return (
    <>
      <Text style={calendrierStyles.subTitle}>Choisir un créneau</Text>
      <View style={calendrierStyles.creneauxGrid}>
        {creneaux.map((c) => (
          <TouchableOpacity
            key={c}
            style={[calendrierStyles.creneau, selected === c && calendrierStyles.creneauSel]}
            onPress={() => onSelect(c)}
          >
            <Text
              style={[
                calendrierStyles.creneauText,
                selected === c && calendrierStyles.creneauTextSel,
              ]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
