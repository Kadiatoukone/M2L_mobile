import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { useTheme, useStyles } from "../../context/ThemeContext";
import { getMe, updateMe, changerMotDePasse } from "../../services/apiService";

export default function Profil() {
  const { colors, isDark } = useTheme();
  const { profilStyles, componentStyles, commonStyles } = useStyles();
  const [adherent, setAdherent] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  const [nom, setNom]       = useState("");
  const [prenom, setPrenom] = useState("");
  const [ligue, setLigue]   = useState("");
  const [poste, setPoste]   = useState("");
  const [saving, setSaving] = useState(false);
  const [saveOk, setSaveOk] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [ancien, setAncien]         = useState("");
  const [nouveau, setNouveau]       = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [savingPwd, setSavingPwd]   = useState(false);
  const [pwdOk, setPwdOk]           = useState(false);
  const [pwdError, setPwdError]     = useState("");

  const fetchProfil = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMe();
      setAdherent(data);
      setNom(data.nom ?? "");
      setPrenom(data.prenom ?? "");
      setLigue(data.ligue ?? "");
      setPoste(data.poste ?? "");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfil(); }, [fetchProfil]);

  const handleSaveProfil = async () => {
    setSaveOk(false);
    setSaveError("");
    setSaving(true);
    try {
      const res = await updateMe({ nom: nom.trim(), prenom: prenom.trim(), ligue: ligue.trim(), poste: poste.trim() });
      setAdherent(res.adherent);
      setSaveOk(true);
    } catch (e) {
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSavePassword = async () => {
    setPwdOk(false);
    setPwdError("");

    if (!ancien || !nouveau || !confirmation) {
      setPwdError("Tous les champs sont obligatoires.");
      return;
    }
    if (nouveau !== confirmation) {
      setPwdError("Les mots de passe ne correspondent pas.");
      return;
    }

    setSavingPwd(true);
    try {
      await changerMotDePasse(ancien, nouveau);
      setPwdOk(true);
      setAncien("");
      setNouveau("");
      setConfirmation("");
    } catch (e) {
      setPwdError(e.message);
    } finally {
      setSavingPwd(false);
    }
  };

  const initiales = `${(prenom || "?").charAt(0)}${(nom || "").charAt(0)}`.toUpperCase();

  return (
    <SafeAreaView style={commonStyles.safe}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.surface} />

      <Header title="Mon profil" showBack showSettings={false} />

      {loading ? (
        <View style={commonStyles.emptyState}>
          <ActivityIndicator size="large" color={colors.red} />
        </View>
      ) : error ? (
        <View style={commonStyles.emptyState}>
          <Ionicons name="wifi-outline" size={48} color={colors.border} />
          <Text style={commonStyles.emptyTitle}>Impossible de charger</Text>
          <Text style={commonStyles.emptySub}>{error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={commonStyles.scroll} showsVerticalScrollIndicator={false}>
          <View style={profilStyles.header}>
            <View style={profilStyles.avatarLarge}>
              <Text style={profilStyles.avatarLargeText}>{initiales}</Text>
            </View>
            <Text style={profilStyles.nom}>{prenom} {nom}</Text>
            <Text style={profilStyles.email}>{adherent?.email}</Text>
          </View>

          {/* Infos non modifiables */}
          <View style={profilStyles.readonlyField}>
            <Text style={profilStyles.readonlyLabel}>Numéro d'adhérent</Text>
            <Text style={profilStyles.readonlyValue}>{adherent?.numero_adherent}</Text>
          </View>

          {/* Informations modifiables */}
          <Text style={profilStyles.fieldLabel}>Prénom</Text>
          <View style={componentStyles.inputWrapper}>
            <TextInput style={componentStyles.input} value={prenom} onChangeText={setPrenom} />
          </View>

          <Text style={profilStyles.fieldLabel}>Nom</Text>
          <View style={componentStyles.inputWrapper}>
            <TextInput style={componentStyles.input} value={nom} onChangeText={setNom} />
          </View>

          <Text style={profilStyles.fieldLabel}>Ligue</Text>
          <View style={componentStyles.inputWrapper}>
            <TextInput style={componentStyles.input} value={ligue} onChangeText={setLigue} />
          </View>

          <Text style={profilStyles.fieldLabel}>Poste dans la ligue</Text>
          <View style={componentStyles.inputWrapper}>
            <TextInput style={componentStyles.input} value={poste} onChangeText={setPoste} />
          </View>

          {saveOk ? (
            <View style={profilStyles.successBox}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#2E7D32" />
              <Text style={profilStyles.successText}>Profil mis à jour.</Text>
            </View>
          ) : saveError ? (
            <View style={componentStyles.errorBox}>
              <Ionicons name="alert-circle-outline" size={16} color={colors.red} />
              <Text style={componentStyles.errorText}>{saveError}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[componentStyles.btnPrimary, saving && { opacity: 0.7 }]}
            onPress={handleSaveProfil}
            disabled={saving}
          >
            {saving ? <ActivityIndicator color={colors.white} /> : <Text style={componentStyles.btnPrimaryText}>Enregistrer</Text>}
          </TouchableOpacity>

          {/* Changement de mot de passe */}
          <Text style={[profilStyles.fieldLabel, { marginTop: 28, fontSize: 15, fontWeight: "800", color: colors.text }]}>
            Changer le mot de passe
          </Text>

          <Text style={profilStyles.fieldLabel}>Mot de passe actuel</Text>
          <View style={componentStyles.inputWrapper}>
            <TextInput style={componentStyles.input} value={ancien} onChangeText={setAncien} secureTextEntry />
          </View>

          <Text style={profilStyles.fieldLabel}>Nouveau mot de passe</Text>
          <View style={componentStyles.inputWrapper}>
            <TextInput style={componentStyles.input} value={nouveau} onChangeText={setNouveau} secureTextEntry />
          </View>

          <Text style={profilStyles.fieldLabel}>Confirmation</Text>
          <View style={componentStyles.inputWrapper}>
            <TextInput style={componentStyles.input} value={confirmation} onChangeText={setConfirmation} secureTextEntry />
          </View>

          {pwdOk ? (
            <View style={profilStyles.successBox}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#2E7D32" />
              <Text style={profilStyles.successText}>Mot de passe modifié.</Text>
            </View>
          ) : pwdError ? (
            <View style={componentStyles.errorBox}>
              <Ionicons name="alert-circle-outline" size={16} color={colors.red} />
              <Text style={componentStyles.errorText}>{pwdError}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[componentStyles.btnSecondary, savingPwd && { opacity: 0.7 }]}
            onPress={handleSavePassword}
            disabled={savingPwd}
          >
            {savingPwd ? <ActivityIndicator color={colors.red} /> : <Text style={componentStyles.btnSecondaryText}>Modifier le mot de passe</Text>}
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
