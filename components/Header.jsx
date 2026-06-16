import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useTheme, useStyles } from "../context/ThemeContext";

/*
 Header réutilisable pour tous les écrans.

 Propriété :
  - title        {string}   Titre affiché au centre (ou à gauche si titleLeft)
  - titleLeft    {boolean}  Aligne le titre à gauche (style page principale)
  - showBack     {boolean}  Affiche la flèche retour
  - onBack       {func}     Surcharge la navigation arrière
  - showSettings {boolean}  Affiche l'engrenage paramètres (défaut : true)
  - onSettings   {func}     Surcharge le clic engrenage (sinon ouvre le menu Mon profil / Paramètres)
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
  const { colors } = useTheme();
  const { navigationStyles } = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBack = onBack ?? (() => navigation.goBack());
  const handleSettings = onSettings ?? (() => setMenuOpen(true));

  const goTo = (route) => {
    setMenuOpen(false);
    navigation.navigate(route);
  };

  return (
    <View style={navigationStyles.header}>
      {/* ── Gauche ── */}
      {left ? (
        left
      ) : showBack ? (
        <TouchableOpacity onPress={handleBack} style={navigationStyles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
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
          <Ionicons name="settings-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={navigationStyles.settingsBtn} />
      )}

      {/* ── Menu déroulant (engrenage) ── */}
      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <Pressable style={navigationStyles.settingsMenuOverlay} onPress={() => setMenuOpen(false)}>
          <View style={navigationStyles.settingsMenu}>
            <TouchableOpacity style={navigationStyles.settingsMenuItem} onPress={() => goTo("Profil/index")}>
              <Ionicons name="person-outline" size={18} color={colors.text} />
              <Text style={navigationStyles.settingsMenuText}>Mon profil</Text>
            </TouchableOpacity>
            <View style={navigationStyles.settingsMenuSep} />
            <TouchableOpacity style={navigationStyles.settingsMenuItem} onPress={() => goTo("Parametres/index")}>
              <Ionicons name="settings-outline" size={18} color={colors.text} />
              <Text style={navigationStyles.settingsMenuText}>Paramètres</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
