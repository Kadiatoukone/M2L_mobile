// Page Paramètres — l'utilisateur peut activer le mode sombre
// ou se déconnecter de l'application.

import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import SettingItem from "./_components/SettingItem";
import { useTheme, useStyles } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { logout } from "../../services/authService";

export default function Parametres() {
  const navigation = useNavigation();
  const { colors, isDark, toggleTheme } = useTheme();
  const { parametresStyles, commonStyles } = useStyles();
  const { refreshUser } = useUser();

  // Déconnexion : je supprime le jeton et je reviens à l'écran de connexion
  const handleLogout = async () => {
    await logout();
    await refreshUser();
    navigation.reset({ index: 0, routes: [{ name: "LoginHome/index" }] });
  };

  return (
    <SafeAreaView style={commonStyles.safe}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.surface} />

      <Header title="Paramètres" showBack showSettings={false} />

      <View style={parametresStyles.content}>
        {/* Apparence */}
        <Text style={parametresStyles.sectionLabel}>Apparence</Text>
        <View style={parametresStyles.card}>
          <SettingItem
            icon="moon-outline"
            iconBg="#F0F0FF"
            iconColor="#5C6BC0"
            title="Mode sombre"
            subtitle="Passer en thème sombre"
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.red }}
                thumbColor={colors.white}
              />
            }
          />
        </View>

        {/* Compte */}
        <Text style={parametresStyles.sectionLabel}>Compte</Text>
        <View style={parametresStyles.card}>
          <SettingItem
            icon="notifications-outline"
            iconBg="#FFF8E1"
            iconColor="#F57F17"
            title="Notifications"
            subtitle="Rappels de réservation"
            onPress={() => {}}
          />
        </View>

        {/* À propos */}
        <Text style={parametresStyles.sectionLabel}>À propos</Text>
        <View style={parametresStyles.card}>
          <SettingItem
            icon="information-circle-outline"
            iconBg="#E8F5E9"
            iconColor="#388E3C"
            title="Version de l'application"
            subtitle="1.0.0"
          />
        </View>

        {/* Bouton de déconnexion */}
        <TouchableOpacity
          style={parametresStyles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.9}
        >
          <Text style={parametresStyles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
