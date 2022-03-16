import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../Firebase';

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

const HomeScreen = () => {
  const navigation = useNavigation();
  const tw = useTailwind();
  const [profiles, setProfiles] = useState([]);
  const { user, logOut } = useAuth();
  const swipeRef = useRef(null);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, 'users', user.uid), snapshot => {
        if (!snapshot.exists()) navigation.navigate('Modal');
      }),
    [],
  );

  useEffect(() => {
    let unsub;
    const fetchCard = async () => {
      unsub = onSnapshot(collection(db, 'users'), snapshot => {
        setProfiles(
          snapshot.docs
            .filter(doc => doc.id !== user.uid)
            .map(doc => ({
              id: doc.id,
              ...doc.data(),
            })),
        );
      });
    };
    fetchCard();
    return unsub;
  }, []);

  const DEMO_DATA = [
    {
      id: 1,
      firstName: 'Ky',
      lastName: 'Bui',
      job: 'Software Engineer',
      photoURL: 'https://avatars.githubusercontent.com/u/38911691?v=4',
      age: '21',
    },
    {
      id: 2,
      firstName: 'Anh',
      lastName: 'Nguyen',
      job: 'Software Engineer',
      photoURL: 'https://avatars.githubusercontent.com/u/86947758?v=4',
      age: '22',
    },
    {
      id: 3,
      firstName: 'Trieu',
      lastName: 'Tran',
      job: 'Software Engineer',
      photoURL: 'https://avatars.githubusercontent.com/u/79587394?v=4',
      age: '23',
    },
    {
      id: 4,
      firstName: 'An',
      lastName: 'Nguyen',
      job: 'Software Engineer',
      photoURL: 'https://avatars.githubusercontent.com/u/79587394?v=4',
      age: '24',
    },
    {
      id: 5,
      firstName: 'Tin',
      lastName: 'Mai',
      job: 'Software Engineer',
      photoURL: 'https://avatars.githubusercontent.com/u/73238680?v=4',
      age: '25',
    },
  ];

  return (
    <SafeAreaView style={tw('flex-1 bg-slate-200 dark:bg-gray-800')}>
      {/* Header */}
      <View
        style={tw('flex-row items-center relative justify-between px-5 py-2')}>
        <TouchableOpacity style={tw('')} onPress={() => logOut()}>
          <Image
            source={{ uri: user.photoURL }}
            style={tw('w-10 h-10 rounded-full')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
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
          ref={swipeRef}
          containerStyle={{ backgroundColor: 'transparent' }}
          stackSize={3}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red',
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  color: 'green',
                },
              },
            },
          }}
          onSwipedLeft={() => {
            console.log('swipe nope');
          }}
          onSwipedRight={() => {
            console.log('swipe like');
          }}
          backgroundColor={'#4FD0E9'}
          cards={profiles}
          renderCard={card =>
            card ? (
              <View
                key={card.id}
                style={tw('relative bg-white h-3/4 rounded-xl')}>
                <Image
                  style={tw('absolute top-0 w-full h-full rounded-xl')}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={[
                    tw(
                      'absolute bg-white dark:bg-slate-900 bottom-0 flex-row justify-between items-center w-full h-20 px-6 rounded-b-xl',
                    ),
                    styles.cardShadow,
                  ]}>
                  <View>
                    <Text style={tw('text-xl font-bold')}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw('text-2xl font-bold')}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tw(
                    'relative bg-white h-3/4 rounded-xl justify-center items-center',
                  ),
                  styles.cardShadow,
                ]}>
                <Text style={tw('font-bold pb-5')}>No more profiles</Text>
                <Image
                  resizeMode="contain"
                  style={tw('w-full h-20')}
                  height={100}
                  width={100}
                  source={{
                    uri: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037',
                  }}
                />
              </View>
            )
          }
        />
      </View>
      <View
        style={[
          tw('flex flex-row justify-evenly'),
          Platform.OS === 'ios' ? tw('mb-2') : tw('mb-5'),
        ]}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw(
            'items-center justify-center rounded-full w-16 h-16 bg-red-200',
          )}>
          <Icon name="close-sharp" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw(
            'items-center justify-center rounded-full w-16 h-16 bg-green-200',
          )}>
          <Icon name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
