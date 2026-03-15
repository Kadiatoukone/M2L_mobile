// Import du composant Footer qui sera affiché en bas de la page
import Footer from "../components/Footer";

// Import de React et du hook useState pour gérer l'état du composant
import React, { useState } from "react";

// Import des composants nécessaires de React Native
import {
    View,           // Conteneur principal (équivalent d'une div en web)
    Text,           // Pour afficher du texte
    StyleSheet,     // Pour créer les styles
    TouchableOpacity, // Pour créer des boutons cliquables
    ScrollView      // Permet de scroller si le contenu dépasse l'écran
} from "react-native";

// Import des icônes Expo
import { Ionicons } from "@expo/vector-icons";

// Hook pour naviguer entre les pages avec React Navigation
import { useNavigation } from "@react-navigation/native";

// Composant principal Accueil
export default function Accueil() {

    // Permet d'utiliser la navigation entre les écrans
    const navigation = useNavigation();

    // Etat pour savoir quel onglet est sélectionné (sports ou events)
    const [tab, setTab] = useState("sports");

    // Tableau contenant les sports disponibles avec leur couleur
    const sports = [
        { name: "FUTSAL", color: "#1f5c2e" },
        { name: "HANDBALL", color: "#d14b3d" },
        { name: "BASKETBALL", color: "#c66a1c" },
        { name: "VOLLEY", color: "#f3c32f" },
        { name: "BADMINTON", color: "#a01010" },
        { name: "DANCE", color: "#777" },
        { name: "PING-PONG", color: "#2d6c7a" },
        { name: "FOOTBALL", color: "#0e2b18" },
        { name: "NATATION", color: "#54541c" }
    ];

    // Tableau contenant les types d'événements possibles
    const events = [
        { name: "Réunion", color: "#1f5c2e" },
        { name: "Salles des fêtes", color: "#c0493f" },
        { name: "", color: "#c66a1c" },
        { name: "", color: "#f3c32f" },
        { name: "", color: "#8b0000" },
        { name: "", color: "#888" },
        { name: "", color: "#111" },
        { name: "", color: "#4f7e86" },
        { name: "", color: "#4f6265" },
    ];

    // Si l'onglet sélectionné est "sports", on affiche le tableau sports
    // Sinon on affiche le tableau events
    const data = tab === "sports" ? sports : events;

    return (
        <>
        {/* Conteneur principal */}
        <View style={styles.container}>

            {/* Barre du haut avec adresse et bouton paramètres */}
            <View style={styles.head}>
                <Text>Addresse de recherche</Text>

                {/* Icône paramètres qui redirige vers la page Profile */}
                <Ionicons 
                    onPress={() => navigation.navigate("Profile")} 
                    name="settings-outline" 
                    size={30} 
                    color="#010101" 
                />
            </View>

            {/* Titre principal */}
            <Text style={styles.title}>
                VOUS RECHERCHEZ UNE SALLE POUR ?
            </Text>

            {/* Onglets pour choisir entre Sports ou Evènements */}
            <View style={styles.tabs}>

                {/* Bouton onglet Sports */}
                <TouchableOpacity onPress={() => setTab("sports")}>
                    <Text style={[
                        styles.tab,
                        tab === "sports" && styles.activeTab // style actif si sélectionné
                    ]}>
                        SPORTS
                    </Text>
                </TouchableOpacity>

                {/* Bouton onglet Evènements */}
                <TouchableOpacity onPress={() => setTab("events")}>
                    <Text style={[
                        styles.tab,
                        tab === "events" && styles.activeTab // style actif si sélectionné
                    ]}>
                        EVENEMENTS
                    </Text>
                </TouchableOpacity>

            </View>

            {/* Sous-titre qui change selon l'onglet */}
            <Text style={styles.subtitle}>
                {tab === "sports" ? "Sport disponibles" : "Evenements disponibles"}
            </Text>

            {/* Scroll pour permettre de faire défiler les cartes */}
            <ScrollView>

                {/* Grille des cartes */}
                <View style={styles.grid}>

                    {/* Boucle sur les données (sports ou events) */}
                    {data.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.card,
                                { backgroundColor: item.color } // couleur dynamique
                            ]}
                        >
                            {/* Texte de la carte qui redirige vers la page Recherche */}
                            <Text 
                                onPress={() => navigation.navigate("Recherche")} 
                                style={styles.cardText}
                            >
                                {item.name}
                            </Text>
                        </View>
                    ))}

                </View>
            </ScrollView>

        </View>

        {/* Footer affiché en bas de l'écran */}
        <Footer />
        </>
    );
}

// Styles du composant
const styles = StyleSheet.create({

    // Style du conteneur principal
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#ffffff"
    },

    head: {
        marginTop: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25
    },

    // Style du titre principal
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 40
    },

    // Conteneur des onglets
    tabs: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 20
    },

    // Style de base des onglets
    tab: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black"
    },

    // Style de l'onglet actif
    activeTab: {
        color: "red",
        borderBottomWidth: 3,
        borderBottomColor: "red"
    },

    // Style du sous-titre
    subtitle: {
        marginTop: 10,
        marginBottom: 15,
        fontSize: 19
    },

    // Grille des cartes
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },

    // Style d'une carte
    card: {
        width: "48%",
        height: 120,
        borderRadius: 15,
        padding: 10,
        marginBottom: 15
    },

    // Texte dans les cartes
    cardText: {
        color: "white",
        fontWeight: "bold"
    }

});