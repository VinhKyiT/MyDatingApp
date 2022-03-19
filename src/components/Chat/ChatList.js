import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import useAuth from '../../hooks/useAuth';
import ChatRow from './ChatRow';

const ChatList = () => {
  const [matches, setMatches] = useState([]);

  const tw = useTailwind();
  const navigation = useNavigation();

  const { user } = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches'),
          where('usersMatched', 'array-contains', user.uid),
        ),
        snapshot => {
          setMatches(
            snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        },
      ),
    [],
  );

  return matches.length ? (
    <FlatList
      data={matches}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={tw('p-5')}>
      <Text style={tw('text-center text-lg')}>
        Match someone to start messaging
      </Text>
    </View>
  );
};

export default ChatList;
