// Import du hook useState pour gérer l'état local
import { useState } from "react";

// Import des composants React Native utilisés
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Import des icônes Ionicons pour afficher des symboles
import { Ionicons } from "@expo/vector-icons";

// Import du footer personnalisé
import Footer from "../components/Footer";

// Composant principal Reserver
export default function Reserver() {

    // Etat pour savoir si la réservation est "unique" ou "mensuel"
    const [typeReservation, setTypeReservation] = useState("unique");
  
    return (
        <>
            {/* Conteneur principal */}
            <View style={styles.container}>
      
                {/* Titre de la page */}
                <Text style={styles.title}>CONFIRMEZ VOTRE RESERVATION</Text>
        
                {/* SWITCH : choix entre réservation unique ou mensuelle */}
                <View style={styles.switchContainer}>
        
                    {/* Bouton "Unique" */}
                    <TouchableOpacity
                        style={[
                            styles.switchButton,
                            typeReservation === "unique" && styles.activeButton // si actif, appliquer style
                        ]}
                        onPress={() => setTypeReservation("unique")} // clic : définit la réservation comme unique
                    >
                        <Text
                            style={[
                                styles.switchText,
                                typeReservation === "unique" && styles.activeText
                            ]}
                        >
                            Unique
                        </Text>
                    </TouchableOpacity>

                    {/* Bouton "Mensuel" */}
                    <TouchableOpacity
                        style={[
                            styles.switchButton,
                            typeReservation === "mensuel" && styles.activeButton
                        ]}
                        onPress={() => setTypeReservation("mensuel")}
                    >  
                        <Text
                            style={[
                                styles.switchText,
                                typeReservation === "mensuel" && styles.activeText
                            ]}
                        >  
                            Mensuel
                        </Text>
                    </TouchableOpacity>
        
                </View>
        
                {/* BLOC pour les informations dates et horaires */}
                <View style={styles.infoBlock}>
                    <Ionicons name="calendar-outline" size={20} />
                    <Text style={styles.infoText}> Date : 18/12</Text>
                </View>
        
                {/* Affiche la date de fin seulement si c'est une réservation mensuelle */}
                {typeReservation === "mensuel" && (
                    <View style={styles.infoBlock}>
                        <Ionicons name="calendar-outline" size={20} />
                        <Text style={styles.infoText}> Date de fin : 18/01</Text>
                    </View>
                )}
        
                {/* Affiche l'horaire seulement si c'est une réservation unique */}
                {typeReservation === "unique" && (
                    <View style={styles.infoBlock}>
                        <Ionicons name="time-outline" size={20} />
                        <Text style={styles.infoText}> Horaire : 7:00 PM</Text>
                    </View>
                )}
        
                {/* BOUTON RESERVER */}
                <TouchableOpacity style={styles.reserverBtn}>
                    <Text style={styles.btnText}>RESERVER</Text>
                    <Ionicons name="chevron-forward" size={20} color="white" />
                </TouchableOpacity>
        
                {/* BOUTON ANNULER */}
                <TouchableOpacity style={styles.annulerBtn}>
                    <Text style={styles.btnText}>ANNULER</Text>
                    <Ionicons name="chevron-forward" size={20} color="white" />
                </TouchableOpacity>
        
            </View>
            {/* Footer global de l'application */}
            <Footer />
        </>
    );
}


const styles = StyleSheet.create({
    // Conteneur principal
    container: {
        backgroundColor: "#fffefe",
        padding: 25,
        justifyContent: "center"
    },

    // Titre de la page
    title: {
        marginTop: 90,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 80,
        fontSize: 20, 
    },

    // Conteneur du switch (boutons Unique / Mensuel)
    switchContainer: {
        flexDirection: "row",
        backgroundColor: "#ccc",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 80
    },

    // Style des boutons du switch
    switchButton: {
        flex: 1,
        padding: 15,
        alignItems: "center"
    },

    // Style du bouton actif
    activeButton: {
        backgroundColor: "#d23c3c"
    },

    // Texte du bouton
    switchText: {
        color: "#fff",
        fontWeight: "bold"
    },

    // Texte du bouton actif (optionnel)
    activeText: {
        color: "#fff"
    },

    // Bloc d'information (date, horaire)
    infoBlock: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 35
    },

    // Texte dans le bloc info
    infoText: {
        marginLeft: 10,
        fontSize: 16
    },

    // Bouton pour confirmer la réservation
    reserverBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d23c3c",
        padding: 18,
        borderRadius: 30,
        marginTop: 80,
        elevation: 5
    },

    // Bouton pour annuler la réservation
    annulerBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#990000",
        padding: 18,
        borderRadius: 30,
        marginTop: 20,
        elevation: 5
    },

    // Texte des boutons
    btnText: {
        color: "white",
        fontWeight: "bold",
        marginRight: 10
    }

});