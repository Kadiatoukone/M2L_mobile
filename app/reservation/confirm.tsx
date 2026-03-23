import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ConfirmReservation() {
  const { type } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CONFIRMEZ VOTRE RÉSERVATION</Text>
      </View>

      {/* TYPE */}
      <Text style={styles.typeText}>
        {type === "unique" ? "Unique" : "Mensuel"}
      </Text>

      {/* CONTENU SELON LE TYPE */}
      <View style={styles.content}>
        {type === "unique" ? (
          <>
            <Text style={styles.label}>Date : 18/12</Text>
            <Text style={styles.label}>Horaire : 19:00</Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>Date de début : 18/12</Text>
            <Text style={styles.label}>Date de fin : 18/01</Text>
          </>
        )}
      </View>

      {/* BOUTON RESERVER */}
      <TouchableOpacity style={styles.reserveButton}>
        <Text style={styles.reserveText}>RESERVER</Text>
      </TouchableOpacity>

      {/* BOUTON ANNULER */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>ANNULER</Text>
      </TouchableOpacity>

      {/* BARRE DU BAS */}
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>ACCUEIL</Text>
        <Text style={styles.navItem}>RECHERCHER</Text>
        <Text style={styles.navItem}>MES RÉSERVATIONS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#C62828",
    paddingVertical: 20,
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  typeText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },

  content: {
    marginTop: 40,
    alignItems: "center",
    gap: 10,
  },

  label: {
    fontSize: 18,
    color: "#333",
  },

  reserveButton: {
    backgroundColor: "#C62828",
    paddingVertical: 15,
    marginHorizontal: 40,
    borderRadius: 10,
    marginTop: 60,
  },
  reserveText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  cancelButton: {
    backgroundColor: "#8B0000",
    paddingVertical: 15,
    marginHorizontal: 40,
    borderRadius: 10,
    marginTop: 15,
  },
  cancelText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#eee",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  navItem: {
    fontSize: 14,
    fontWeight: "600",
  },
});
