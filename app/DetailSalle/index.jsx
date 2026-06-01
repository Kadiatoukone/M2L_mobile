import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";
import InfoRow from "./_components/InfoRow";
import CreneauxGrid from "./_components/CreneauxGrid";
import { detailSalleStyles, componentStyles, commonStyles } from "../../styles/styles";
import { COLORS, SPACING } from "../../constants/theme";

export default function DetailSalle() {
  const navigation = useNavigation();
  const route = useRoute();
  const { salle = {}, category = "Sport" } = route.params ?? {};

  const { nom = "Salle Omnisports", adresse = "12 rue de la Liberté, Nancy", note = 4.8, capacite = 80 } = salle;
  const stars = Math.round(note);

  return (
    <SafeAreaView style={commonStyles.safeGrey}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkRed} />

      {/* Bandeau coloré */}
      <View style={componentStyles.banner}>
        <TouchableOpacity style={detailSalleStyles.bannerBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <View style={detailSalleStyles.categoryBadge}>
          <Text style={detailSalleStyles.categoryBadgeText}>{category.toUpperCase()}</Text>
        </View>
        <Text style={detailSalleStyles.bannerTitle} numberOfLines={2}>{nom}</Text>
        <View style={componentStyles.bannerCircle} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: SPACING.lg, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Carte infos (overlap sur le bandeau) */}
        <View style={detailSalleStyles.infoCard}>
          {/* Note */}
          <View style={detailSalleStyles.ratingRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Ionicons key={i} name={i < stars ? "star" : "star-outline"} size={16} color={i < stars ? "#FFC107" : COLORS.border} />
            ))}
            <Text style={detailSalleStyles.ratingValue}>{note.toFixed(1)}</Text>
            <Text style={detailSalleStyles.ratingCount}>(avis adhérents)</Text>
          </View>

          <InfoRow icon="location"  text={adresse} />
          <InfoRow icon="people"    text={`Capacité : ${capacite} personnes`} />
          <InfoRow icon="pricetag"  text={`Catégorie : ${category}`} />
        </View>

        {/* Description */}
        <View style={detailSalleStyles.section}>
          <Text style={detailSalleStyles.sectionTitle}>Description</Text>
          <Text style={detailSalleStyles.description}>
            Salle polyvalente idéale pour la pratique sportive et les activités
            associatives. Équipée de vestiaires, douches et d'un parquet de qualité.
            La salle est accessible aux personnes à mobilité réduite.
          </Text>
        </View>

        {/* Créneaux */}
        <View style={detailSalleStyles.section}>
          <Text style={detailSalleStyles.sectionTitle}>Créneaux disponibles</Text>
          <CreneauxGrid />
        </View>

        {/* Bouton réserver */}
        <TouchableOpacity
          style={[componentStyles.btnRow, { marginTop: SPACING.xl }]}
          onPress={() => navigation.navigate("Calendrier", { salleName: nom, salleType: category })}
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
