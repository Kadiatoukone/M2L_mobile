// Import du hook useState pour gérer l'état des champs du formulaire
import { useState } from "react";

// Import du système de navigation pour changer d'écran
import { useNavigation } from "@react-navigation/native";

// Import des composants nécessaires de React Native
import {
    KeyboardAvoidingView, // Permet d'éviter que le clavier cache les champs
    Platform, // Permet de détecter si on est sur iOS ou Android
    StyleSheet, // Pour créer les styles
    Text, // Pour afficher du texte
    TextInput, // Champ de saisie
    TouchableOpacity, // Bouton cliquable
    View, // Conteneur (équivalent d'une div)
} from "react-native";

// Import du logo de l'application
import Logo from "../assets/Logo_M2L.svg";
import Vector from "../assets/Vector.svg";

// Composant principal Login
export default function Login() {

    // Permet d'utiliser la navigation entre les pages
    const navigation = useNavigation();

    // Etat pour stocker le nom d'utilisateur saisi
    const [username, setUsername] = useState("");

    // Etat pour stocker le mot de passe saisi
    const [password, setPassword] = useState("");

    return (

        // KeyboardAvoidingView évite que le clavier recouvre les inputs
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.container}
        >

            {/* Carte principale contenant le formulaire */}
            <View style={styles.card}>
                <Vector width="60%" height="60%" style={styles.background} />

                {/* Logo de l'application */}
                <Logo style={styles.logo} />

                {/* Nom de l'application */}
                <Text style={styles.title}>M2L</Text>

                {/* Message de bienvenue */}
                <Text style={styles.subtitle}>
                    Bienvenue à la Maison Des Ligues !
                </Text>

                {/* Champ pour saisir le nom d'utilisateur */}
                <TextInput
                    style={styles.input}
                    placeholder="Nom d'utilisateur"
                    placeholderTextColor="#888"
                    value={username}
                    onChangeText={setUsername} // met à jour l'état username
                />

                {/* Champ pour saisir le mot de passe */}
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#888"
                    secureTextEntry // masque les caractères du mot de passe
                    value={password}
                    onChangeText={setPassword} // met à jour l'état password
                />

                {/* Bouton pour se connecter */}
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => navigation.navigate("Accueil")} // redirection vers l'écran Accueil
                >
                    <Text style={styles.loginText}>Se connecter</Text>
                </TouchableOpacity>

                {/* Lien pour créer un compte */}
                <View style={styles.registerContainer}>

                    {/* Texte */}
                    <Text style={styles.registerText}>
                        Vous n'avez pas de compte ?
                    </Text>

                    {/* Lien vers la page Register */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={styles.registerLink}>
                            S'inscrire
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

// Styles du composant
const styles = StyleSheet.create({

    // Conteneur principal
    container: {
        flex: 1,
        backgroundColor: "#fcfbfb",
    },

    // Style de l'image de fond
    background: {
        position: "absolute",
        right: 0,
        top: 0
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

    // Style du titre principal
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
        marginBottom: 60,
        color: "#444",
    },

    // Style des champs de saisie
    input: {
        backgroundColor: "#f4f4f4",
        padding: 14,
        borderRadius: 12,
        marginBottom: 40,
        fontSize: 14,
    },

    // Bouton de connexion
    loginBtn: {
        backgroundColor: "#c62828",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 50,
    },

    // Texte du bouton connexion
    loginText: {
        color: "#fff",
        fontWeight: "bold",
    },

    // Conteneur du lien d'inscription
    registerContainer: {
        flexDirection: "row",
        marginTop: 70,
        justifyContent: "center",
    },

    // Style du lien "S'inscrire"
    registerLink: {
        fontWeight: "bold",
        color: "#918e8e",
    },
});