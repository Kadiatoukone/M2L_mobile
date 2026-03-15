// Import des composants nécessaires de React Native
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Import des icônes Ionicons depuis Expo
import { Ionicons } from "@expo/vector-icons";

// Import de l'icône SVG représentant une personne
import Personne from "../assets/Personne.svg";

// Hook de navigation pour changer d'écran
import { useNavigation } from "@react-navigation/native";

// Import de l'icône cadenas pour la partie confidentialité
import Lock from "../assets/Lock.svg";

// Import d'une icône Feather pour le bouton de déconnexion
import Feather from '@expo/vector-icons/Feather';

// Import du composant Footer affiché en bas de l'écran
import Footer from "../components/Footer";


// Composant principal de la page Profil
export default function Profile() {

    // Permet d'utiliser la navigation entre les écrans
    const navigation = useNavigation();

    return (
    <>
        {/* Conteneur principal */}
        <View style={{flex:1}}>

            <View style={styles.container}>
        
                {/* Bouton retour qui renvoie vers la page Reservation */}
                <TouchableOpacity  
                    onPress={() => navigation.navigate("Reservation")} 
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            
                {/* Section header contenant les informations utilisateur */}
                <View style={styles.headerContainer}>

                    {/* Ligne rouge décorative */}
                    <View style={styles.line} />

                    {/* Informations utilisateur */}
                    <View style={styles.header}>
                        <Text style={styles.username}>Nom utilisateur</Text>
                        <Text style={styles.ligue}>Nom de la ligue</Text>
                        <Text style={styles.role}>Rôle de la ligue</Text>
                    </View>

                </View>
            
                {/* Section contenant les différentes options du profil */}
                <View style={styles.content}>
            
                    {/* Carte Informations utilisateur */}
                    <TouchableOpacity style={styles.card}>

                        {/* Partie gauche avec icône + texte */}
                        <View style={styles.cardLeft}>
    
                            {/* Icône personne */}
                            <Personne width={70} height={70} />

                            {/* Texte */}
                            <Text style={styles.cardText}>Informations</Text>

                        </View>

                        {/* Flèche indiquant une navigation */}
                        <Ionicons name="chevron-forward" size={20} color="#8C1A10" />
                    </TouchableOpacity>
            
                    {/* Carte Confidentialité */}
                    <TouchableOpacity style={styles.card}>

                        {/* Partie gauche */}
                        <View style={styles.cardLeft}>

                            {/* Icône cadenas */}
                            <Lock width={70} height={70} />
                            
                            {/* Texte */}
                            <Text style={styles.cardText}>Confidentialité</Text>

                        </View>

                        {/* Flèche de navigation */}
                        <Ionicons name="chevron-forward" size={20} color="#8C1A10" />
                    </TouchableOpacity>

                    {/* Bouton de déconnexion */}
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("LoginHome")} 
                        style={styles.returnBtn}
                    >

                        {/* Icône déconnexion */}
                        <Feather name="log-out" size={24} color="white" />
                    
                        {/* Texte du bouton */}
                        <Text style={styles.returnText}>Se déconnecter</Text>

                    </TouchableOpacity>
            
                </View>

            </View>

        </View>

        {/* Footer affiché en bas de l'écran */}
        <Footer />
    </>
    );
}


// Styles du composant
const styles = StyleSheet.create({

    // Conteneur principal
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white"
    },

    // Bouton retour
    backButton: {
        marginBottom: 50
    },

    // Conteneur du header
    headerContainer: {
        flexDirection: "row",
        marginBottom: 40,
    },

    // Bloc contenant les informations utilisateur
    header: {
        marginBottom: 40,
        marginLeft: 80
    },

    // Ligne rouge décorative
    line: {
        width: 4,
        height: 110,
        backgroundColor: "#b91414",
        flexDirection: "column",
        marginHorizontal: 20,
    },

    // Nom utilisateur
    username: {
        fontSize: 20,
        fontWeight: "bold",
    },

    // Nom de la ligue
    ligue: {
        fontSize: 16,
        marginTop: 20
    },

    // Rôle dans la ligue
    role: {
        fontSize: 14,
        color: "gray",
        marginTop: 20
    },

    // Section contenant les cartes
    content: {
        marginTop: 10
    },

    // Carte d'option (Informations / Confidentialité)
    card: {
        backgroundColor: "#cdcbcb80",
        padding: 15,
        borderRadius: 12,
        marginBottom: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3
    },

    // Partie gauche de la carte (icône + texte)
    cardLeft: {
        flexDirection: "row",
        alignItems: "center"
    },

    // Style des icônes
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
        resizeMode: "contain"
    },

    // Texte des cartes
    cardText: {
        fontSize: 16
    },

    // Bouton de déconnexion
    returnBtn: {
        backgroundColor: "#c62828",
        padding: 15,
        borderRadius: 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
    },

});