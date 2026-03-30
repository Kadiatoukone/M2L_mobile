// Import du composant Footer affiché en bas de l'écran
import Footer from "../components/Footer";

// Import des composants React Native nécessaires
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList,
    TouchableOpacity, 
    TextInput 
} from "react-native";

// Import des icônes Ionicons
import { Ionicons } from "@expo/vector-icons";

// Hook permettant de naviguer entre les écrans
import { useNavigation } from "@react-navigation/native";

// Hook permettant de gérer l'état (state)
import { useState } from "react";


// Tableau contenant les salles disponibles
// (pour l'instant ce sont des données statiques)
const salles = [
    {
        id: "1",
        nom: "Nom de la salle",
        type: "FOOTBALL",
        distance: "0.5 KM",
        adresse: "Adresse"
    },
    {
        id: "2",
        nom: "Nom de la salle",
        type: "FOOTBALL",
        distance: "0.5 KM",
        adresse: "Adresse"
    },
    {
        id: "3",
        nom: "Nom de la salle",
        type: "FOOTBALL",
        distance: "0.5 KM",
        adresse: "Adresse"
    },
    {
        id: "4",
        nom: "Nom de la salle",
        type: "FOOTBALL",
        distance: "0.5 KM",
        adresse: "Adresse"
    },
    {
        id: "5",
        nom: "Nom de la salle",
        type: "FOOTBALL",
        distance: "0.5 KM",
        adresse: "Adresse"
    },
    {
        id: "6",
        nom: "Nom de la salle",
        type: "FOOTBALL",
        distance: "0.5 KM",
        adresse: "Adresse"
    },
];


// Composant principal Reservation
export default function Reservation() {

    // Permet d'utiliser la navigation entre les écrans
    const navigation = useNavigation();

    // Fonction qui affiche une salle dans la liste
    const renderSalle = ({ item }) => (

        // Carte cliquable qui redirige vers la page Reserver
        <TouchableOpacity 
            onPress={() => navigation.navigate("Calendrier")} 
            style={styles.card}
        >
        
            <View style={styles.info}>

                {/* Nom de la salle */}
                <Text style={styles.nom}>{item.nom}</Text>

                {/* Note et informations */}
                <View style={styles.rating}>

                    {/* Icône étoile */}
                    <Ionicons name="star" size={16} color="yellow" />

                    {/* Texte contenant note + type + distance */}
                    <Text style={styles.ratingText}>
                        4.7 - {item.type} - {item.distance}
                    </Text>

                </View>
                
                {/* Adresse de la salle */}
                <Text style={styles.adresse}>{item.adresse}</Text>

            </View>

        </TouchableOpacity>
    );

    // Etat pour stocker la recherche dans la barre de recherche
    const [search, setSearch] = useState("");

    return (
        <>
        <View style={styles.container}>

            {/* Header avec titre et bouton paramètres */}
            <View style={styles.backButton}>

                {/* Titre de la page */}
                <Text style={styles.btnText}>Liste des salles disponibles</Text>

                {/* Icône paramètres qui ouvre le profil */}
                <Ionicons 
                    onPress={() => navigation.navigate("Profile")} 
                    name="settings-outline" 
                    size={30} 
                    color="black" 
                />

            </View>

            {/* Barre de recherche */}
            <View style={styles.searchBar}>

                {/* Champ de recherche */}
                <TextInput
                    placeholder="Rechercher une salle en particulier"
                    placeholderTextColor="#888"
                    value={search}
                    onChangeText={setSearch} // met à jour le texte recherché
                    style={styles.input}
                />

                {/* Icône loupe */}
                <Ionicons name="search" size={20} color="rgb(169, 55, 55)" />

            </View>

            {/* Bouton retour vers la page Accueil */}
            <Ionicons 
                onPress={() => navigation.navigate("Accueil")} 
                name="arrow-back" 
                size={24} 
                color="black" 
            />

            

            {/* Liste des salles */}
            <FlatList
                data={salles} // données
                keyExtractor={(item) => item.id} // clé unique
                renderItem={renderSalle} // fonction d'affichage
            />

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
        backgroundColor: "#ffffff",
        padding: 20,
    },

    // Header avec titre et bouton paramètres
    backButton: {
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    // Texte du titre
    btnText: {
        fontSize: 18,
    },

    // Barre de recherche
    searchBar: {
        flexDirection: "row",
        backgroundColor: "#eae8e8",
        justifyContent: "space-between",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 20,
    },

    // Carte représentant une salle
    card: {
        flexDirection: "row",
        backgroundColor: "#1f5c2e",
        borderRadius: 15,
        padding: 35,
        marginBottom: 25,
        alignItems: "center",
        marginTop: 10
    },

    // Nom de la salle
    nom: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },

    // Section contenant la note
    rating: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
    },

    // Texte de la note
    ratingText: {
        color: "white",
        marginLeft: 5
    },

    // Adresse de la salle
    adresse: {
        color: "white",
        marginTop: 5,
        fontSize: 12
    }

});