import { View, Text } from "react-native";
import { detailSalleStyles } from "../../../styles/styles";

/**
 * Liste des horaires d'ouverture réels de la salle (issus de la BDD,
 * entité Horaire), un jour par ligne — pas de notion de créneau réservable.
 *
 * Props :
 *  - horaires {Array<{ id, jour, heureOuverture, heureFermeture, statut }>}
 */
export default function HorairesList({ horaires = [] }) {
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
