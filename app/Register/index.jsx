// Page d'inscription.
// L'utilisateur remplit ses informations pour créer un compte adhérent.
// La ligue est choisie dans une liste déroulante reliée à la base de données.
// Une fois le compte créé, une fenêtre de succès s'affiche et redirige vers la connexion.

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../assets/Logo_M2L.svg";
import Vector from "../../assets/Vector.svg";
import { useTheme, useStyles } from "../../context/ThemeContext";
import SuccessModal from "./_components/SuccessModal";
import { register } from "../../services/authService";
import { getLigues } from "../../services/apiService";

export default function Register() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { authStyles, componentStyles } = useStyles();

  // ─── Champs du formulaire ─────────────────────────────────────
  const [nom, setNom]                         = useState("");
  const [prenom, setPrenom]                   = useState("");
  const [email, setEmail]                     = useState("");
  const [numeroAdherent, setNumeroAdherent]   = useState("");
  const [ligueId, setLigueId]                 = useState(null);
  const [poste, setPoste]                     = useState("");
  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);

  // ─── Liste des ligues (chargée depuis la BDD) ─────────────────
  const [ligues, setLigues]             = useState([]);
  const [showLigueModal, setShowLigueModal] = useState(false);

  useEffect(() => {
    getLigues().then(setLigues).catch(() => {});
  }, []);

  const ligueSelectionnee = ligues.find((l) => l.id === ligueId);

  // ─── État de la page ──────────────────────────────────────────
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const handleRegister = async () => {
    setError("");

    // Vérification que tous les champs sont remplis
    if (!nom || !prenom || !email || !numeroAdherent || !ligueId || !poste || !password || !confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    // Envoi du formulaire au serveur
    setLoading(true);
    try {
      await register({
        nom,
        prenom,
        email: email.trim(),
        numero_adherent: numeroAdherent.trim(),
        ligue: ligueId,
        poste,
        password,
      });
      setSuccessModal(true);
    } catch (e) {
      setError(e.message);
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
      <Vector width="65%" height="65%" style={authStyles.background} />

      <ScrollView
        contentContainerStyle={authStyles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={authStyles.headerCompact}>
          <Logo width={56} height={56} />
          <Text style={authStyles.appName}>M2L</Text>
        </View>

        {/* Formulaire d'inscription */}
        <View style={authStyles.formCard}>
          <Text style={authStyles.formTitle}>Inscription</Text>
          <Text style={authStyles.formSubtitle}>Créez votre compte adhérent</Text>

          {/* Message d'erreur */}
          {error ? (
            <View style={componentStyles.errorBox}>
              <Ionicons name="alert-circle-outline" size={16} color={colors.red} />
              <Text style={componentStyles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Nom */}
          <View style={componentStyles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color={colors.grey} style={componentStyles.inputIcon} />
            <TextInput style={componentStyles.input} placeholder="Nom" placeholderTextColor={colors.grey} value={nom} onChangeText={setNom} />
          </View>

          {/* Prénom */}
          <View style={componentStyles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color={colors.grey} style={componentStyles.inputIcon} />
            <TextInput style={componentStyles.input} placeholder="Prénom" placeholderTextColor={colors.grey} value={prenom} onChangeText={setPrenom} />
          </View>

          {/* Email */}
          <View style={componentStyles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color={colors.grey} style={componentStyles.inputIcon} />
            <TextInput style={componentStyles.input} placeholder="Adresse e-mail" placeholderTextColor={colors.grey} keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
          </View>

          {/* Numéro adhérent */}
          <View style={componentStyles.inputWrapper}>
            <Ionicons name="card-outline" size={18} color={colors.grey} style={componentStyles.inputIcon} />
            <TextInput style={componentStyles.input} placeholder="Numéro d'adhérent" placeholderTextColor={colors.grey} value={numeroAdherent} onChangeText={setNumeroAdherent} autoCapitalize="characters" />
          </View>

          {/* Ligue — liste déroulante reliée à la base de données */}
          <TouchableOpacity style={componentStyles.selectBox} onPress={() => setShowLigueModal(true)}>
            <View style={componentStyles.selectBoxLeft}>
              <Ionicons name="shield-outline" size={18} color={colors.grey} style={componentStyles.inputIcon} />
              <Text
                style={[componentStyles.selectBoxText, !ligueSelectionnee && componentStyles.selectBoxPlaceholder]}
                numberOfLines={1}
              >
                {ligueSelectionnee ? ligueSelectionnee.nom : "Choisir une ligue"}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={colors.grey} />
          </TouchableOpacity>

          {/* Poste */}
          <View style={componentStyles.inputWrapper}>
            <Ionicons name="briefcase-outline" size={18} color={colors.grey} style={componentStyles.inputIcon} />
            <TextInput style={componentStyles.input} placeholder="Poste dans la ligue" placeholderTextColor={colors.grey} value={poste} onChangeText={setPoste} />
          </View>

          {/* Mot de passe */}
          <View style={componentStyles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.grey} style={componentStyles.inputIcon} />
            <TextInput style={componentStyles.input} placeholder="Mot de passe" placeholderTextColor={colors.grey} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color={colors.grey} />
            </TouchableOpacity>
          </View>

          {/* Confirmation mot de passe */}
          <View style={componentStyles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.grey} style={componentStyles.inputIcon} />
            <TextInput style={componentStyles.input} placeholder="Confirmer le mot de passe" placeholderTextColor={colors.grey} secureTextEntry={!showConfirm} value={confirmPassword} onChangeText={setConfirmPassword} />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons name={showConfirm ? "eye-off-outline" : "eye-outline"} size={18} color={colors.grey} />
            </TouchableOpacity>
          </View>

          {/* Bouton créer le compte */}
          <TouchableOpacity
            style={[componentStyles.btnPrimary, loading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color={colors.white} />
              : <Text style={componentStyles.btnPrimaryText}>Créer mon compte</Text>
            }
          </TouchableOpacity>

          {/* Lien vers la connexion */}
          <View style={authStyles.formFooter}>
            <Text style={authStyles.formFooterText}>Déjà un compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login/index")}>
              <Text style={authStyles.formFooterLink}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Liste déroulante des ligues */}
      <Modal visible={showLigueModal} transparent animationType="fade" onRequestClose={() => setShowLigueModal(false)}>
        <Pressable style={componentStyles.overlay} onPress={() => setShowLigueModal(false)}>
          <View style={componentStyles.selectModalCard}>
            <Text style={componentStyles.modalTitle}>Choisir une ligue</Text>
            <ScrollView>
              {ligues.map((l, i) => (
                <View key={l.id}>
                  <TouchableOpacity
                    style={componentStyles.selectOption}
                    onPress={() => {
                      setLigueId(l.id);
                      setShowLigueModal(false);
                    }}
                  >
                    <Text
                      style={[
                        componentStyles.selectOptionText,
                        l.id === ligueId && componentStyles.selectOptionTextSelected,
                      ]}
                    >
                      {l.nom}
                    </Text>
                  </TouchableOpacity>
                  {i < ligues.length - 1 && <View style={componentStyles.selectOptionSep} />}
                </View>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* Fenêtre de succès après inscription */}
      <SuccessModal
        visible={successModal}
        onClose={() => {
          setSuccessModal(false);
          navigation.navigate("Login/index");
        }}
      />
    </KeyboardAvoidingView>
  );
}
