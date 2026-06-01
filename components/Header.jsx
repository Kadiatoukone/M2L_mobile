import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";
import { navigationStyles } from "../styles/styles";

/*
 Header réutilisable pour tous les écrans.
 
 Propriété :
  - title        {string}   Titre affiché au centre (ou à gauche si titleLeft)
  - titleLeft    {boolean}  Aligne le titre à gauche (style page principale)
  - showBack     {boolean}  Affiche la flèche retour
  - onBack       {func}     Surcharge la navigation arrière
  - showSettings {boolean}  Affiche l'engrenage paramètres (défaut : true)
  - onSettings   {func}     Surcharge le clic engrenage
  - right        {node}     Composant custom à droite (remplace l'engrenage)
  - left         {node}     Composant custom à gauche (remplace le bouton back)
 */
export default function Header({
  title,
  titleLeft = false,
  showBack = false,
  onBack,
  showSettings = true,
  onSettings,
  right,
  left,
}) {
  const navigation = useNavigation();

  const handleBack = onBack ?? (() => navigation.goBack());
  const handleSettings =
    onSettings ?? (() => navigation.navigate("Parametres"));

  return (
    <View style={navigationStyles.header}>
      {/* ── Gauche ── */}
      {left ? (
        left
      ) : showBack ? (
        <TouchableOpacity onPress={handleBack} style={navigationStyles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
      ) : (
        <View style={navigationStyles.backBtn} />
      )}

      {/* ── Titre ── */}
      {title && (
        <Text
          style={
            titleLeft
              ? navigationStyles.headerTitleLeft
              : navigationStyles.headerTitle
          }
          numberOfLines={1}
        >
          {title}
        </Text>
      )}

      {/* ── Droite ── */}
      {right ? (
        right
      ) : showSettings ? (
        <TouchableOpacity
          onPress={handleSettings}
          style={navigationStyles.settingsBtn}
        >
          <Ionicons name="settings-outline" size={22} color={COLORS.text} />
        </TouchableOpacity>
      ) : (
        <View style={navigationStyles.settingsBtn} />
      )}
    </View>
  );
}
