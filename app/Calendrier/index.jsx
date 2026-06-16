import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/Footer";
import { COLORS, SPACING } from "../../constants/theme";
import { creerReservation, getDisponibilite } from "../../services/apiService";
import {
  calendrierStyles,
  commonStyles,
  componentStyles,
} from "../../styles/styles";
import CalendarGrid from "./_components/CalendarGrid";
import ConfirmationModal from "./_components/ConfirmationModal";
import {
  creneauOccupe,
  fenetreCommune,
  formatDateISO,
  genererCreneaux,
  jourFrancais,
  joursEntre,
  premierJourFerme,
} from "./_components/horairesUtils";
import SlotGrid from "./_components/SlotGrid";

function formatDateFr(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

// Premier jour réservable : pas aujourd'hui, pas demain.
function calculerMinDate() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 2);
  return d;
}

export default function Calendrier() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    salleId = null,
    salleName = "Salle",
    salleType = "Sport",
    horaires = [],
  } = route.params ?? {};

  const minDate = calculerMinDate();
  const [annee, setAnnee] = useState(minDate.getFullYear());
  const [mois, setMois] = useState(minDate.getMonth());

  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);

  const [slotDebut, setSlotDebut] = useState(null);
  const [slotFin, setSlotFin] = useState(null);
  const [occupees, setOccupees] = useState([]);
  const [loadingDispo, setLoadingDispo] = useState(false);

  const [typeResa, setTypeResa] = useState("unique");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const moisPrec = () => {
    if (mois === 0) {
      setMois(11);
      setAnnee((a) => a - 1);
    } else setMois((m) => m - 1);
  };
  const moisSuiv = () => {
    if (mois === 11) {
      setMois(0);
      setAnnee((a) => a + 1);
    } else setMois((m) => m + 1);
  };

  const changerType = (key) => {
    setTypeResa(key);
    setDateDebut(null);
    setDateFin(null);
    setSlotDebut(null);
    setSlotFin(null);
  };

  // Sélection d'un jour : plage continue en "unique", jour unique en "mensuel".
  const handleSelectDay = (date) => {
    setSlotDebut(null);
    setSlotFin(null);
    if (typeResa === "mensuel") {
      setDateDebut(date);
      setDateFin(date);
      return;
    }
    if (!dateDebut || dateFin) {
      setDateDebut(date);
      setDateFin(null);
    } else if (date < dateDebut) {
      setDateDebut(date);
      setDateFin(null);
    } else {
      setDateFin(date);
    }
  };

  // ── Jours à vérifier (plage continue, ou occurrences hebdo en mensuel) ──
  const joursSelectionnes = dateDebut
    ? joursEntre(dateDebut, dateFin ?? dateDebut)
    : [];

  let joursAVerifier = joursSelectionnes;
  if (typeResa === "mensuel" && dateDebut) {
    const finDuMois = new Date(
      dateDebut.getFullYear(),
      dateDebut.getMonth() + 1,
      0,
    );
    const occurrences = [];
    const cur = new Date(dateDebut);
    while (cur <= finDuMois) {
      occurrences.push(new Date(cur));
      cur.setDate(cur.getDate() + 7);
    }
    joursAVerifier = occurrences;
  }

  const jourFerme =
    joursAVerifier.length > 0
      ? premierJourFerme(horaires, joursAVerifier)
      : null;
  const fenetre =
    joursAVerifier.length > 0 ? fenetreCommune(horaires, joursAVerifier) : null;
  const creneaux = genererCreneaux(fenetre);

  // ── Disponibilité réelle (récupérée à l'API à chaque changement de jours) ──
  const cleJours = joursAVerifier.map(formatDateISO).join(",");
  useEffect(() => {
    if (!salleId || joursAVerifier.length === 0) {
      setOccupees([]);
      return;
    }
    let annule = false;
    setLoadingDispo(true);
    const dates = joursAVerifier.map(formatDateISO).sort();
    getDisponibilite(salleId, dates[0], dates[dates.length - 1])
      .then((data) => {
        if (!annule) setOccupees(data);
      })
      .catch(() => {
        if (!annule) setOccupees([]);
      })
      .finally(() => {
        if (!annule) setLoadingDispo(false);
      });
    return () => {
      annule = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salleId, cleJours]);

  const occupesSet = new Set(
    creneaux
      .filter((c) => creneauOccupe(c, joursAVerifier, occupees))
      .map((c) => c.debut),
  );
  const toutDisponible = creneaux.length > 0 && occupesSet.size === 0;

  const handleSelectSlot = (creneau) => {
    if (occupesSet.has(creneau.debut)) return;

    // Première touche (ou sélection déjà complète) : on attend une 2e
    // touche pour étendre la plage, comme pour les dates.
    if (!slotDebut || slotFin) {
      setSlotDebut(creneau.debut);
      setSlotFin(null);
      return;
    }
    if (creneau.debut < slotDebut) {
      setSlotDebut(creneau.debut);
      setSlotFin(null);
      return;
    }
    if (creneau.debut === slotDebut) {
      // Touché deux fois le même créneau de départ → sélection d'1h.
      setSlotFin(creneau.fin);
      return;
    }
    // Extension de la sélection : on vérifie qu'aucun créneau intermédiaire
    // n'est déjà réservé, sinon on repart d'une sélection neuve.
    const enChemin = creneaux.filter(
      (c) => c.debut >= slotDebut && c.fin <= creneau.fin,
    );
    const bloque = enChemin.some((c) => occupesSet.has(c.debut));
    if (bloque) {
      setSlotDebut(creneau.debut);
      setSlotFin(null);
    } else {
      setSlotFin(creneau.fin);
    }
  };

  const handleSelectAll = () => {
    if (!toutDisponible) return;
    setSlotDebut(creneaux[0].debut);
    setSlotFin(creneaux[creneaux.length - 1].fin);
  };

  let erreurHoraire = "";
  if (jourFerme) {
    erreurHoraire = `La salle est fermée le ${jourFrancais(jourFerme)} ${formatDateFr(jourFerme)}.`;
  }

  const periodeAffichee = !dateDebut
    ? "-- / -- / ----"
    : !dateFin || dateFin.toDateString() === dateDebut.toDateString()
      ? formatDateFr(dateDebut)
      : `${formatDateFr(dateDebut)} → ${formatDateFr(dateFin)}`;

  const horaireAffiche =
    slotDebut && slotFin
      ? `${slotDebut.replace(":", "h")} – ${slotFin.replace(":", "h")}`
      : "-- h -- – -- h --";

  const peutConfirmer =
    !!salleId &&
    !!dateDebut &&
    !jourFerme &&
    !!fenetre &&
    !!slotDebut &&
    !!slotFin &&
    !loadingDispo &&
    description.trim().length > 0;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (typeResa === "mensuel") {
        for (const occ of joursAVerifier) {
          const iso = formatDateISO(occ);
          await creerReservation({
            salleId,
            dateDebut: iso,
            dateFin: iso,
            heureDebut: slotDebut,
            heureFin: slotFin,
            motif: description.trim(),
            typeResa: "mensuel",
          });
        }
      } else {
        await creerReservation({
          salleId,
          dateDebut: formatDateISO(dateDebut),
          dateFin: formatDateISO(dateFin ?? dateDebut),
          heureDebut: slotDebut,
          heureFin: slotFin,
          motif: description.trim(),
          typeResa: "ponctuel",
        });
      }

      setShowModal(false);
      navigation.navigate("Reservation/index");
    } catch (e) {
      setShowModal(false);
      Alert.alert("Erreur", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeGrey}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkRed} />

      <View style={calendrierStyles.bannerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 4, marginRight: SPACING.sm }}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={calendrierStyles.bannerType}>
            {salleType.toUpperCase()}
          </Text>
          <Text style={calendrierStyles.bannerName} numberOfLines={1}>
            {salleName}
          </Text>
        </View>
        <View style={componentStyles.bannerCircle} />
      </View>

      <ScrollView
        contentContainerStyle={commonStyles.scrollWithTop}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={calendrierStyles.toggle}>
          {["unique", "mensuel"].map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                calendrierStyles.toggleBtn,
                typeResa === key && calendrierStyles.toggleBtnActive,
              ]}
              onPress={() => changerType(key)}
            >
              <Text
                style={[
                  calendrierStyles.toggleText,
                  typeResa === key && calendrierStyles.toggleTextActive,
                ]}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {typeResa === "mensuel" ? (
          <View style={calendrierStyles.mensuelInfo}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={COLORS.red}
            />
            <Text style={calendrierStyles.mensuelText}>
              Le créneau sera réservé chaque semaine, le même jour, jusqu'à la
              fin du mois.
            </Text>
          </View>
        ) : (
          <View style={calendrierStyles.mensuelInfo}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={COLORS.red}
            />
            <Text style={calendrierStyles.mensuelText}>
              Touchez une date de début puis une date de fin pour réserver
              plusieurs jours d'affilée. La réservation n'est possible qu'à
              partir du {formatDateFr(minDate)}.
            </Text>
          </View>
        )}

        <CalendarGrid
          annee={annee}
          mois={mois}
          dateDebut={dateDebut}
          dateFin={dateFin}
          horaires={horaires}
          minDate={minDate}
          onPrev={moisPrec}
          onNext={moisSuiv}
          onSelect={handleSelectDay}
        />

        {dateDebut && (
          <>
            <View style={calendrierStyles.slotsHeaderRow}>
              <Text style={calendrierStyles.subTitle}>Créneau (1h)</Text>
              <TouchableOpacity
                style={[
                  calendrierStyles.selectAllBtn,
                  !toutDisponible && calendrierStyles.selectAllBtnDisabled,
                ]}
                onPress={handleSelectAll}
                disabled={!toutDisponible}
              >
                <Text
                  style={[
                    calendrierStyles.selectAllText,
                    !toutDisponible && calendrierStyles.selectAllTextDisabled,
                  ]}
                >
                  Toute la journée
                </Text>
              </TouchableOpacity>
            </View>

            {erreurHoraire ? (
              <View style={componentStyles.errorBox}>
                <Ionicons
                  name="alert-circle-outline"
                  size={16}
                  color={COLORS.red}
                />
                <Text style={componentStyles.errorText}>{erreurHoraire}</Text>
              </View>
            ) : loadingDispo ? (
              <Text style={calendrierStyles.emptyHint}>
                Vérification des disponibilités…
              </Text>
            ) : (
              <>
                <SlotGrid
                  creneaux={creneaux}
                  occupes={occupesSet}
                  selectionDebut={slotDebut}
                  selectionFin={slotFin}
                  onSelect={handleSelectSlot}
                />
              </>
            )}
          </>
        )}

        <Text style={calendrierStyles.subTitle}>Description de la demande</Text>
        <TextInput
          style={calendrierStyles.textarea}
          placeholder="Décrivez l'utilisation prévue de la salle… (obligatoire)"
          placeholderTextColor={COLORS.grey}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[
            componentStyles.btnRow,
            !peutConfirmer && componentStyles.btnRowDisabled,
          ]}
          onPress={() => peutConfirmer && setShowModal(true)}
          activeOpacity={peutConfirmer ? 0.9 : 1}
        >
          <Text style={componentStyles.btnRowText}>Confirmer</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </ScrollView>

      <Footer />

      <ConfirmationModal
        visible={showModal}
        salleName={salleName}
        periode={periodeAffichee}
        horaire={horaireAffiche}
        typeResa={typeResa}
        description={description}
        loading={loading}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </SafeAreaView>
  );
}
