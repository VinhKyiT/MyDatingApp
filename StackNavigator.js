import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import ModalScreen from './src/screens/ModalScreen/ModalScreen';
import MatchScreen from './src/screens/MatchScreen/MatchScreen';
import useAuth from './src/hooks/useAuth';
import MessagesScreen from './src/screens/MessagesScreen/MessagesScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user, error } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
            <Stack.Screen name="Match" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
