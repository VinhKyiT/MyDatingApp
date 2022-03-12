import React from 'react';
import { TailwindProvider } from 'tailwind-rn';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import utilities from './tailwind.json';

const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
