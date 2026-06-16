import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SlotGrid from "../../Calendrier/_components/SlotGrid";
import {
  fenetreCommune,
  genererCreneaux,
  creneauOccupe,
  formatDateISO,
  estOuvert,
  jourFrancais,
} from "../../Calendrier/_components/horairesUtils";
import { getDisponibilite } from "../../../services/apiService";
import { useTheme, useStyles } from "../../../context/ThemeContext";

function formatDateFr(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

// Premier jour réservable (cohérent avec l'écran Calendrier : pas aujourd'hui, pas demain).
function premierJourReservable() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 2);
  return d;
}

/**
 * Aperçu, en lecture seule, des créneaux déjà réservés pour une salle —
 * jour par jour, pour que les adhérents sachent à l'avance ce qui est
 * disponible avant même d'aller sur l'écran de réservation.
 *
 * Props :
 *  - salleId  {number}  Id de la salle
 *  - horaires {Array}   Horaires d'ouverture de la salle
 */
export default function DisponibilitesPreview({ salleId, horaires = [] }) {
  const { colors } = useTheme();
  const { detailSalleStyles } = useStyles();
  const [date, setDate] = useState(premierJourReservable);
  const [occupees, setOccupees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!salleId) return;
    let annule = false;
    setLoading(true);
    const iso = formatDateISO(date);
    getDisponibilite(salleId, iso, iso)
      .then((data) => { if (!annule) setOccupees(data); })
      .catch(() => { if (!annule) setOccupees([]); })
      .finally(() => { if (!annule) setLoading(false); });
    return () => { annule = true; };
  }, [salleId, date]);

  const jourPrecedent = () => setDate((d) => { const n = new Date(d); n.setDate(n.getDate() - 1); return n; });
  const jourSuivant = () => setDate((d) => { const n = new Date(d); n.setDate(n.getDate() + 1); return n; });

  const ferme = !estOuvert(horaires, date);
  const fenetre = fenetreCommune(horaires, [date]);
  const creneaux = genererCreneaux(fenetre);
  const occupesSet = new Set(
    creneaux.filter((c) => creneauOccupe(c, [date], occupees)).map((c) => c.debut)
  );

  return (
    <View>
      <View style={detailSalleStyles.dispoNavRow}>
        <TouchableOpacity onPress={jourPrecedent} style={detailSalleStyles.dispoNavBtn}>
          <Ionicons name="chevron-back" size={18} color={colors.text} />
        </TouchableOpacity>
        <Text style={detailSalleStyles.dispoDate}>{jourFrancais(date)} {formatDateFr(date)}</Text>
        <TouchableOpacity onPress={jourSuivant} style={detailSalleStyles.dispoNavBtn}>
          <Ionicons name="chevron-forward" size={18} color={colors.text} />
        </TouchableOpacity>
      </View>

      {ferme ? (
        <Text style={detailSalleStyles.emptyHint}>Salle fermée ce jour-là.</Text>
      ) : loading ? (
        <Text style={detailSalleStyles.emptyHint}>Chargement…</Text>
      ) : (
        <SlotGrid creneaux={creneaux} occupes={occupesSet} readOnly />
      )}
    </View>
  );
}
