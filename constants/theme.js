// Palette de couleurs M2L — cohérente avec l'application web
export const COLORS = {
  // Rouges principaux
  red:        '#CC4040',
  darkRed:    '#430000',

  // Neutres
  grey:       '#ADABAB',
  lightGrey:  '#F4F4F4',
  border:     '#E5E5E5',
  white:      '#FFFFFF',
  background: '#FAFAFA',

  // Textes
  text:       '#1A1A1A',
  textGrey:   '#666666',
  textLight:  '#ADABAB',

  // Overlay modal
  overlay:    'rgba(0,0,0,0.50)',
};

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
// une différente quand un nouveau type est ajouté.
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
