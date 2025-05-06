import React, { useContext } from 'react';
import { View, Text, Switch } from 'react-native';
import { ThemeContext } from './utilityJs/ThemeContext'; // Import ThemeContext
import getStyles from './utilityJs/styles'; // Import getStyles function

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext); // Get current theme and toggle function
  const styles = getStyles(theme); // Apply theme-aware styles

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontSize: 18, marginBottom: 10 }]}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
  );
};

export default SettingsScreen;
