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
