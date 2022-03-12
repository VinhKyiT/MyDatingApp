import React from 'react';
import { TailwindProvider } from 'tailwind-rn';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import utilities from './tailwind.json';
import { AuthProvider } from './src/hooks/useAuth';

const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
