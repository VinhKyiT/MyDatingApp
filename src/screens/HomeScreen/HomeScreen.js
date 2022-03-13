import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';

const HomeScreen = () => {
  const navigation = useNavigation();
  const tw = useTailwind();
  const { user, logOut } = useAuth();

  const DEMO_DATA = [
    {
      id: 1,
      firstName: 'Ky',
      lastName: 'Bui',
      occupation: 'Software Engineer',
      photoURL: 'https://avatars.githubusercontent.com/u/38911691?v=4',
      age: '21',
    },
    {
      id: 2,
      firstName: 'Anh',
      lastName: 'Nguyen',
      occupation: 'Software Engineer',
      photoURL: 'https://avatars.githubusercontent.com/u/86947758?v=4',
      age: '22',
    },
    {
      id: 3,
      firstName: 'Trieu',
      lastName: 'Tran',
      occupation: 'Software Engineer',
      photoURL: 'https://avatars.githubusercontent.com/u/79587394?v=4',
      age: '23',
    },
    {
      id: 4,
      firstName: 'An',
      lastName: 'Nguyen',
      occupation: 'Software Engineer',
      photoURL: 'https://avatars.githubusercontent.com/u/79587394?v=4',
      age: '24',
    },
    {
      id: 5,
      firstName: 'Tin',
      lastName: 'Mai',
      occupation: 'Software Engineer',
      photoURL: 'https://avatars.githubusercontent.com/u/73238680?v=4',
      age: '25',
    },
  ];

  return (
    <SafeAreaView style={tw('flex-1')}>
      {/* Header */}
      <View style={tw('flex-row items-center relative justify-between p-5')}>
        <TouchableOpacity style={tw('')} onPress={() => logOut()}>
          <Image
            source={{ uri: user.photoURL }}
            style={tw('w-10 h-10 rounded-full')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/img/logo.png')}
            style={tw('w-14 h-14')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw('')}
          onPress={() => navigation.navigate('Chat')}>
          <Icon name="chatbubbles-sharp" size={30} color="#5cb6f9" />
        </TouchableOpacity>
      </View>
      {/* Header End */}

      <View style={tw('flex-1 -mt-6')}>
        <Swiper
          containerStyle={{ backgroundColor: 'transparent' }}
          stackSize={5}
          cards={DEMO_DATA}
          renderCard={card => (
            <View key={card.id} style={tw('bg-white h-3/4 rounded-xl')}>
              <Image
                style={tw('w-full h-full rounded-xl')}
                source={{ uri: card.photoURL }}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
