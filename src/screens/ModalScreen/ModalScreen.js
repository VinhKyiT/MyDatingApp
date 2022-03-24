import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../../hooks/useAuth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, storage } from '../../Firebase';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ProgressBar from 'react-native-progress/Bar';

const ModalScreen = () => {
  const tw = useTailwind();
  const [image, setImage] = useState('');
  const [job, setJob] = useState('');
  const [age, setAge] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const { user } = useAuth();

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

  const launchCamera = async () => {
    ImagePicker.openCamera({})
      .then(async image => {
        const fileRef = ref(storage, `images/${user.uid}/${image.filename}`);
        const img = await fetch(image.path);
        const bytes = await img.blob();
        const uploadTask = uploadBytesResumable(fileRef, bytes);
        uploadTask.on(
          'state_changed',
          snapshot => {
            setImageUploading(true);
            setPercentage(snapshot.bytesTransferred / snapshot.totalBytes);
          },
          error => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              setImage(downloadURL);
            });
          },
        );
      })
      .catch(err => console.log(err));
  };

  const openLibrary = async () => {
    ImagePicker.openPicker({ mediaType: 'photo' }).then(async image => {
      const fileRef = ref(storage, `images/${user.uid}/${image.filename}`);
      const img = await fetch(image.path);
      const bytes = await img.blob();
      const uploadTask = uploadBytesResumable(fileRef, bytes);
      uploadTask.on(
        'state_changed',
        snapshot => {
          setImageUploading(true);
          setPercentage(snapshot.bytesTransferred / snapshot.totalBytes);
        },
        error => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setImage(downloadURL);
          });
        },
      );
    });
  };

  return (
    <View style={tw('bg-white dark:bg-zinc-900 flex-1 items-center pt-1')}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw('flex-1 items-center')}
        keyboardVerticalOffset={10}>
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
        {!image ? (
          !imageUploading ? (
            <>
              <TouchableOpacity onPress={() => openLibrary()}>
                <Text>Choose from Library</Text>
              </TouchableOpacity>
              <Text>or</Text>
              <TouchableOpacity onPress={() => launchCamera()}>
                <Text>Take a Photo</Text>
              </TouchableOpacity>
            </>
          ) : (
            <ProgressBar progress={percentage} color="#f87171" />
          )
        ) : (
          <Image
            resizeMode="cover"
            source={{ uri: image }}
            style={tw('w-1/2 h-40 rounded-lg')}
          />
        )}
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
          <Text style={tw('text-center text-white text-xl')}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ModalScreen;
