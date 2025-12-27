import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { shadows } from './shadows';

export const theme = {
  colors,
  typography,
  spacing,
  shadows,

  // Border Radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },

  // Screen Dimensions
  screen: {
    padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
};

export type Theme = typeof theme;
export { colors, typography, spacing, shadows };
