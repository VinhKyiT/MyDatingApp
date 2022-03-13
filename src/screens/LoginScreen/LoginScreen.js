import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { ActivityIndicator } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const tw = useTailwind();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={tw('flex-1')}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={tw('flex-1')}>
          <ImageBackground
            resizeMode="cover"
            style={tw('flex-1')}
            source={require('../../assets/img/splash-screen.png')}>
            <TouchableOpacity
              style={[
                tw('absolute bottom-40 w-52 bg-white p-4 rounded-2xl'),
                { marginHorizontal: '25%' },
              ]}
              onPress={() => signInWithGoogle()}>
              <Text style={tw('font-semibold text-center')}>
                Sign in to the app
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
