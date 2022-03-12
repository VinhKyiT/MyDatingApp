import { View, Text, Button } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const tw = useTailwind();
  return (
    <View style={tw('flex-1 items-center justify-center')}>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate('Chat')}></Button>
    </View>
  );
};

export default HomeScreen;
