import { useNavigation } from "@react-navigation/native";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import Logo from "../../assets/Logo_M2L.svg";
import Vector from "../../assets/Vector.svg";
import { COLORS, SPACING } from "../../constants/theme";
import { authStyles, componentStyles } from "../../styles/styles";

export default function LoginHome() {
  const navigation = useNavigation();

  return (
    <View style={authStyles.homeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Vector width="70%" height="70%" style={authStyles.background} />

      {/* Contenu Principal */}
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
                backgroundColor: COLORS.red,
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

      {/* Boutons */}
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
