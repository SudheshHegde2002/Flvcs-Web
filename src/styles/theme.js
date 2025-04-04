const lightColors = {
  primary: '#6200EA',    // Deep purple
  secondary: '#B388FF',  // Light purple
  accent: '#3D5AFE',     // Indigo accent
  background: '#F8F9FA',
  cardBg: '#FFFFFF',
  text: '#212121',
  textLight: '#757575',
  border: '#E0E0E0',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FFC107',
};

const darkColors = {
  primary: '#B388FF',    // Light purple (reversed with secondary)
  secondary: '#6200EA',  // Deep purple (reversed with primary)
  accent: '#3D5AFE',     // Indigo accent
  background: '#121212',
  cardBg: '#1E1E1E',
  text: '#FFFFFF',
  textLight: '#BBBBBB',
  border: '#333333',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FFC107',
};

const createTheme = (isDarkMode) => ({
  colors: isDarkMode ? darkColors : lightColors,
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Montserrat', sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
    xxxl: '3rem',
  },
  shadows: isDarkMode ? {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.5)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.6)',
  } : {
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.15)',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
});

// Default export for light theme
export default createTheme(false);

// Named export for theme creation function
export { createTheme }; 