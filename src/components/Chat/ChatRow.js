import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import { useTailwind } from 'tailwind-rn/dist';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../Firebase';

const ChatRow = ({ matchDetails }) => {
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState('');
  const [isYouLastSender, setIsYouLastSender] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();
  const tw = useTailwind();

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'matches', matchDetails.id, 'messages'),
        orderBy('timestamp', 'desc'),
      ),
      snapshot => {
        setLastMessage(snapshot.docs[0]?.data()?.message);
      },
    );
  }, [matchDetails, db]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'matches', matchDetails.id, 'messages'),
        orderBy('timestamp', 'desc'),
      ),
      snapshot => {
        if (snapshot.docs[0]?.data()?.userId === user.uid) {
          setIsYouLastSender(true);
        } else {
          setIsYouLastSender(false);
        }
      },
    );
  }, [matchDetails, db]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Messages', { matchDetails })}
      style={[
        tw(
          'flex-row items-center py-3 px-5 bg-white dark:bg-zinc-700 mx-3 my-1 rounded-lg',
        ),
        styles.cardShadow,
      ]}>
      <Image
        style={tw('rounded-full h-16 w-16 mr-4')}
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View style={tw('flex-1')}>
        <Text style={tw('text-lg font-semibold dark:text-white')}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text numberOfLines={1} style={[tw('dark:text-white')]}>
          {isYouLastSender && 'You: '}
          {lastMessage || 'Say hi!'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

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
