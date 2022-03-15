import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../../hooks/useAuth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { useNavigation } from '@react-navigation/native';

const ModalScreen = () => {
  const tw = useTailwind();
  const [image, setImage] = useState('');
  const [job, setJob] = useState('');
  const [age, setAge] = useState('');

  const navigation = useNavigation();

  const inCompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job,
      age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const { user } = useAuth();

  return (
    <View style={tw('flex-1 items-center pt-1')}>
      <Image
        style={tw('w-full h-20')}
        resizeMode="contain"
        source={{
          uri: 'https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo.png',
        }}
      />
      <Text style={tw('text-xl text-gray-500 p-2 font-bold')}>
        Welcome {user.displayName}
      </Text>
      <Text style={tw('text-center text-red-400 p-4 font-bold')}>
        Step 1: The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter Profile Pic URL"
      />
      <Text style={tw('text-center text-red-400 p-4 font-bold')}>
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter Your Job"
      />
      <Text style={tw('text-center text-red-400 p-4 font-bold')}>
        Step 3: The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={tw('text-center text-xl pb-2')}
        placeholder="Enter Your Age"
        maxLength={2}
        keyboardType="numeric"
      />
      <TouchableOpacity
        disabled={inCompleteForm}
        onPress={() => updateUserProfile()}
        style={[
          tw('w-64 p-3 rounded-xl absolute bottom-10'),
          inCompleteForm ? tw('bg-gray-400') : tw('bg-red-400'),
        ]}>
        <Text style={tw('text-center text-white text-xl')}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
