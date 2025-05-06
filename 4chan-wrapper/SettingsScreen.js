import React, { useContext } from 'react';
import { View, Text, Switch } from 'react-native';
import { ThemeContext } from './utilityJs/ThemeContext';

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
  );
};

export default SettingsScreen;
