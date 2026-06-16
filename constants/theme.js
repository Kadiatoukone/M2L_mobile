// Couleurs de l'application — deux versions : claire et sombre.
// Toutes les pages utilisent ces couleurs, donc changer de thème
// met à jour l'application entière automatiquement.

export const LIGHT_COLORS = {
  // Rouge M2L (couleur principale)
  red:        '#CC4040',
  darkRed:    '#430000',

  // Gris
  grey:       '#ADABAB',
  lightGrey:  '#F4F4F4',
  border:     '#E5E5E5',

  // Fond des cartes, headers, modales
  surface:    '#FFFFFF',
  // Fond des pages
  background: '#FAFAFA',
  // Blanc pur — utilisé pour les textes sur fond coloré (reste blanc dans les deux thèmes)
  white:      '#FFFFFF',

  // Couleurs des textes
  text:       '#1A1A1A',
  textGrey:   '#666666',
  textLight:  '#ADABAB',

  // Fond des popups (transparence noire)
  overlay:    'rgba(0,0,0,0.50)',
};

// Même structure, mais avec des tons plus sombres
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

// Par défaut on utilise le thème clair
export const COLORS = LIGHT_COLORS;

// Espacements utilisés partout dans le projet
export const SPACING = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
};

// Arrondis des coins
export const RADIUS = {
  sm:   8,
  md:   12,
  lg:   16,
  full: 100,
};

// Couleurs pour les cartes de catégorie sur l'accueil.
// Il y en a plus qu'il n'y a de types de salles dans la BDD,
// pour s'assurer que chaque carte aura toujours une couleur différente.
export const CATEGORY_COLORS = [
  '#1B5E20', '#B71C1C', '#E65100', '#F57F17', '#4A148C',
  '#01579B', '#33691E', '#880E4F', '#006064', '#3E2723',
  '#283593', '#AD1457', '#827717', '#4E342E', '#37474F',
  '#6A1B9A',
];

// Ombres pour donner de la profondeur aux cartes
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
