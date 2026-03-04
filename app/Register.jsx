import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [memberNumber, setMemberNumber] = useState("");

  const handleSubmit = () => {
    console.log("Inscription envoyée");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      {/* Le contenu pour les informations de l'inscription */}
      <View style={styles.card}>
        <Image
          source={require("../assets/Logo_M2L.svg")}
          style={{ width: 70, height: 70 }}
        />

        <Text style={styles.title}>M2L</Text>
        <Text style={styles.subtitle}>Bienvenue à la Maison Des Ligues !</Text>

        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={lastname}
          onChangeText={setLastname}
        />

        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={firstname}
          onChangeText={setFirstname}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Numéro d'adhérent"
          value={memberNumber}
          onChangeText={setMemberNumber}
        />
        {/* bouton pour s'inscrire */}
        <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
          <Text style={styles.registerText}>S’inscrire</Text>
        </TouchableOpacity>

        {/* séparateur */}
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>ou</Text>
          <View style={styles.line} />
        </View>

        {/* bouton pour se connecter avec google */}
        <TouchableOpacity style={styles.googleBtn}>
          <Image
            source={require("./assets/google-icon.svg")}
            style={{ width: 18, height: 18 }}
          />
          <Text style={styles.googleText}>S’inscrire avec Google</Text>
        </TouchableOpacity>

        {/* pour la connexion avec la page login */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfb",
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 15,
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 50,
    color: "#444",
  },
  input: {
    backgroundColor: "#f4f4f4",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 14,
  },
  registerBtn: {
    backgroundColor: "#c62828",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#131212",
  },
  orText: {
    marginHorizontal: 10,
    color: "#777",
  },
  googleBtn: {
    flexDirection: "row",
    backgroundColor: "#0d1b2a",
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  googleIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  googleText: {
    color: "#fff",
    fontWeight: "500",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "center",
  },
  loginLink: {
    fontWeight: "bold",
    color: "#918e8e",
  },
});
