import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../constants/theme";
import { getToken } from "../services/authService";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          // L'utilisateur est connecté
          navigation.replace("Accueil/index");
        } else {
          // L'utilisateur n'est pas connecté
          navigation.replace("LoginHome/index");
        }
      } catch (error) {
        // En cas d'erreur, afficher la page de login
        navigation.replace("LoginHome/index");
      }
    };

    checkAuth();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background }}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}
