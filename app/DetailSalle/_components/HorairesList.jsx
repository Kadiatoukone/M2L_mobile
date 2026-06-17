// Liste des horaires d'ouverture de la salle, un jour par ligne
// (données réelles venant de la base de données).

import { View, Text } from "react-native";
import { useStyles } from "../../../context/ThemeContext";

export default function HorairesList({ horaires = [] }) {
  const { detailSalleStyles } = useStyles();
  if (horaires.length === 0) {
    return (
      <Text style={detailSalleStyles.emptyHint}>
        Aucun horaire renseigné pour cette salle.
      </Text>
    );
  }

  return (
    <View>
      {horaires.map((h) => {
        const ouvert = h.statut === "ouvert";
        return (
          <View key={h.id} style={detailSalleStyles.horaireRow}>
            <Text style={detailSalleStyles.horaireJour}>{h.jour}</Text>
            {ouvert ? (
              <Text style={detailSalleStyles.horaireHeures}>
                {h.heureOuverture} – {h.heureFermeture}
              </Text>
            ) : (
              <Text style={detailSalleStyles.horaireFerme}>Fermé</Text>
            )}
            <View
              style={[
                detailSalleStyles.horaireStatutBadge,
                ouvert
                  ? detailSalleStyles.horaireStatutOuvert
                  : detailSalleStyles.horaireStatutFerme,
              ]}
            >
              <Text
                style={[
                  detailSalleStyles.horaireStatutText,
                  ouvert
                    ? detailSalleStyles.horaireStatutTextOuvert
                    : detailSalleStyles.horaireStatutTextFerme,
                ]}
              >
                {ouvert ? "Ouvert" : "Fermé"}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
