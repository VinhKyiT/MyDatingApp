import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn/dist';

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const tw = useTailwind();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={[tw('h-full bg-red-500 pt-20'), { opacity: 0.89 }]}>
      <View style={tw('justify-center px-10 pt-20')}>
        <Image
          source={{
            uri: 'https://e9digital.com/love-at-first-website/images/its-a-match.png',
          }}
        />
      </View>
      <Text style={tw('text-white text-center mt-5')}>
        You and {userSwiped.displayName} have a match!
      </Text>
      <View style={tw('flex-row justify-evenly mt-5')}>
        <Image
          style={tw('h-32 w-32 rounded-full border-2 border-white')}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          style={tw('h-32 w-32 rounded-full border-2 border-white')}
          source={{ uri: userSwiped.photoURL }}
        />
      </View>
      <TouchableOpacity
        style={tw('bg-white m-5 px-10 py-8 rounded-full mt-20')}
        onPress={() => {
          navigation.goBack();
          navigation.navigate('Chat');
        }}>
        <Text style={tw('text-center')}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
