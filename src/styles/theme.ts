import { colors } from './colors';
import { sizes } from './sizes';

export const darkTheme = {
  ...sizes,
  colors: {
    ...colors.common,
    ...colors.dark,
  }
} as const;

export const lightTheme = {
  ...sizes,
  colors: {
    ...colors.common,
    ...colors.light,
  }
} as const;

export type ThemeType = typeof darkTheme;
