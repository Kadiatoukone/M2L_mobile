import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";
import CalendarGrid from "./_components/CalendarGrid";
import CreneauPicker from "./_components/CreneauPicker";
import ConfirmationModal from "./_components/ConfirmationModal";
import { calendrierStyles, componentStyles, commonStyles } from "../../styles/styles";
import { COLORS, SPACING } from "../../constants/theme";
import { creerReservation } from "../../services/apiService";

export default function Calendrier() {
  const navigation = useNavigation();
  const route = useRoute();
  const { salleName = "Salle", salleType = "Sport" } = route.params ?? {};

  const today = new Date();
  const [annee, setAnnee]               = useState(today.getFullYear());
  const [mois, setMois]                 = useState(today.getMonth());
  const [jourSel, setJourSel]           = useState(today.getDate());
  const [creneauSel, setCreneauSel]     = useState(null);
  const [typeResa, setTypeResa]         = useState("unique");
  const [description, setDescription]   = useState("");
  const [showModal, setShowModal]       = useState(false);
  const [loading, setLoading]           = useState(false);

  const moisPrec = () => {
    if (mois === 0) { setMois(11); setAnnee((a) => a - 1); }
    else setMois((m) => m - 1);
    setJourSel(null);
  };
  const moisSuiv = () => {
    if (mois === 11) { setMois(0); setAnnee((a) => a + 1); }
    else setMois((m) => m + 1);
    setJourSel(null);
  };

  const dateFormatee = jourSel
    ? `${String(jourSel).padStart(2, "0")}/${String(mois + 1).padStart(2, "0")}/${annee}`
    : "-- / -- / ----";

  const peutConfirmer = jourSel && creneauSel;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Formatage de la date : JJ/MM/AAAA → AAAA-MM-JJ
      const [jour, moisStr, anneeStr] = dateFormatee.split("/");
      const dateISO = `${anneeStr}-${moisStr}-${jour}`;

      // Formatage du créneau : "09:00 – 10:30" → heureDebut / heureFin
      const [heureDebut, heureFin] = creneauSel.split(" \u2013 ");

      await creerReservation({
        dateDebut:  dateISO,
        dateFin:    dateISO,
        heureDebut: heureDebut.trim(),
        heureFin:   heureFin.trim(),
        motif:      description.trim() || salleName,
      });

      setShowModal(false);
      navigation.navigate("Reservation");
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4, marginRight: SPACING.sm }}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
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
        <View style={calendrierStyles.toggle}>
          {["unique", "mensuel"].map((key) => (
            <TouchableOpacity
              key={key}
              style={[calendrierStyles.toggleBtn, typeResa === key && calendrierStyles.toggleBtnActive]}
              onPress={() => setTypeResa(key)}
            >
              <Text style={[calendrierStyles.toggleText, typeResa === key && calendrierStyles.toggleTextActive]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {typeResa === "mensuel" && (
          <View style={calendrierStyles.mensuelInfo}>
            <Ionicons name="information-circle-outline" size={16} color={COLORS.red} />
            <Text style={calendrierStyles.mensuelText}>
              Le créneau sera réservé chaque semaine sur le mois complet, si aucune réservation n'existe déjà.
            </Text>
          </View>
        )}

        <CalendarGrid
          annee={annee}
          mois={mois}
          jourSel={jourSel}
          onPrev={moisPrec}
          onNext={moisSuiv}
          onSelect={setJourSel}
        />

        <CreneauPicker selected={creneauSel} onSelect={setCreneauSel} />

        <Text style={calendrierStyles.subTitle}>Description de la demande</Text>
        <TextInput
          style={calendrierStyles.textarea}
          placeholder="Décrivez l'utilisation prévue de la salle…"
          placeholderTextColor={COLORS.grey}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[componentStyles.btnRow, !peutConfirmer && componentStyles.btnRowDisabled]}
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
        dateFormatee={dateFormatee}
        creneau={creneauSel}
        typeResa={typeResa}
        description={description}
        loading={loading}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </SafeAreaView>
  );
}
