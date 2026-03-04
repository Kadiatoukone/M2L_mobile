import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
    return (
        <View style={styles.container}>
    
            {/* Bouton retour */}
            <TouchableOpacity style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
        
            {/* header */}
            <View style={styles.header}>
                <Text style={styles.username}>Nom utilisateur</Text>
                <Text style={styles.ligue}>Nom de la ligue</Text>
                <Text style={styles.role}>Rôle de la ligue</Text>
            </View>
        
            {/* content */}
            <View style={styles.content}>
        
                {/* Informations */}
                <TouchableOpacity style={styles.card}>
                    <View style={styles.cardLeft}>
                        <Image 
                            source={require("./assets/Personne.svg")} 
                            style={styles.icon}
                        />    
                        <Text style={styles.cardText}>Informations</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#8C1A10" />
                </TouchableOpacity>
        
                {/* Confidentialité */}
                <TouchableOpacity style={styles.card}>
                    <View style={styles.cardLeft}>
                        <Image 
                            source={require("./assets/Lock.svg")} 
                            style={styles.icon}
                        />
                        <Text style={styles.cardText}>Confidentialité</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#8C1A10" />
                </TouchableOpacity>
        
            </View>
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fcfbfb",
      padding: 20
    },
    backButton: {
      marginBottom: 20
    },
    header: {
      alignItems: "center",
      marginBottom: 30
    },
    username: {
        fontSize: 20,
        fontWeight: "bold"
    },
    ligue: {
        fontSize: 16,
        marginTop: 5
    },
    role: {
        fontSize: 14,
        color: "gray",
        marginTop: 5
    },
    content: {
        marginTop: 10
    },
    card: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3
    },
    cardLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
        resizeMode: "contain"
    },
    cardText: {
        fontSize: 16
    }
});