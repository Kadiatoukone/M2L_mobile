// Composant partagé pour les trois états intermédiaires d'une page :
//  - chargement  : affiche un indicateur de chargement
//  - erreur      : affiche un message d'erreur réseau
//  - vide        : affiche un message quand il n'y a rien à afficher
//
// Props :
//  - chargement    : true pendant le chargement
//  - erreur        : message d'erreur à afficher (ou null)
//  - vide          : true s'il n'y a aucun résultat
//  - iconeVide     : nom de l'icône à afficher (Ionicons)
//  - titreVide     : titre du message vide
//  - sousTitreVide : sous-titre du message vide

import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useStyles } from "../context/ThemeContext";

export default function EtatChargement({
  chargement = false,
  erreur = null,
  vide = false,
  iconeVide = "albums-outline",
  titreVide = "",
  sousTitreVide = "",
}) {
  const { colors } = useTheme();
  const { commonStyles } = useStyles();

  if (chargement) {
    return (
      <View style={commonStyles.emptyState}>
        <ActivityIndicator size="large" color={colors.red} />
      </View>
    );
  }

  if (erreur) {
    return (
      <View style={commonStyles.emptyState}>
        <Ionicons name="wifi-outline" size={48} color={colors.border} />
        <Text style={commonStyles.emptyTitle}>Impossible de charger</Text>
        <Text style={commonStyles.emptySub}>{erreur}</Text>
      </View>
    );
  }

  if (vide) {
    return (
      <View style={commonStyles.emptyState}>
        <Ionicons name={iconeVide} size={48} color={colors.border} />
        {titreVide ? <Text style={commonStyles.emptyTitle}>{titreVide}</Text> : null}
        {sousTitreVide ? <Text style={commonStyles.emptySub}>{sousTitreVide}</Text> : null}
      </View>
    );
  }

  return null;
}
