import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import useAuth from '../../hooks/useAuth';
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import { useRoute } from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn/dist';
import SenderMessage from '../../components/Chat/SenderMessage';
import ReceiverMessage from '../../components/Chat/ReceiverMessage';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../Firebase';

const MessagesScreen = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;
  const tw = useTailwind();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches', matchDetails.id, 'messages'),
          orderBy('timestamp', 'desc'),
        ),
        snapshot => {
          setMessages(
            snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
          );
        },
      ),
    [matchDetails, db],
  );

  const sendMessage = () => {
    addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });
    setInput('');
  };

  return (
    <SafeAreaView style={tw('flex-1 dark:bg-slate-900')}>
      <Header
        callEnable
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw('flex-1')}
        keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={tw('pl-4 mb-2')}
            keyExtractor={item => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={tw(
            'flex-row justify-between items-center border-t border-gray-200 px-5 py-2',
          )}>
          <TextInput
            style={tw('h-10 text-lg dark:text-white')}
            placeholder="Enter message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" color="#ff5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;
