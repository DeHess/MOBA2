import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './utilityJs/ThemeContext';
import BoardOverviewScreen from './BoardOverviewScreen';
import BoardScreen from './BoardScreen';
import ThreadScreen from './ThreadScreen';
import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BoardOverviewScreen" component={BoardOverviewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BoardScreen" component={BoardScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ThreadScreen" component={ThreadScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
