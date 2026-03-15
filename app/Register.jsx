// Import du hook useState pour gérer les données du formulaire
import { useState } from "react";

// Import du système de navigation entre les écrans
import { useNavigation } from "@react-navigation/native";

// Import des composants nécessaires de React Native
import {
  KeyboardAvoidingView, // Permet d'éviter que le clavier cache les champs
  Platform, // Permet de détecter iOS ou Android
  StyleSheet, // Pour créer les styles
  Text, // Afficher du texte
  TextInput, // Champ de saisie
  TouchableOpacity, // Bouton cliquable
  View, // Conteneur (équivalent d'une div)
} from "react-native";

// Import du logo de l'application
import Logo from "../assets/Logo_M2L.svg";

// Import de l'icône Google
import Google from "../assets/google-icon.svg";


// Composant principal Register (page d'inscription)
export default function Register() {

  // Hook permettant la navigation entre les écrans
  const navigation = useNavigation();
  
  // Etats pour stocker les données du formulaire
  const [username, setUsername] = useState(""); // nom utilisateur
  const [password, setPassword] = useState(""); // mot de passe
  const [confirmPassword, setConfirmPassword] = useState(""); // confirmation mot de passe
  const [email, setEmail] = useState(""); // email
  const [memberNumber, setMemberNumber] = useState(""); // numéro adhérent

  return (

    // KeyboardAvoidingView empêche le clavier de cacher les inputs
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >

      {/* Carte contenant le formulaire d'inscription */}
      <View style={styles.card}>

        {/* Logo de l'application */}
        <Logo style={styles.logo} />

        {/* Nom de l'application */}
        <Text style={styles.title}>M2L</Text>

        {/* Message de bienvenue */}
        <Text style={styles.subtitle}>
          Bienvenue à la Maison Des Ligues !
        </Text>

        {/* Champ nom d'utilisateur */}
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        {/* Champ email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Champ mot de passe */}
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Champ confirmation mot de passe */}
        <TextInput
          style={styles.input}
          placeholder="Comfirmer mot de passe"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Champ numéro d'adhérent */}
        <TextInput
          style={styles.input}
          placeholder="Numéro d'adhérent"
          placeholderTextColor="#888"
          value={memberNumber}
          onChangeText={setMemberNumber}
        />

        {/* Bouton pour s'inscrire */}
        <TouchableOpacity 
          style={styles.registerBtn} 
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.registerText}>S’inscrire</Text>
        </TouchableOpacity>

        {/* Séparateur entre inscription classique et Google */}
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>ou</Text>
          <View style={styles.line} />
        </View>

        {/* Bouton inscription avec Google */}
        <TouchableOpacity style={styles.googleBtn}>

          {/* Icône Google */}
          <Google width={20} height={20} />

          {/* Texte du bouton */}
          <Text style={styles.googleText}>
            S'inscrire avec Google
          </Text>

        </TouchableOpacity>

        {/* Lien vers la page de connexion */}
        <View style={styles.loginContainer}>

          <Text style={styles.loginText}>
            Vous avez déjà un compte ?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>
              Se connecter
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({

  // Conteneur principal
  container: {
    flex: 1,
    backgroundColor: "#fcfbfb",
  },

  // Carte contenant le formulaire
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 15,
  },

  // Style du logo
  logo: {
    width: 40,
    marginTop: 40,
    alignSelf: "center",
    marginBottom: 20,
  },

  // Style du titre
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  // Style du sous-titre
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 30,
    color: "#444",
  },

  // Style des champs de saisie
  input: {
    backgroundColor: "#f4f4f4",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 14,
  },

  // Bouton d'inscription
  registerBtn: {
    backgroundColor: "#c62828",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  // Texte du bouton
  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Séparateur
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  // Ligne du séparateur
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#131212",
  },

  // Texte "ou"
  orText: {
    marginHorizontal: 10,
    color: "#777",
  },

  // Bouton Google
  googleBtn: {
    flexDirection: "row",
    backgroundColor: "#0d1b2a",
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  // Texte du bouton Google
  googleText: {
    color: "#fff",
    fontWeight: "500",
  },

  // Section du lien connexion
  loginContainer: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "center",
  },

  // Lien vers login
  loginLink: {
    fontWeight: "bold",
    color: "#918e8e",
  },

});