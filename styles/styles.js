import { StyleSheet } from "react-native";
import { RADIUS, SHADOW, SPACING } from "../constants/theme";

// Toutes les feuilles de style dépendent de COLORS, qui change selon le
// thème clair/sombre actif — on construit donc tout dans une fonction
// plutôt que des objets statiques, recalculée par useStyles() à chaque
// changement de thème (voir context/ThemeContext.js).
export default function createStyles(COLORS) {

// ============================================================
// 1. COMMUN — Conteneurs, layout de base
// ============================================================

const commonStyles = StyleSheet.create({
  // Écran principal avec SafeAreaView
  safe: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  safeGrey: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // ScrollView padding interne
  scroll: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 100, // espace footer
  },
  scrollWithTop: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: 100,
  },
  // Ligne décorative rouge M2L
  redDivider: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.red,
    borderRadius: 2,
  },
  // État vide (aucun résultat)
  emptyState: {
    alignItems: "center",
    paddingTop: SPACING.xxl,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textGrey,
    marginTop: SPACING.md,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.grey,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
});

// ============================================================
// 2. NAVIGATION — Header d'écran & Footer
// ============================================================

const navigationStyles = StyleSheet.create({
  // ── Header ──────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
    flex: 1,
    textAlign: "center",
  },
  headerTitleLeft: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  headerLocation: {
    fontSize: 13,
    color: COLORS.textGrey,
    marginLeft: 4,
  },
  backBtn: {
    padding: 4,
    width: 32,
  },
  settingsBtn: {
    padding: 4,
    width: 32,
    alignItems: "flex-end",
  },
  // ── Menu déroulant engrenage (Mon profil / Paramètres) ──
  settingsMenuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  settingsMenu: {
    position: "absolute",
    top: 56,
    right: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingVertical: 4,
    minWidth: 170,
    ...SHADOW.md,
  },
  settingsMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
  },
  settingsMenuText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  settingsMenuSep: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.sm,
  },
  // ── Footer ──────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOW.sm,
  },
  footerTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  footerLabel: {
    fontSize: 10,
    marginTop: 3,
    fontWeight: "500",
    color: COLORS.grey,
  },
  footerLabelActive: {
    color: COLORS.red,
    fontWeight: "700",
  },
});

// ============================================================
// 3. AUTH — LoginHome, Login, Register
// ============================================================

const authStyles = StyleSheet.create({
  // Conteneur principal
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // SVG de fond
  background: {
    position: "absolute",
    right: -20,
    top: -20,
    opacity: 0.3,
  },
  // Scroll interne
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  // En-tête logo
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: SPACING.xl,
  },
  headerCompact: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: SPACING.lg,
  },
  appName: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.darkRed,
    letterSpacing: 5,
    marginTop: SPACING.sm,
  },
  // Page d'accueil (LoginHome)
  homeContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  homeContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: COLORS.darkRed,
    letterSpacing: 6,
    marginTop: SPACING.md,
  },
  homeSubtitle: {
    fontSize: 17,
    color: COLORS.textGrey,
    letterSpacing: 1,
    marginTop: SPACING.xs,
  },
  homeTagline: {
    fontSize: 20,
    color: COLORS.textGrey,
    textAlign: "center",
    lineHeight: 22,
  },
  homeActions: {
    gap: SPACING.sm,
  },
  // Carte formulaire
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOW.md,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  formSubtitle: {
    fontSize: 14,
    color: COLORS.textGrey,
    marginBottom: SPACING.xl,
  },
  // Lien pied de formulaire
  formFooter: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.lg,
  },
  formFooterText: {
    color: COLORS.textGrey,
    fontSize: 14,
  },
  formFooterLink: {
    color: COLORS.red,
    fontWeight: "700",
    fontSize: 14,
  },
});

// ============================================================
// 4. COMPOSANTS COMMUNS — Inputs, boutons, badges, cartes
// ============================================================

const componentStyles = StyleSheet.create({
  // ── Champ de saisie ──────────────────────────────────────
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 13,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  // ── Barre de recherche ───────────────────────────────────
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.lightGrey,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  // ── Boutons ──────────────────────────────────────────────
  btnPrimary: {
    backgroundColor: COLORS.red,
    paddingVertical: 15,
    borderRadius: RADIUS.md,
    alignItems: "center",
    ...SHADOW.sm,
  },
  btnPrimaryText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  btnSecondary: {
    backgroundColor: COLORS.surface,
    paddingVertical: 15,
    borderRadius: RADIUS.md,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.red,
  },
  btnSecondaryText: {
    color: COLORS.red,
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  btnOutline: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    borderWidth: 1.5,
    borderColor: COLORS.red,
  },
  btnOutlineText: {
    color: COLORS.red,
    fontSize: 12,
    fontWeight: "700",
  },
  btnRow: {
    flexDirection: "row",
    backgroundColor: COLORS.red,
    borderRadius: RADIUS.md,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    ...SHADOW.sm,
  },
  btnRowText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.4,
  },
  btnRowDisabled: {
    backgroundColor: COLORS.grey,
  },
  // ── Badges ───────────────────────────────────────────────
  badgeDark: {
    backgroundColor: COLORS.darkRed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  badgeDarkText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  // ── Cartes ───────────────────────────────────────────────
  cardBase: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: "hidden",
    ...SHADOW.sm,
  },
  cardAccent: {
    width: 4,
    alignSelf: "stretch",
    backgroundColor: COLORS.red,
  },
  cardBody: {
    flex: 1,
    padding: SPACING.md,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  // ── Onglets pill ─────────────────────────────────────────
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.lightGrey,
    borderRadius: RADIUS.full,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: RADIUS.full,
  },
  tabBtnActive: {
    backgroundColor: COLORS.red,
    ...SHADOW.sm,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textGrey,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  // ── Notation étoiles ─────────────────────────────────────
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ratingNote: {
    fontSize: 12,
    color: COLORS.textGrey,
    marginLeft: 4,
    fontWeight: "600",
  },
  // ── Adresse ──────────────────────────────────────────────
  adresseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  adresseText: {
    fontSize: 12,
    color: COLORS.textGrey,
    flex: 1,
  },
  cardCapaciteRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  cardCapaciteText: {
    fontSize: 12,
    color: COLORS.textGrey,
    marginLeft: 4,
  },
  // ── Bandeaux d'écran (header coloré) ─────────────────────
  banner: {
    backgroundColor: COLORS.darkRed,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
    overflow: "hidden",
  },
  bannerCircle: {
    position: "absolute",
    right: -30,
    top: -30,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  // ── Modal ─────────────────────────────────────────────────
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: "center",
    width: "100%",
    ...SHADOW.md,
  },
  modalCardBottom: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    padding: SPACING.xl,
    ...SHADOW.md,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  modalText: {
    fontSize: 14,
    color: COLORS.textGrey,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: SPACING.lg,
  },
  modalDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  modalBtns: {
    flexDirection: "row",
    gap: SPACING.sm,
    width: "100%",
    marginTop: SPACING.lg,
  },
  modalBtnBack: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  modalBtnBackText: {
    color: COLORS.textGrey,
    fontWeight: "700",
    fontSize: 14,
  },
  modalBtnConfirm: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: "center",
    backgroundColor: COLORS.red,
    ...SHADOW.sm,
  },
  modalBtnConfirmText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
  // Icône cercle de succès
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.red,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },

  // ── Sélecteur déroulant (ex : choix de la ligue) ─────────
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightGrey,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 13,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectBoxLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  selectBoxText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  selectBoxPlaceholder: {
    color: COLORS.grey,
  },
  selectModalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: "100%",
    maxHeight: "70%",
    ...SHADOW.md,
  },
  selectOption: {
    paddingVertical: 14,
  },
  selectOptionText: {
    fontSize: 15,
    color: COLORS.text,
  },
  selectOptionTextSelected: {
    color: COLORS.red,
    fontWeight: "700",
  },
  selectOptionSep: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  // Message d'erreur inline
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFF0F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.red,
  },
});

// ============================================================
// 5. ACCUEIL — Grille de catégories
// ============================================================

const accueilStyles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: 0.3,
    marginTop: SPACING.xl,
    lineHeight: 34,
  },
  sectionLabel: {
    fontSize: 13,
    color: COLORS.textGrey,
    fontWeight: "500",
    marginBottom: SPACING.md,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  // Carte catégorie
  categoryCard: {
    width: "47.5%",
    height: 110,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    justifyContent: "flex-end",
    overflow: "hidden",
    ...SHADOW.sm,
  },
  categoryCardDot: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  categoryCardText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.5,
  },
});

// ============================================================
// 6. LISTE SALLES — Liste des salles par catégorie
// ============================================================

const listeSallesStyles = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  resultCount: {
    fontSize: 12,
    color: COLORS.textGrey,
    marginTop: SPACING.sm,
    marginLeft: 4,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: 90,
  },
  // Infos capacité
  capaciteRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  capaciteText: {
    fontSize: 12,
    color: COLORS.textGrey,
    marginLeft: 4,
  },
});

// ============================================================
// 7. DÉTAIL SALLE — Fiche descriptive
// ============================================================

const detailSalleStyles = StyleSheet.create({
  // Bandeau
  bannerBack: {
    padding: 4,
    marginBottom: SPACING.md,
    alignSelf: "flex-start",
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: SPACING.sm,
  },
  categoryBadgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.white,
    letterSpacing: 0.3,
    lineHeight: 30,
  },
  // Photo de la salle
  photo: {
    width: "100%",
    height: 190,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.lg,
    backgroundColor: COLORS.lightGrey,
  },
  photoPlaceholder: {
    width: "100%",
    height: 190,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.lg,
    backgroundColor: COLORS.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.xs,
  },
  photoPlaceholderText: {
    fontSize: 12,
    color: COLORS.grey,
  },
  // Aperçu disponibilités (navigation jour par jour)
  dispoNavRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  dispoNavBtn: {
    padding: 6,
    backgroundColor: COLORS.lightGrey,
    borderRadius: RADIUS.full,
  },
  dispoDate: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    textTransform: "capitalize",
  },
  // Carte info
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    ...SHADOW.md,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginLeft: 6,
  },
  ratingCount: {
    fontSize: 12,
    color: COLORS.grey,
    marginLeft: 4,
  },
  // Ligne d'info (icône + texte)
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  infoIconBox: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.sm,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textGrey,
    flex: 1,
  },
  // Sections
  section: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 14,
    color: COLORS.textGrey,
    lineHeight: 21,
  },
  emptyHint: {
    fontSize: 13,
    color: COLORS.grey,
    fontStyle: "italic",
  },
  // Horaires d'ouverture
  horaireRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  horaireJour: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    textTransform: "capitalize",
  },
  horaireHeures: {
    fontSize: 13,
    color: COLORS.textGrey,
    marginRight: SPACING.sm,
  },
  horaireFerme: {
    fontSize: 13,
    color: COLORS.grey,
    marginRight: SPACING.sm,
  },
  horaireStatutBadge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  horaireStatutOuvert: {
    backgroundColor: "#F0FFF4",
  },
  horaireStatutFerme: {
    backgroundColor: COLORS.lightGrey,
  },
  horaireStatutText: {
    fontSize: 10,
    fontWeight: "700",
  },
  horaireStatutTextOuvert: {
    color: "#2E7D32",
  },
  horaireStatutTextFerme: {
    color: COLORS.grey,
  },
  // Avis adhérents
  avisHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  avisAverage: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginRight: SPACING.sm,
  },
  avisFilterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.lightGrey,
    borderRadius: RADIUS.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterChipActive: {
    backgroundColor: COLORS.red,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textGrey,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  avisItem: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avisItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.xs,
  },
  avisUserRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  avisAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.red,
    justifyContent: "center",
    alignItems: "center",
  },
  avisAvatarText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 13,
  },
  avisUser: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  avisDate: {
    fontSize: 11,
    color: COLORS.grey,
  },
  avisContent: {
    fontSize: 13,
    color: COLORS.textGrey,
    lineHeight: 19,
  },
  avisEmpty: {
    alignItems: "center",
    paddingVertical: SPACING.lg,
    gap: SPACING.xs,
  },
  avisEmptyText: {
    fontSize: 13,
    color: COLORS.grey,
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.xs,
    marginTop: SPACING.md,
  },
  pageBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.lightGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  pageBtnActive: {
    backgroundColor: COLORS.red,
  },
  pageBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textGrey,
  },
  pageBtnTextActive: {
    color: COLORS.white,
  },
});

// ============================================================
// 8. CALENDRIER — Réservation (calendrier + créneaux + modal)
// ============================================================

const calendrierStyles = StyleSheet.create({
  // Bandeau
  bannerRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.darkRed,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
    overflow: "hidden",
  },
  bannerType: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  bannerName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },
  // Toggle Unique / Mensuel
  toggle: {
    flexDirection: "row",
    backgroundColor: COLORS.lightGrey,
    borderRadius: RADIUS.full,
    padding: 3,
    marginBottom: SPACING.md,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: RADIUS.full,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.red,
    ...SHADOW.sm,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textGrey,
  },
  toggleTextActive: {
    color: COLORS.white,
  },
  mensuelInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF5F5",
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    gap: 6,
  },
  mensuelText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.red,
    lineHeight: 18,
  },
  // Boîte calendrier
  calBox: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOW.sm,
  },
  monthNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  navBtn: { padding: 6 },
  monthTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  daysRow: {
    flexDirection: "row",
    marginBottom: SPACING.xs,
  },
  dayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 11,
    color: COLORS.grey,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  gridCal: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cellToday: {
    borderWidth: 1.5,
    borderColor: COLORS.red,
    borderRadius: RADIUS.full,
  },
  cellSel: {
    backgroundColor: COLORS.red,
    borderRadius: RADIUS.full,
  },
  cellText: {
    fontSize: 14,
    color: COLORS.text,
  },
  cellTextToday: {
    color: COLORS.red,
    fontWeight: "700",
  },
  cellTextSel: {
    color: COLORS.white,
    fontWeight: "700",
  },
  cellInRange: {
    backgroundColor: "#FFF0F0",
  },
  cellTextInRange: {
    color: COLORS.red,
    fontWeight: "700",
  },
  cellClosed: {
    opacity: 0.35,
  },
  cellTextClosed: {
    color: COLORS.grey,
    textDecorationLine: "line-through",
  },
  rangeHint: {
    fontSize: 12,
    color: COLORS.textGrey,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  // Créneaux horaires
  subTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyHint: {
    fontSize: 13,
    color: COLORS.grey,
    fontStyle: "italic",
  },
  // Grille de créneaux d'1h (sélection de plage)
  slotsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  selectAllBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    backgroundColor: "#FFF0F0",
  },
  selectAllBtnDisabled: {
    backgroundColor: COLORS.lightGrey,
  },
  selectAllText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.red,
  },
  selectAllTextDisabled: {
    color: COLORS.grey,
  },
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  slotChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
  },
  slotChipSelected: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
  slotChipOccupied: {
    backgroundColor: COLORS.lightGrey,
    borderColor: COLORS.border,
  },
  slotText: {
    fontSize: 13,
    color: COLORS.textGrey,
    fontWeight: "500",
  },
  slotTextSelected: {
    color: COLORS.white,
    fontWeight: "700",
  },
  slotTextOccupied: {
    color: COLORS.grey,
  },
  slotOccupeLabel: {
    fontSize: 10,
    color: COLORS.grey,
    marginTop: 1,
  },
  // Zone de texte description
  textarea: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 100,
    marginBottom: SPACING.lg,
    ...SHADOW.sm,
  },
  // Récap dans la modal
  recapRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
    width: "100%",
  },
  recapLabel: {
    fontSize: 13,
    color: COLORS.textGrey,
    fontWeight: "500",
    width: 70,
  },
  recapValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  typeBadge: {
    backgroundColor: "#FFF0F0",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  typeBadgeMensuel: {
    backgroundColor: "#FFF8E1",
  },
  typeBadgeText: {
    fontSize: 12,
    color: COLORS.red,
    fontWeight: "700",
  },
});

// ============================================================
// 9. RECHERCHE — Recherche par adresse + filtres
// ============================================================

const rechercheStyles = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  tabsContainer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  filtresWrapper: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filtresList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
  },
  filtrePill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  filtrePillActive: {
    backgroundColor: COLORS.darkRed,
    borderColor: COLORS.darkRed,
  },
  filtreText: {
    fontSize: 13,
    color: COLORS.textGrey,
    fontWeight: "500",
  },
  filtreTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: 90,
  },
  resultCount: {
    fontSize: 12,
    color: COLORS.textGrey,
    marginBottom: SPACING.sm,
    fontWeight: "500",
  },
  distanceBadge: {
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  distanceText: {
    fontSize: 11,
    color: COLORS.textGrey,
    fontWeight: "600",
  },
});

// ============================================================
// 10. MES RÉSERVATIONS — Liste et cartes de réservation
// ============================================================

const reservationStyles = StyleSheet.create({
  // Header utilisateur
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.darkRed,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  ligue: {
    fontSize: 12,
    color: COLORS.textGrey,
    marginTop: 1,
  },
  // Titre section
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  sectionAccent: {
    width: 4,
    height: 20,
    backgroundColor: COLORS.red,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 90,
  },
  // Carte réservation
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: SPACING.sm,
  },
  cardRowText: {
    fontSize: 13,
    color: COLORS.textGrey,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // Statuts
  statutBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  statutText: {
    fontSize: 12,
    fontWeight: "700",
  },
  // Bouton vide
  emptyBtn: {
    backgroundColor: COLORS.red,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
  },
  emptyBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
});

// ============================================================
// 11. PARAMÈTRES — Écran de configuration
// ============================================================

const parametresStyles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.grey,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  // Carte de paramètre
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    ...SHADOW.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  rowSub: {
    fontSize: 12,
    color: COLORS.textGrey,
    marginTop: 1,
  },
  sep: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: SPACING.md + 36 + SPACING.md,
  },
  // Bouton déconnexion
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: COLORS.red,
    borderRadius: RADIUS.md,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    marginTop: SPACING.xl,
    ...SHADOW.sm,
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
  },
});

// ============================================================
// 12. PROFIL — Page "Mon profil"
// ============================================================

const profilStyles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
  },
  avatarLarge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.darkRed,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  avatarLargeText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "800",
  },
  nom: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },
  email: {
    fontSize: 13,
    color: COLORS.textGrey,
    marginTop: 2,
  },
  readonlyField: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 13,
    marginBottom: SPACING.md,
  },
  readonlyLabel: {
    fontSize: 11,
    color: COLORS.grey,
    marginBottom: 2,
  },
  readonlyValue: {
    fontSize: 14,
    color: COLORS.textGrey,
  },
  fieldLabel: {
    fontSize: 12,
    color: COLORS.textGrey,
    marginBottom: 6,
    fontWeight: "600",
  },
  successBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: SPACING.md,
  },
  successText: {
    flex: 1,
    fontSize: 13,
    color: "#2E7D32",
  },
});

  return {
    commonStyles,
    navigationStyles,
    authStyles,
    componentStyles,
    accueilStyles,
    listeSallesStyles,
    detailSalleStyles,
    calendrierStyles,
    rechercheStyles,
    reservationStyles,
    parametresStyles,
    profilStyles,
  };
}
