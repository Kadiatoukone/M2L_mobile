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
import { COLORS, SPACING } from "../../constants/theme";
import {
  commonStyles,
  componentStyles,
  detailSalleStyles,
} from "../../styles/styles";
import DisponibilitesPreview from "./_components/DisponibilitesPreview";
import HorairesList from "./_components/HorairesList";
import InfoRow from "./_components/InfoRow";
import SalleAvis from "./_components/SalleAvis";

export default function DetailSalle() {
  const navigation = useNavigation();
  const route = useRoute();
  const { salle = {}, category = "Sport" } = route.params ?? {};

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

  const photoUrl = photo ? `${API_URL}${photo}` : null;

  // Affichage personnalisé du type de salle (même principe que l'appli web) :
  // une altère pour le sport, un bâtiment pour un événement.
  const isSport = typeSalle?.categorie === "sport";
  const typeIcon = isSport ? "barbell" : "business";
  const typeLabel = typeSalle?.libelle ?? category;

  return (
    <SafeAreaView style={commonStyles.safeGrey}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkRed} />

      {/* Bandeau coloré */}
      <View style={componentStyles.banner}>
        <TouchableOpacity
          style={detailSalleStyles.bannerBack}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
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
        contentContainerStyle={{
          paddingHorizontal: SPACING.lg,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Photo de la salle */}
        {photoUrl ? (
          <Image
            source={{ uri: photoUrl }}
            style={detailSalleStyles.photo}
            resizeMode="cover"
          />
        ) : (
          <View style={detailSalleStyles.photoPlaceholder}>
            <Ionicons name="image-outline" size={32} color={COLORS.grey} />
            <Text style={detailSalleStyles.photoPlaceholderText}>
              Aucune photo disponible
            </Text>
          </View>
        )}

        {/* Carte infos */}
        <View style={detailSalleStyles.infoCard}>
          {adresse ? (
            <InfoRow
              icon="location"
              text={[adresse, ville].filter(Boolean).join(", ")}
            />
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
            <Text style={detailSalleStyles.emptyHint}>
              Aucune description renseignée.
            </Text>
          )}
        </View>

        {/* Horaires d'ouverture (données réelles de la BDD) */}
        <View style={detailSalleStyles.section}>
          <Text style={detailSalleStyles.sectionTitle}>
            Horaires d'ouverture
          </Text>
          <HorairesList horaires={horaires} />
        </View>

        {/* Disponibilités (créneaux déjà réservés, lecture seule) */}
        <View style={detailSalleStyles.section}>
          <Text style={detailSalleStyles.sectionTitle}>Disponibilités</Text>
          <DisponibilitesPreview salleId={id} horaires={horaires} />
        </View>

        {/* Avis adhérents */}
        <View style={detailSalleStyles.section}>
          <Text style={detailSalleStyles.sectionTitle}>Avis adhérents</Text>
          <SalleAvis />
        </View>

        {/* Bouton réserver */}
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
          <Ionicons name="calendar-outline" size={20} color={COLORS.white} />
          <Text style={componentStyles.btnRowText}>Réserver cette salle</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}
