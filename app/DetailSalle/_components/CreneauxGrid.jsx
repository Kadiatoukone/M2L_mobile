import { View, Text } from "react-native";
import { detailSalleStyles } from "../../../styles/styles";

const HORAIRES_MOCK = [
  { id: 1, debut: "09:00", fin: "10:30", dispo: true  },
  { id: 2, debut: "11:00", fin: "12:30", dispo: false },
  { id: 3, debut: "14:00", fin: "15:30", dispo: true  },
  { id: 4, debut: "16:00", fin: "17:30", dispo: true  },
  { id: 5, debut: "18:00", fin: "19:30", dispo: false },
  { id: 6, debut: "20:00", fin: "21:30", dispo: true  },
];

/**
 * Grille des créneaux horaires avec indicateur disponible / réservé.
 */
export default function CreneauxGrid({ horaires = HORAIRES_MOCK }) {
  return (
    <View style={detailSalleStyles.horairesGrid}>
      {horaires.map((h) => (
        <View
          key={h.id}
          style={[
            detailSalleStyles.horaireBadge,
            h.dispo ? detailSalleStyles.horaireDispo : detailSalleStyles.horaireOccupe,
          ]}
        >
          <Text
            style={[
              detailSalleStyles.horaireText,
              h.dispo
                ? detailSalleStyles.horaireTextDispo
                : detailSalleStyles.horaireTextOccupe,
            ]}
          >
            {h.debut} – {h.fin}
          </Text>
          {!h.dispo && (
            <Text style={detailSalleStyles.horaireOccupeLabel}>Réservé</Text>
          )}
        </View>
      ))}
    </View>
  );
}
