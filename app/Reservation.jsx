// Import des composants nécessaires de React Native
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

// Import des icônes Ionicons
import { Ionicons } from "@expo/vector-icons";

// Hook de navigation pour changer d'écran
import { useNavigation } from "@react-navigation/native";

// Import d'une icône depuis la librairie Foundation
import Foundation from '@expo/vector-icons/Foundation';

// Import du footer affiché en bas de l'écran
import Footer from "../components/Footer";

// Import des images SVG utilisées dans l'écran
import Ellipse from "../assets/Ellipse.svg";
import Yoga from "../assets/Yoga.svg";
import Hiit from "../assets/Hiit.svg";
import Pilate from "../assets/Pilate.svg";
import Zumba from "../assets/Zumba.svg";


// Composant principal de la page Mes Réservations
export default function Reservation() {

    // Permet d'utiliser la navigation entre les écrans
    const navigation = useNavigation();

    return (
        <>
        <View style={styles.container}>
    
            {/* Barre du haut avec bouton retour et bouton paramètres */}
            <View style={styles.backButton}>

                {/* Icône retour */}
                <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.navigate("Accueil")}/>

                {/* Icône paramètres qui ouvre la page Profile */}
                <Ionicons 
                    onPress={() => navigation.navigate("Profile")} 
                    name="settings-outline" 
                    size={30} 
                    color="black" 
                />
            </View>
        
            {/* Section contenant les informations utilisateur */}
            <View style={styles.headerContainer}>

                {/* Image décorative */}
                <Ellipse style={styles.Ellipse} />

                {/* Ligne rouge décorative */}
                <View style={styles.line} />

                {/* Informations utilisateur */}
                <View style={styles.header}>
                    <Text style={styles.username}>Nom utilisateur</Text>
                    <Text style={styles.ligue}>Nom de la ligue</Text>
                    <Text style={styles.role}>Rôle de la ligue</Text>
                </View>

            </View>

            {/* Titre de la section "Mes réservations" */}
            <View style={styles.note}>

                {/* Icône notes */}
                <Foundation name="clipboard-notes" size={35} color="#db8686" />

                {/* Texte du titre */}
                <Text style={styles.noteText}>MES RESERVATIONS</Text>

            </View>

            {/* Scroll pour afficher toutes les réservations */}
            <ScrollView>

                {/* Grille contenant les différentes réservations */}
                <View style={styles.grid}>
        
                    {/* Carte réservation Yoga */}
                    <View style={styles.card}>

                        {/* Image de l'activité */}
                        <Yoga width="100%" height={120} />

                        {/* Nom de l'activité */}
                        <Text style={styles.cardTitle}>Yoga</Text>

                        {/* Horaire */}
                        <Text style={styles.time}>8:00 AM - 9:00 AM</Text>
            
                        {/* Bouton annuler */}
                        <TouchableOpacity style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Annuler</Text>
                        </TouchableOpacity>

                    </View>
                    
                    {/* Carte réservation HIIT */}
                    <View style={styles.card}>

                        <Hiit width="100%" height={120} />

                        <Text style={styles.cardTitle}>HIIT</Text>

                        <Text style={styles.time}>8:00 AM - 10:00 AM</Text>
            
                        <TouchableOpacity style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Annuler</Text>
                        </TouchableOpacity>

                    </View>
                        
                    {/* Carte réservation Pilates */}
                    <View style={styles.card}>

                        <Pilate width="100%" height={120} />

                        <Text style={styles.cardTitle}>Pilates</Text>

                        <Text style={styles.time}>10:00 AM - 11:00 AM</Text>
            
                        <TouchableOpacity style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Annuler</Text>
                        </TouchableOpacity>

                    </View>
                    
                    {/* Carte réservation Zumba */}
                    <View style={styles.card}>

                        <Zumba width="100%" height={120} />

                        <Text style={styles.cardTitle}>Zumba</Text>

                        <Text style={styles.time}>11:00 AM - 12:00 PM</Text>
            
                        <TouchableOpacity style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Annuler</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

        </View>

        {/* Footer affiché en bas de l'application */}
        <Footer />
        </>
    );
}


const styles = StyleSheet.create({

    // Conteneur principal
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20
    },

    // Barre du haut
    backButton: {
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    // Section header utilisateur
    headerContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },

    // Bloc contenant les informations utilisateur
    header: {
        marginBottom: 40,
        marginLeft: 20,
        marginTop: 20,
    },

    // Ligne rouge décorative
    line: {
        width: 4,
        height: 90,
        backgroundColor: "#b91414",
        marginHorizontal: 20,
        marginLeft: 40,
        marginTop: 20,
    },

    // Nom utilisateur
    username: {
        fontSize: 20,
        fontWeight: "bold",
    },

    // Nom de la ligue
    ligue: {
        fontSize: 16,
        marginTop: 10
    },

    // Rôle de la ligue
    role: {
        fontSize: 14,
        color: "gray",
        marginTop: 10
    },

    // Conteneur du titre "Mes réservations"
    note: {
        flexDirection: "row",
        alignItems: "center"
    },

    // Style du texte du titre
    noteText: {
        color: "#db8686",
        fontSize: "30",
        marginLeft: "20"
    }, 

    // Grille contenant les cartes
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },

    // Carte de réservation
    card: {
        width: "50%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
        elevation: 3
    },

    // Titre de l'activité
    cardTitle: {
        fontWeight: "bold",
        marginTop: 10
    },

    // Horaire de l'activité
    time: {
        color: "gray",
        fontSize: 12,
        marginVertical: 5
    },

    // Bouton annuler
    cancelBtn: {
        backgroundColor: "#c62828",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center"
    },

    // Texte du bouton annuler
    cancelText: {
        color: "white",
        fontWeight: "bold"
    }

});