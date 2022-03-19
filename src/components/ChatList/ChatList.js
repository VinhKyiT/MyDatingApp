import { View, Text } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';

const ChatList = () => {
  const tw = useTailwind();
  const navigation = useNavigation();

  return (
    <View>
      <Text>ChatList</Text>
    </View>
  );
};

export default ChatList;
