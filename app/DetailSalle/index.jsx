// Page de détail d'une salle.
// Elle affiche la photo, les informations, les horaires, les disponibilités
// et les avis. Un bouton permet de lancer la réservation.

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/Footer";
import { API_URL } from "../../constants/api";
import { SPACING } from "../../constants/theme";
import { useTheme, useStyles } from "../../context/ThemeContext";
import DisponibilitesPreview from "./_components/DisponibilitesPreview";
import HorairesList from "./_components/HorairesList";
import InfoRow from "./_components/InfoRow";
import SalleAvis from "./_components/SalleAvis";

export default function DetailSalle() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { commonStyles, componentStyles, detailSalleStyles } = useStyles();
  const route = useRoute();
  const { salle = {}, category = "Sport" } = route.params ?? {};

  // Données de la salle reçues depuis la page précédente
  const {
    id = null,
    nom = "Salle",
    adresse = "",
    ville = "",
    capacite = "",
    description = "",
    photo = null,
    typeSalle = null,
    horaires = [],
  } = salle;

  // Construction de l'URL complète de la photo
  const photoUrl = photo ? `${API_URL}${photo}` : null;

  // Icône et libellé selon le type de salle (sport ou événement)
  const isSport = typeSalle?.categorie === "sport";
  const typeIcon = isSport ? "barbell" : "business";
  const typeLabel = typeSalle?.libelle ?? category;

  return (
    <SafeAreaView style={commonStyles.safeGrey}>
      <StatusBar barStyle="light-content" backgroundColor={colors.darkRed} />

      {/* Bandeau rouge en haut avec le nom de la salle */}
      <View style={componentStyles.banner}>
        <TouchableOpacity
          style={detailSalleStyles.bannerBack}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <View style={detailSalleStyles.categoryBadge}>
          <Text style={detailSalleStyles.categoryBadgeText}>
            {category.toUpperCase()}
          </Text>
        </View>
        <Text style={detailSalleStyles.bannerTitle} numberOfLines={2}>
          {nom}
        </Text>
        <View style={componentStyles.bannerCircle} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: SPACING.lg, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Photo de la salle (ou message si aucune photo) */}
        {photoUrl ? (
          <Image
            source={{ uri: photoUrl }}
            style={detailSalleStyles.photo}
            resizeMode="cover"
          />
        ) : (
          <View style={detailSalleStyles.photoPlaceholder}>
            <Ionicons name="image-outline" size={32} color={colors.grey} />
            <Text style={detailSalleStyles.photoPlaceholderText}>
              Aucune photo disponible
            </Text>
          </View>
        )}

        {/* Informations principales */}
        <View style={detailSalleStyles.infoCard}>
          {adresse ? (
            <InfoRow icon="location" text={[adresse, ville].filter(Boolean).join(", ")} />
          ) : null}
          {capacite ? (
            <InfoRow icon="people" text={`Capacité : ${capacite} personnes`} />
          ) : null}
          <InfoRow icon={typeIcon} text={typeLabel} />
        </View>

        {/* Description */}
        <View style={detailSalleStyles.section}>
          <Text style={detailSalleStyles.sectionTitle}>Description</Text>
          {description ? (
            <Text style={detailSalleStyles.description}>{description}</Text>
          ) : (
            <Text style={detailSalleStyles.emptyHint}>Aucune description renseignée.</Text>
          )}
        </View>

        {/* Horaires d'ouverture */}
        <View style={detailSalleStyles.section}>
          <Text style={detailSalleStyles.sectionTitle}>Horaires d'ouverture</Text>
          <HorairesList horaires={horaires} />
        </View>

        {/* Aperçu des créneaux déjà réservés */}
        <View style={detailSalleStyles.section}>
          <Text style={detailSalleStyles.sectionTitle}>Disponibilités</Text>
          <DisponibilitesPreview salleId={id} horaires={horaires} />
        </View>

        {/* Avis des adhérents */}
        <View style={detailSalleStyles.section}>
          <Text style={detailSalleStyles.sectionTitle}>Avis adhérents</Text>
          <SalleAvis />
        </View>

        {/* Bouton pour lancer la réservation */}
        <TouchableOpacity
          style={[componentStyles.btnRow, { marginTop: SPACING.xl }]}
          onPress={() =>
            navigation.navigate("Calendrier/index", {
              salleId: id,
              salleName: nom,
              salleType: category,
              horaires,
            })
          }
          activeOpacity={0.9}
        >
          <Ionicons name="calendar-outline" size={20} color={colors.white} />
          <Text style={componentStyles.btnRowText}>Réserver cette salle</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}
