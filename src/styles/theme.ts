const baseTheme = {
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  }
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#ec4899',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceLight: '#334155',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    border: '#334155',
    success: '#10b981',
    error: '#ef4444',
  }
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#ec4899',
    background: '#f8fafc',
    surface: '#ffffff',
    surfaceLight: '#f1f5f9',
    text: '#0f172a',
    textMuted: '#64748b',
    border: '#e2e8f0',
    success: '#10b981',
    error: '#ef4444',
  }
};

export type ThemeType = typeof darkTheme;
