// Grille de calendrier mensuel.
// Permet de choisir une date unique ou une plage continue (dateDebut → dateFin).
// Les jours avant minDate ou les jours où la salle est fermée sont grisés.

import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../../../context/ThemeContext";
import { estOuvert } from "../../../utils/horairesUtils";

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MOIS  = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

// Nombre de jours dans un mois
function nbJours(annee, mois) { return new Date(annee, mois + 1, 0).getDate(); }
// Position du 1er jour du mois dans la semaine (0 = lundi)
function premierJour(annee, mois) { return (new Date(annee, mois, 1).getDay() + 6) % 7; }
// Compare deux dates en ignorant l'heure
function memeJour(a, b) { return !!a && !!b && a.toDateString() === b.toDateString(); }

export default function CalendarGrid({ annee, mois, dateDebut, dateFin, horaires = [], minDate = null, onPrev, onNext, onSelect }) {
  const { colors } = useTheme();
  const { calendrierStyles } = useStyles();
  const today  = new Date();
  const total  = nbJours(annee, mois);
  const offset = premierJour(annee, mois);

  // Cases vides avant le 1er du mois, puis un numéro par jour, puis complète la dernière semaine
  const cells  = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <View style={calendrierStyles.calBox}>
      {/* Navigation mois précédent / suivant */}
      <View style={calendrierStyles.monthNav}>
        <TouchableOpacity onPress={onPrev} style={calendrierStyles.navBtn}>
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={calendrierStyles.monthTitle}>{MOIS[mois]} {annee}</Text>
        <TouchableOpacity onPress={onNext} style={calendrierStyles.navBtn}>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* En-têtes des jours de la semaine */}
      <View style={calendrierStyles.daysRow}>
        {JOURS.map((j) => (
          <Text key={j} style={calendrierStyles.dayLabel}>{j}</Text>
        ))}
      </View>

      {/* Grille des jours du mois */}
      <View style={calendrierStyles.gridCal}>
        {cells.map((day, idx) => {
          if (!day) return <View key={`e${idx}`} style={calendrierStyles.cell} />;

          const date = new Date(annee, mois, day);
          const tropTot = minDate && date < minDate;
          const ferme = horaires.length > 0 && !estOuvert(horaires, date);
          const indisponible = tropTot || ferme;
          const isAujourdhui = date.toDateString() === today.toDateString();
          const isDebut = memeJour(date, dateDebut);
          const isFin = memeJour(date, dateFin);
          const isSel = isDebut || isFin;
          const isDansPlage =
            dateDebut && dateFin && date > dateDebut && date < dateFin;

          return (
            <TouchableOpacity
              key={`d${day}`}
              disabled={indisponible}
              style={[
                calendrierStyles.cell,
                isAujourdhui && !isSel && calendrierStyles.cellToday,
                isDansPlage && calendrierStyles.cellInRange,
                isSel && calendrierStyles.cellSel,
                indisponible && calendrierStyles.cellClosed,
              ]}
              onPress={() => onSelect(date)}
            >
              <Text
                style={[
                  calendrierStyles.cellText,
                  isAujourdhui && !isSel && calendrierStyles.cellTextToday,
                  isDansPlage && calendrierStyles.cellTextInRange,
                  isSel && calendrierStyles.cellTextSel,
                  indisponible && calendrierStyles.cellTextClosed,
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
