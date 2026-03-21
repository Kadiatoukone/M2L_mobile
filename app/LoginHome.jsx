// Import des composants nécessaires de React Native
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Import du hook de navigation pour changer d'écran
import { useNavigation } from "@react-navigation/native";

// Import du logo de l'application
import Logo from "../assets/Logo_M2L.svg";
import Vector from "../assets/Vector.svg";


// Composant principal de la page d'accueil avant connexion
export default function LoginHome() {

  // Permet d'utiliser la navigation entre les écrans
  const navigation = useNavigation();

  return (
    
    // Conteneur principal de la page
    <View style={styles.container}>
      <Vector width="60%" height="60%" style={styles.background} />
      {/* Logo de l'application */}
      <Logo width={100} height={100} />

      {/* Nom de l'application */}
      <Text style={styles.titleMain}>M2L</Text>

      {/* Message de bienvenue */}
      <Text style={styles.subtitle}>
        Bienvenue à la Maison Des Ligues !
      </Text>

      {/* Bouton pour aller vers la page de connexion */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("Login")}
      >
        <Text 
          style={styles.buttonText}
          onPress={() => navigation.navigate("Login")}
        >
          Se connecter
        </Text>
      </TouchableOpacity>

      {/* Section pour les utilisateurs qui n'ont pas encore de compte */}
      <View style={styles.loginContainer}>

        {/* Texte informatif */}
        <Text>Vous n'avez pas un compte ? </Text>

        {/* Lien vers la page d'inscription */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.loginLink}>Inscrivez-vous !</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}


// Styles du composant
const styles = StyleSheet.create({
  
  // Conteneur principal de l'écran
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center", // centre verticalement
    alignItems: "center", // centre horizontalement
    padding: 25,
  },

  // Style de l'image de fond
  background: {
    position: "absolute",
    right: 0,
    top: 0
  },

  // Style du titre principal
  titleMain: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20
  },

  // Style du texte de bienvenue
  subtitle: {
    fontSize: 70,
    textAlign: "center",
    marginBottom: 70
  },

  // Style du bouton "Se connecter"
  button: {
    backgroundColor: "#770505",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 20
  },

  // Style du texte du bouton
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  // Conteneur pour le lien d'inscription
  loginContainer: {
    flexDirection: "row",
    marginTop: 40
  },

  // Style du lien "Inscrivez-vous"
  loginLink: {
    color: "#918e8e",
    fontWeight: "bold",
    marginLeft: 5
  }

});