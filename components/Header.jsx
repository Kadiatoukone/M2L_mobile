// En-tête réutilisable affiché en haut de chaque page.
// Le bouton engrenage ouvre un petit menu avec "Mon profil" et "Paramètres".

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useTheme, useStyles } from "../context/ThemeContext";

/*
 Props disponibles :
  - title        Titre affiché au centre (ou à gauche si titleLeft est activé)
  - titleLeft    Si vrai, le titre est aligné à gauche
  - showBack     Affiche la flèche retour
  - onBack       Remplace la navigation arrière par défaut
  - showSettings Affiche l'icône engrenage (activé par défaut)
  - onSettings   Remplace l'action de l'engrenage par défaut
  - right        Composant personnalisé à droite (remplace l'engrenage)
  - left         Composant personnalisé à gauche (remplace le retour)
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

  // Contrôle l'ouverture/fermeture du menu déroulant
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBack = onBack ?? (() => navigation.goBack());
  const handleSettings = onSettings ?? (() => setMenuOpen(true));

  // Ferme le menu et navigue vers la page choisie
  const goTo = (route) => {
    setMenuOpen(false);
    navigation.navigate(route);
  };

  return (
    <View style={navigationStyles.header}>
      {/* Gauche : composant custom, flèche retour, ou espace vide */}
      {left ? (
        left
      ) : showBack ? (
        <TouchableOpacity onPress={handleBack} style={navigationStyles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={navigationStyles.backBtn} />
      )}

      {/* Titre */}
      {title && (
        <Text
          style={titleLeft ? navigationStyles.headerTitleLeft : navigationStyles.headerTitle}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}

      {/* Droite : composant custom, engrenage, ou espace vide */}
      {right ? (
        right
      ) : showSettings ? (
        <TouchableOpacity onPress={handleSettings} style={navigationStyles.settingsBtn}>
          <Ionicons name="settings-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={navigationStyles.settingsBtn} />
      )}

      {/* Menu déroulant qui s'ouvre quand on appuie sur l'engrenage */}
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
