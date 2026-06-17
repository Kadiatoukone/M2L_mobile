// Page de réservation — sélection de la date et du créneau horaire.
// Deux modes : "unique" (un ou plusieurs jours d'affilée) ou "mensuel"
// (chaque semaine le même jour jusqu'à la fin du mois).

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
import { SPACING } from "../../constants/theme";
import { useTheme, useStyles } from "../../context/ThemeContext";
import { creerReservation, getDisponibilite } from "../../services/apiService";
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
} from "../../utils/horairesUtils";
import SlotGrid from "./_components/SlotGrid";

// Formate une date en "JJ/MM/AAAA" pour l'affichage
function formatDateFr(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

// La réservation est possible au plus tôt 2 jours après aujourd'hui
function calculerMinDate() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 2);
  return d;
}

export default function Calendrier() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { calendrierStyles, commonStyles, componentStyles } = useStyles();
  const route = useRoute();
  const {
    salleId = null,
    salleName = "Salle",
    salleType = "Sport",
    horaires = [],
  } = route.params ?? {};

  // ─── Calendrier ───────────────────────────────────────────────
  const minDate = calculerMinDate();
  const [annee, setAnnee] = useState(minDate.getFullYear());
  const [mois, setMois]   = useState(minDate.getMonth());

  // ─── Dates sélectionnées ──────────────────────────────────────
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin]     = useState(null);

  // ─── Créneau horaire sélectionné ──────────────────────────────
  const [slotDebut, setSlotDebut]       = useState(null);
  const [slotFin, setSlotFin]           = useState(null);
  const [occupees, setOccupees]         = useState([]);
  const [loadingDispo, setLoadingDispo] = useState(false);

  // ─── Formulaire ───────────────────────────────────────────────
  const [typeResa, setTypeResa]       = useState("unique");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal]     = useState(false);
  const [loading, setLoading]         = useState(false);

  // Passage au mois précédent / suivant dans le calendrier
  const moisPrec = () => {
    if (mois === 0) { setMois(11); setAnnee((a) => a - 1); }
    else setMois((m) => m - 1);
  };
  const moisSuiv = () => {
    if (mois === 11) { setMois(0); setAnnee((a) => a + 1); }
    else setMois((m) => m + 1);
  };

  // Changer de mode efface toute la sélection en cours
  const changerType = (key) => {
    setTypeResa(key);
    setDateDebut(null);
    setDateFin(null);
    setSlotDebut(null);
    setSlotFin(null);
  };

  // Sélection d'un jour dans le calendrier.
  // En mode unique : 1er clic = date de début, 2e clic = date de fin.
  // En mode mensuel : un seul jour suffit (les autres occurrences se calculent automatiquement).
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

  // ─── Calcul des jours à vérifier ──────────────────────────────
  const joursSelectionnes = dateDebut
    ? joursEntre(dateDebut, dateFin ?? dateDebut)
    : [];

  // En mode mensuel, je calcule toutes les occurrences hebdomadaires jusqu'à la fin du mois
  let joursAVerifier = joursSelectionnes;
  if (typeResa === "mensuel" && dateDebut) {
    const finDuMois = new Date(dateDebut.getFullYear(), dateDebut.getMonth() + 1, 0);
    const occurrences = [];
    const cur = new Date(dateDebut);
    while (cur <= finDuMois) {
      occurrences.push(new Date(cur));
      cur.setDate(cur.getDate() + 7);
    }
    joursAVerifier = occurrences;
  }

  const jourFerme = joursAVerifier.length > 0
    ? premierJourFerme(horaires, joursAVerifier)
    : null;
  const fenetre = joursAVerifier.length > 0
    ? fenetreCommune(horaires, joursAVerifier)
    : null;
  const creneaux = genererCreneaux(fenetre);

  // ─── Disponibilité réelle depuis le serveur ───────────────────
  // Je recharge les disponibilités à chaque changement de jours sélectionnés
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
      .then((data) => { if (!annule) setOccupees(data); })
      .catch(() => { if (!annule) setOccupees([]); })
      .finally(() => { if (!annule) setLoadingDispo(false); });
    // Si les jours changent avant la fin de la requête, j'annule le résultat précédent
    return () => { annule = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salleId, cleJours]);

  // Liste des créneaux déjà pris par une autre réservation
  const occupesSet = new Set(
    creneaux
      .filter((c) => creneauOccupe(c, joursAVerifier, occupees))
      .map((c) => c.debut),
  );
  const toutDisponible = creneaux.length > 0 && occupesSet.size === 0;

  // Sélection d'un créneau horaire.
  // 1er appui = début, 2e appui = fin. Si un créneau occupé se trouve dans la plage, on repart de zéro.
  const handleSelectSlot = (creneau) => {
    if (occupesSet.has(creneau.debut)) return;

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
      // Même créneau de départ appuyé deux fois → sélection d'1h
      setSlotFin(creneau.fin);
      return;
    }
    // Je vérifie qu'aucun créneau entre le début et la fin n'est déjà occupé
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

  // Sélectionner toute la journée d'un coup (si tout est disponible)
  const handleSelectAll = () => {
    if (!toutDisponible) return;
    setSlotDebut(creneaux[0].debut);
    setSlotFin(creneaux[creneaux.length - 1].fin);
  };

  // ─── Résumé affiché à l'écran ──────────────────────────────────
  let erreurHoraire = "";
  if (jourFerme) {
    erreurHoraire = `La salle est fermée le ${jourFrancais(jourFerme)} ${formatDateFr(jourFerme)}.`;
  }

  const periodeAffichee = !dateDebut
    ? "-- / -- / ----"
    : !dateFin || dateFin.toDateString() === dateDebut.toDateString()
      ? formatDateFr(dateDebut)
      : `${formatDateFr(dateDebut)} → ${formatDateFr(dateFin)}`;

  const horaireAffiche = slotDebut && slotFin
    ? `${slotDebut.replace(":", "h")} – ${slotFin.replace(":", "h")}`
    : "-- h -- – -- h --";

  // Le bouton "Confirmer" n'est actif que si tout est correctement renseigné
  const peutConfirmer =
    !!salleId && !!dateDebut && !jourFerme && !!fenetre &&
    !!slotDebut && !!slotFin && !loadingDispo && description.trim().length > 0;

  // ─── Envoi de la réservation ───────────────────────────────────
  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (typeResa === "mensuel") {
        // En mensuel, j'envoie une réservation séparée pour chaque occurrence hebdomadaire
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
        // En unique, une seule réservation sur la période choisie
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
      <StatusBar barStyle="light-content" backgroundColor={colors.darkRed} />

      {/* Bandeau avec le nom et le type de la salle */}
      <View style={calendrierStyles.bannerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 4, marginRight: SPACING.sm }}
        >
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={calendrierStyles.bannerType}>{salleType.toUpperCase()}</Text>
          <Text style={calendrierStyles.bannerName} numberOfLines={1}>{salleName}</Text>
        </View>
        <View style={componentStyles.bannerCircle} />
      </View>

      <ScrollView
        contentContainerStyle={commonStyles.scrollWithTop}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Choix du mode : réservation unique ou mensuelle */}
        <View style={calendrierStyles.toggle}>
          {["unique", "mensuel"].map((key) => (
            <TouchableOpacity
              key={key}
              style={[calendrierStyles.toggleBtn, typeResa === key && calendrierStyles.toggleBtnActive]}
              onPress={() => changerType(key)}
            >
              <Text style={[calendrierStyles.toggleText, typeResa === key && calendrierStyles.toggleTextActive]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Message d'explication selon le mode choisi */}
        {typeResa === "mensuel" ? (
          <View style={calendrierStyles.mensuelInfo}>
            <Ionicons name="information-circle-outline" size={16} color={colors.red} />
            <Text style={calendrierStyles.mensuelText}>
              Le créneau sera réservé chaque semaine, le même jour, jusqu'à la fin du mois.
            </Text>
          </View>
        ) : (
          <View style={calendrierStyles.mensuelInfo}>
            <Ionicons name="information-circle-outline" size={16} color={colors.red} />
            <Text style={calendrierStyles.mensuelText}>
              Touchez une date de début puis une date de fin pour réserver
              plusieurs jours d'affilée. La réservation n'est possible qu'à
              partir du {formatDateFr(minDate)}.
            </Text>
          </View>
        )}

        {/* Calendrier pour choisir les dates */}
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

        {/* Créneaux horaires — affichés seulement après avoir choisi une date */}
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
                <Text style={[
                  calendrierStyles.selectAllText,
                  !toutDisponible && calendrierStyles.selectAllTextDisabled,
                ]}>
                  Toute la journée
                </Text>
              </TouchableOpacity>
            </View>

            {/* Message si la salle est fermée ce jour, sinon grille de créneaux */}
            {erreurHoraire ? (
              <View style={componentStyles.errorBox}>
                <Ionicons name="alert-circle-outline" size={16} color={colors.red} />
                <Text style={componentStyles.errorText}>{erreurHoraire}</Text>
              </View>
            ) : loadingDispo ? (
              <Text style={calendrierStyles.emptyHint}>Vérification des disponibilités…</Text>
            ) : (
              <SlotGrid
                creneaux={creneaux}
                occupes={occupesSet}
                selectionDebut={slotDebut}
                selectionFin={slotFin}
                onSelect={handleSelectSlot}
              />
            )}
          </>
        )}

        {/* Description de la demande (obligatoire) */}
        <Text style={calendrierStyles.subTitle}>Description de la demande</Text>
        <TextInput
          style={calendrierStyles.textarea}
          placeholder="Décrivez l'utilisation prévue de la salle… (obligatoire)"
          placeholderTextColor={colors.grey}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        {/* Bouton de confirmation (grisé si les informations ne sont pas complètes) */}
        <TouchableOpacity
          style={[componentStyles.btnRow, !peutConfirmer && componentStyles.btnRowDisabled]}
          onPress={() => peutConfirmer && setShowModal(true)}
          activeOpacity={peutConfirmer ? 0.9 : 1}
        >
          <Text style={componentStyles.btnRowText}>Confirmer</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.white} />
        </TouchableOpacity>
      </ScrollView>

      <Footer />

      {/* Fenêtre de confirmation avant l'envoi */}
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
