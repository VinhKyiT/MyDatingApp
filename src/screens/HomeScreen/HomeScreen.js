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

const HomeScreen = () => {
  const navigation = useNavigation();
  const tw = useTailwind();
  const { user, logOut } = useAuth();

  console.log({ user });

  return (
    <SafeAreaView>
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
      {/* <Text>HomeScreen</Text>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate('Chat')}></Button>
      <Button title="Logout" onPress={() => logOut()}></Button> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
