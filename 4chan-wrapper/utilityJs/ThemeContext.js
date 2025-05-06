import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode
    ? {
        mode: 'dark',
        background: '#121212',
        text: '#FFFFFF',
        cardBackground: '#1E1E1E',
        border: '#333',
        headerText: '#FFFFFF',
        itemBackground: '#1E1E1E',
      }
    : {
        mode: 'light',
        background: '#FFFFFF',
        text: '#000000',
        cardBackground: '#F9F9F9',
        border: '#CCC',
        headerText: '#000000',
        itemBackground: '#F5F5F5',
      };

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
