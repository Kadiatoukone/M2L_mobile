import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SettingItem from "./_components/SettingItem";
import { parametresStyles, commonStyles } from "../../styles/styles";
import { COLORS } from "../../constants/theme";
import { logout } from "../../services/authService";

export default function Parametres() {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: "LoginHome" }] });
  };

  return (
    <SafeAreaView style={commonStyles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

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
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: COLORS.border, true: COLORS.red }}
                thumbColor={COLORS.white}
              />
            }
          />
        </View>

        {/* Compte */}
        <Text style={parametresStyles.sectionLabel}>Compte</Text>
        <View style={parametresStyles.card}>
          <SettingItem
            icon="shield-checkmark-outline"
            iconBg="#FFF0F0"
            iconColor={COLORS.red}
            title="Confidentialité"
            subtitle="Gérer vos données personnelles"
            onPress={() => {}}
            showSep
          />
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

        {/* Déconnexion */}
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
