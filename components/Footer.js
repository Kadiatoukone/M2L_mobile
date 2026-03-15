// Import des composants et hooks React Native nécessaires
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Import des icônes utilisées dans le footer
import Foundation from '@expo/vector-icons/Foundation';
import Feather from '@expo/vector-icons/Feather';

// Hooks de navigation pour naviguer entre les écrans et récupérer la route actuelle
import { useNavigation, useRoute } from "@react-navigation/native";

// Composant Footer
export default function Footer() {

    // Hook pour naviguer vers d'autres écrans
    const navigation = useNavigation();

    // Hook pour connaître la route actuelle dans laquelle on se trouve afin de 
    // surligner le bouton qui est actif
    const route = useRoute();
    
    // Couleur pour le bouton actif 
    const activeColor = "#d81b60"; // couleur rose vif pour le bouton actif
    const defaultColor = "black";   // couleur noire pour les autres boutons

    return (
        <View style={styles.footer}>

            {/* bouton Accueil */}
            <TouchableOpacity
                style={styles.footerItem}
                onPress={() => navigation.navigate("Accueil")} // navigation vers Accueil
            >  
                <Foundation
                    name="home"
                    size={22}
                    // couleur dynamique selon que le bouton est actif ou non
                    color={route.name === "Accueil" ? activeColor : defaultColor}
                />
                <Text
                style={[
                    styles.footerText,
                    { color: route.name === "Accueil" ? activeColor : defaultColor }
                ]}
                >
                ACCUEIL
                </Text>
            </TouchableOpacity>

            {/* Onglet Rechercher */}
            <TouchableOpacity
                style={styles.footerItem}
                onPress={() => navigation.navigate("Recherche")} // navigation vers Recherche
            >  
                <Feather
                    name="search"
                    size={22}
                    color={route.name === "Recherche" ? activeColor : defaultColor}
                />
                <Text
                    style={[
                    styles.footerText,
                    { color: route.name === "Recherche" ? activeColor : defaultColor }
                ]}
                >
                    RECHERCHER
                </Text>
            </TouchableOpacity>

            {/* Onglet Mes Réservations */}
            <TouchableOpacity
                style={styles.footerItem}
                onPress={() => navigation.navigate("Reservation")} // navigation vers Reservation
            >  
                <Foundation 
                    name="clipboard-notes" size={25} 
                    color={route.name === "Reservation" ? activeColor : defaultColor} 
                />
                <Text
                    style={[
                        styles.footerText,
                        { color: route.name === "Reservation" ? activeColor : defaultColor }
                    ]}
                >
                MES RÉSERVATIONS
                </Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({

    // Conteneur principal du footer
    footer: {
        position: "absolute",   // position fixe en bas de l'écran
        bottom: 1,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#f2f2f2",
        flexDirection: "row",   // disposition en ligne pour les bouton
        justifyContent: "space-around", // pour espacer les boutons 
        alignItems: "center",
        borderTopWidth: 1,      // ligne en haut du footer
        borderColor: "#ddd"
    },  

    // Style pour chaque bouton du footer
    footerItem: {
        alignItems: "center" 
    },

    // Texte en bas des boutons
    footerText: {
        fontSize: 11,
        marginTop: 4,       
        fontWeight: "500"
    }
});