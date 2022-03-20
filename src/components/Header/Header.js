import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, callEnable }) => {
  const tw = useTailwind();
  const navigation = useNavigation();

  return (
    <View style={tw('p-2 flex-row items-center justify-between')}>
      <View style={tw('flex flex-row items-center')}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw('p-2')}>
          <Icon name="chevron-back-outline" size={34} color="#ff5864" />
        </TouchableOpacity>
        <Text style={tw('text-2xl font-bold p-2 dark:text-white')}>
          {title}
        </Text>
      </View>
      {callEnable && (
        <TouchableOpacity style={tw('rounded-full mr-4 p-3 bg-red-200')}>
          <Icon name="call" size={20} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
