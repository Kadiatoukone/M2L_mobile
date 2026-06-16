// Premier écran affiché quand on ouvre l'application.
// L'utilisateur peut se connecter ou créer un compte.

import { useNavigation } from "@react-navigation/native";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import Logo from "../../assets/Logo_M2L.svg";
import Vector from "../../assets/Vector.svg";
import { SPACING } from "../../constants/theme";
import { useTheme, useStyles } from "../../context/ThemeContext";

export default function LoginHome() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const { authStyles, componentStyles } = useStyles();

  return (
    <View style={authStyles.homeContainer}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.surface} />

      {/* Forme décorative en arrière-plan */}
      <Vector width="70%" height="70%" style={authStyles.background} />

      {/* Logo et titre */}
      <View style={authStyles.homeContent}>
        <Logo width={120} height={120} />
        <Text style={authStyles.homeTitle}>M2L</Text>
        <Text style={authStyles.homeSubtitle}>Maison des Ligues</Text>
        <View style={[authStyles.homeContent, { flex: 0 }]}>
          <View
            style={
              componentStyles.redDivider ?? {
                width: 48,
                height: 3,
                backgroundColor: colors.red,
                borderRadius: 2,
                marginVertical: SPACING.lg,
              }
            }
          />
        </View>
        <Text style={authStyles.homeTagline}>
          Réservez vos salles{"\n"}en toute simplicité
        </Text>
      </View>

      {/* Boutons de navigation */}
      <View style={authStyles.homeActions}>
        <TouchableOpacity
          style={componentStyles.btnPrimary}
          onPress={() => navigation.navigate("Login/index")}
        >
          <Text style={componentStyles.btnPrimaryText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={componentStyles.btnSecondary}
          onPress={() => navigation.navigate("Register/index")}
        >
          <Text style={componentStyles.btnSecondaryText}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
