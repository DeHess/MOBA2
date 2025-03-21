import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BoardOverviewScreen from './BoardOverviewScreen';
import BoardScreen from './BoardScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BoardOverviewScreen" component={BoardOverviewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BoardScreen" component={BoardScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
