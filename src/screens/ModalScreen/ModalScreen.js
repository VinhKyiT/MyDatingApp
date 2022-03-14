import { View, Image } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';

const ModalScreen = () => {
  const tw = useTailwind();
  return (
    <View style={tw('flex-1 items-center pt-1')}>
      <Image
        style={tw('w-full h-20')}
        resizeMode="contain"
        source={{
          uri: 'https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo.png',
        }}
      />
    </View>
  );
};

export default ModalScreen;
