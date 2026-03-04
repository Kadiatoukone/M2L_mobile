import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Accueil() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <Image 
        source={require("./assets/Logo_M2L.svg")} 
        style={{ width: 70, height: 70 }} 
      />

      <Text style={styles.titleMain}>M2L</Text>
      <Text style={styles.subtitle}>
        Bienvenue à la Maison Des Ligues !
      </Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text>Vous n'avez pas un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.loginLink}>Inscrivez-vous !</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfb",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundImage: "url(../assets/images/vector.svg)",
  },
  logo: {
    width: 40,
    marginBottom: 10,
    resizeMode: "contain"
  },
  titleMain: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 70,
    textAlign: "center",
    marginBottom: 70
  },
  button: {
    backgroundColor: "#770505",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 20
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 40
  },
  loginLink: {
    color: "#918e8e",
    fontWeight: "bold",
    marginLeft: 5
  }
});