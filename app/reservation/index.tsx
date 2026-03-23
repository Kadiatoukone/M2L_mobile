import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Reservation() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Réservation</Text>
      </View>

      {/* CHOIX */}
      <View style={styles.choiceContainer}>
        <TouchableOpacity
          style={styles.choiceButton}
          onPress={() => router.push("/reservation/confirm?type=unique")}
        >
          <Text style={styles.choiceText}>Réservation unique</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.choiceButton}
          onPress={() => router.push("/reservation/confirm?type=mensuelle")}

        >
          <Text style={styles.choiceText}>Réservation mensuelle</Text>
        </TouchableOpacity>
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
  headerText: { color: "#fff", fontSize: 22, fontWeight: "bold" },

  choiceContainer: {
    marginTop: 50,
    gap: 20,
    paddingHorizontal: 20,
  },

  choiceButton: {
    backgroundColor: "#eee",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  choiceText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
