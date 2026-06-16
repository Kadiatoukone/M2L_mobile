import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../../../context/ThemeContext";

// Mock temporaire — même état que sur l'appli web (SalleAvis.jsx) :
// l'entité Commentaire existe en BDD mais n'est pas encore reliée aux salles
// côté API. À remplacer par un vrai appel API une fois l'endpoint prêt.
const MOCK_AVIS = [
  { id: 1, user: "Marie D.",  note: 5, date: "12/01/2025", content: "Salle impeccable, très bien équipée." },
  { id: 2, user: "Thomas R.", note: 4, date: "08/01/2025", content: "Bonne salle, accès facile." },
  { id: 3, user: "Sophie L.", note: 3, date: "02/01/2025", content: "Correct mais quelques équipements manquants." },
  { id: 4, user: "Paul M.",   note: 5, date: "28/12/2024", content: "Parfait pour notre événement." },
  { id: 5, user: "Julie B.",  note: 4, date: "20/12/2024", content: "Très agréable, personnel disponible." },
  { id: 6, user: "Marc T.",   note: 2, date: "15/12/2024", content: "Déçu, la climatisation ne fonctionnait pas." },
  { id: 7, user: "Anna K.",   note: 5, date: "10/12/2024", content: "Super expérience, on reviendra !" },
];

const PAR_PAGE = 6;

function Stars({ note, size = 14 }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Ionicons
          key={i}
          name={i < note ? "star" : "star-outline"}
          size={size}
          color={i < note ? "#FFC107" : colors.border}
        />
      ))}
    </View>
  );
}

export default function SalleAvis() {
  const { colors } = useTheme();
  const { detailSalleStyles } = useStyles();
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const reviews = MOCK_AVIS;
  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.note === filter);
  const totalPages = Math.ceil(filtered.length / PAR_PAGE);
  const items = filtered.slice((page - 1) * PAR_PAGE, page * PAR_PAGE);
  const moyenne = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.note, 0) / reviews.length).toFixed(1)
    : 0;

  const handleFilter = (val) => {
    setFilter(val);
    setPage(1);
  };

  return (
    <View>
      <View style={detailSalleStyles.avisHeader}>
        <Text style={detailSalleStyles.avisAverage}>{moyenne}</Text>
        <Stars note={Math.round(moyenne)} />
        <Text style={detailSalleStyles.ratingCount}>({reviews.length} avis)</Text>
      </View>

      <View style={detailSalleStyles.avisFilterRow}>
        <TouchableOpacity
          style={[detailSalleStyles.filterChip, filter === "all" && detailSalleStyles.filterChipActive]}
          onPress={() => handleFilter("all")}
        >
          <Text style={[detailSalleStyles.filterChipText, filter === "all" && detailSalleStyles.filterChipTextActive]}>
            Tout
          </Text>
        </TouchableOpacity>
        {[5, 4, 3, 2, 1].map((star) => (
          <TouchableOpacity
            key={star}
            style={[detailSalleStyles.filterChip, filter === star && detailSalleStyles.filterChipActive]}
            onPress={() => handleFilter(star)}
          >
            <Text style={[detailSalleStyles.filterChipText, filter === star && detailSalleStyles.filterChipTextActive]}>
              {star}
            </Text>
            <Ionicons name="star" size={11} color={filter === star ? colors.white : colors.textGrey} />
          </TouchableOpacity>
        ))}
      </View>

      {items.length > 0 ? (
        items.map((review) => (
          <View key={review.id} style={detailSalleStyles.avisItem}>
            <View style={detailSalleStyles.avisItemHeader}>
              <View style={detailSalleStyles.avisUserRow}>
                <View style={detailSalleStyles.avisAvatar}>
                  <Text style={detailSalleStyles.avisAvatarText}>{review.user.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={detailSalleStyles.avisUser}>{review.user}</Text>
                  <Text style={detailSalleStyles.avisDate}>{review.date}</Text>
                </View>
              </View>
              <Stars note={review.note} />
            </View>
            <Text style={detailSalleStyles.avisContent}>{review.content}</Text>
          </View>
        ))
      ) : (
        <View style={detailSalleStyles.avisEmpty}>
          <Ionicons name="chatbubble-outline" size={28} color={colors.border} />
          <Text style={detailSalleStyles.avisEmptyText}>Aucun avis trouvé.</Text>
        </View>
      )}

      {totalPages > 1 && (
        <View style={detailSalleStyles.paginationRow}>
          <TouchableOpacity
            style={detailSalleStyles.pageBtn}
            disabled={page === 1}
            onPress={() => setPage((p) => p - 1)}
          >
            <Ionicons name="chevron-back" size={14} color={colors.textGrey} />
          </TouchableOpacity>
          {Array.from({ length: totalPages }).map((_, i) => (
            <TouchableOpacity
              key={i}
              style={[detailSalleStyles.pageBtn, page === i + 1 && detailSalleStyles.pageBtnActive]}
              onPress={() => setPage(i + 1)}
            >
              <Text style={[detailSalleStyles.pageBtnText, page === i + 1 && detailSalleStyles.pageBtnTextActive]}>
                {i + 1}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={detailSalleStyles.pageBtn}
            disabled={page === totalPages}
            onPress={() => setPage((p) => p + 1)}
          >
            <Ionicons name="chevron-forward" size={14} color={colors.textGrey} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
