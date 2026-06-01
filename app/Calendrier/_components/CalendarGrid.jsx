import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { calendrierStyles } from "../../../styles/styles";
import { COLORS } from "../../../constants/theme";

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MOIS  = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

function nbJours(annee, mois) { return new Date(annee, mois + 1, 0).getDate(); }
function premierJour(annee, mois) { return (new Date(annee, mois, 1).getDay() + 6) % 7; }

/**
 * Grille de calendrier mensuel interactive.
 *
 * Props :
 *  - annee     {number}  Année affichée
 *  - mois      {number}  Mois affiché (0-11)
 *  - jourSel   {number}  Jour sélectionné
 *  - onPrev    {func}    Mois précédent
 *  - onNext    {func}    Mois suivant
 *  - onSelect  {func}    Sélection d'un jour
 */
export default function CalendarGrid({ annee, mois, jourSel, onPrev, onNext, onSelect }) {
  const today  = new Date();
  const total  = nbJours(annee, mois);
  const offset = premierJour(annee, mois);
  const cells  = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <View style={calendrierStyles.calBox}>
      {/* Navigation mois */}
      <View style={calendrierStyles.monthNav}>
        <TouchableOpacity onPress={onPrev} style={calendrierStyles.navBtn}>
          <Ionicons name="chevron-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={calendrierStyles.monthTitle}>{MOIS[mois]} {annee}</Text>
        <TouchableOpacity onPress={onNext} style={calendrierStyles.navBtn}>
          <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* En-têtes jours */}
      <View style={calendrierStyles.daysRow}>
        {JOURS.map((j) => (
          <Text key={j} style={calendrierStyles.dayLabel}>{j}</Text>
        ))}
      </View>

      {/* Grille jours */}
      <View style={calendrierStyles.gridCal}>
        {cells.map((day, idx) => {
          if (!day) return <View key={`e${idx}`} style={calendrierStyles.cell} />;
          const isAujourdhui =
            day === today.getDate() &&
            mois === today.getMonth() &&
            annee === today.getFullYear();
          const isSel = day === jourSel;
          return (
            <TouchableOpacity
              key={`d${day}`}
              style={[
                calendrierStyles.cell,
                isAujourdhui && !isSel && calendrierStyles.cellToday,
                isSel && calendrierStyles.cellSel,
              ]}
              onPress={() => onSelect(day)}
            >
              <Text
                style={[
                  calendrierStyles.cellText,
                  isAujourdhui && !isSel && calendrierStyles.cellTextToday,
                  isSel && calendrierStyles.cellTextSel,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
