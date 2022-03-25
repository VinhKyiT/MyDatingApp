import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../../hooks/useAuth';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, logOut } = useAuth();
  const tw = useTailwind();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw('relative flex-1 bg-white dark:bg-zinc-900')}>
      <View style={tw('flex-row h-20 py-3')}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="chevron-left"
            size={30}
            style={tw('ml-3 text-black dark:text-white')}
          />
        </TouchableOpacity>
        <Text style={tw('font-bold text-xl ml-5 text-black dark:text-white')}>
          Profile
        </Text>
      </View>
      <View style={tw('justify-center items-center')}>
        <View style={tw('relative')}>
          <Image
            source={{ uri: user.photoURL }}
            style={tw('w-40 h-40 rounded-full')}
          />
          <View style={tw('absolute bottom-2 right-2 rounded-full bg-red-400')}>
            <Feather name="plus" size={24} color="#fff" style={tw('p-1')} />
          </View>
        </View>
        <View style={tw('flex-row w-full justify-evenly mt-10')}>
          <TouchableOpacity style={tw('p-3 bg-gray-200 rounded-full')}>
            <Ionicons name="settings-sharp" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={tw('p-3 bg-gray-200 rounded-full')}>
            <Feather name="edit-3" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={tw('p-3 bg-gray-200 rounded-full')}>
            <Ionicons name="md-umbrella" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={tw(
          'flex-1 absolute w-full bottom-10 justify-center items-center mx-3',
        )}>
        <TouchableOpacity
          style={tw('bg-red-400 rounded-xl')}
          onPress={() => logOut()}>
          <Text style={tw('px-8 py-3 text-center text-white font-semibold')}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
