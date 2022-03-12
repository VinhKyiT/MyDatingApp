import { View, Text } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';

const HomeScreen = () => {
  const tw = useTailwind();
  return (
    <View style={tw('flex-1 items-center justify-center')}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
