// Palette de couleurs M2L — cohérente avec l'application web.
// Deux variantes (clair / sombre) partageant les mêmes clés : tous les
// écrans/styles consomment ces clés via useTheme()/useStyles(), donc
// switcher de palette suffit à changer l'app entière de thème.
export const LIGHT_COLORS = {
  // Rouges principaux
  red:        '#CC4040',
  darkRed:    '#430000',

  // Neutres
  grey:       '#ADABAB',
  lightGrey:  '#F4F4F4',
  border:     '#E5E5E5',

  // Surfaces (cartes, header, footer, modals...) vs fond de page
  surface:    '#FFFFFF',
  background: '#FAFAFA',
  // Conservé pour les usages "blanc pur" (texte blanc sur fond coloré,
  // qui doit rester blanc quel que soit le thème).
  white:      '#FFFFFF',

  // Textes
  text:       '#1A1A1A',
  textGrey:   '#666666',
  textLight:  '#ADABAB',

  // Overlay modal
  overlay:    'rgba(0,0,0,0.50)',
};

export const DARK_COLORS = {
  red:        '#E05656',
  darkRed:    '#2A0000',

  grey:       '#8A8A8A',
  lightGrey:  '#2A2A2A',
  border:     '#3A3A3A',

  surface:    '#1E1E1E',
  background: '#121212',
  white:      '#FFFFFF',

  text:       '#F2F2F2',
  textGrey:   '#B0B0B0',
  textLight:  '#8A8A8A',

  overlay:    'rgba(0,0,0,0.70)',
};

// Rétro-compatibilité : quelques fichiers importent encore COLORS de façon
// statique (hors du contexte de thème). Pointe vers la palette claire par
// défaut — préférez useTheme()/useStyles() pour un rendu qui réagit au
// thème choisi par l'utilisateur.
export const COLORS = LIGHT_COLORS;

// Espacements communs
export const SPACING = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
};

// Rayons de bordure communs
export const RADIUS = {
  sm:   8,
  md:   12,
  lg:   16,
  full: 100,
};

// Palette de couleurs pour les cartes de catégorie (Accueil).
// Une couleur est piochée par type de salle venant de la BDD ; en avoir
// plus que de types possibles garantit qu'on peut toujours en attribuer
// une différente quand un nouveau type est ajouté. Volontairement fixe
// (mêmes couleurs vives dans les deux thèmes).
export const CATEGORY_COLORS = [
  '#1B5E20', '#B71C1C', '#E65100', '#F57F17', '#4A148C',
  '#01579B', '#33691E', '#880E4F', '#006064', '#3E2723',
  '#283593', '#AD1457', '#827717', '#4E342E', '#37474F',
  '#6A1B9A',
];

// Élévations / ombres communes
export const SHADOW = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
};
