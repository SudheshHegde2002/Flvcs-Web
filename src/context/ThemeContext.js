import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from '../styles/theme';

// Create context
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check local storage for saved theme preference
  const getSavedThemePreference = () => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme === 'true';
  };

  const [isDarkMode, setIsDarkMode] = useState(getSavedThemePreference());
  
  // Generate theme based on current mode
  const theme = createTheme(isDarkMode);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Save theme preference to local storage when it changes
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}; 