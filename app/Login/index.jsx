import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Logo from "../../assets/Logo_M2L.svg";
import Vector from "../../assets/Vector.svg";
import { useTheme, useStyles } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { login } from "../../services/authService";

export default function Login() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { authStyles, componentStyles } = useStyles();
  const { refreshUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email.trim() || !password) {
      setError("Veuillez renseigner votre email et mot de passe.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      await refreshUser();
      navigation.replace("Accueil/index");
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Vector width="70%" height="70%" style={authStyles.background} />

      <ScrollView
        contentContainerStyle={authStyles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={authStyles.header}>
          <Logo width={100} height={100} />
          <Text style={authStyles.appName}>M2L</Text>
        </View>

        {/* Formulaire */}
        <View style={authStyles.formCard}>
          <Text style={authStyles.formTitle}>Connexion</Text>
          <Text style={authStyles.formSubtitle}>
            Bienvenue à la Maison des Ligues !
          </Text>

          {error ? (
            <View style={componentStyles.errorBox}>
              <Ionicons
                name="alert-circle-outline"
                size={16}
                color={colors.red}
              />
              <Text style={componentStyles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Email */}
          <View style={componentStyles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={18}
              color={colors.grey}
              style={componentStyles.inputIcon}
            />
            <TextInput
              style={componentStyles.input}
              placeholder="Adresse e-mail"
              placeholderTextColor={colors.grey}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Mot de passe */}
          <View style={componentStyles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={18}
              color={colors.grey}
              style={componentStyles.inputIcon}
            />
            <TextInput
              style={componentStyles.input}
              placeholder="Mot de passe"
              placeholderTextColor={colors.grey}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={18}
                color={colors.grey}
              />
            </TouchableOpacity>
          </View>

          {/* Bouton connexion */}
          <TouchableOpacity
            style={[componentStyles.btnPrimary, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={componentStyles.btnPrimaryText}>Se connecter</Text>
            )}
          </TouchableOpacity>

          {/* Lien inscription */}
          <View style={authStyles.formFooter}>
            <Text style={authStyles.formFooterText}>
              Pas encore de compte ?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register/index")}
            >
              <Text style={authStyles.formFooterLink}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
