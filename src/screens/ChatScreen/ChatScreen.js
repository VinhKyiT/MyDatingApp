import { SafeAreaView, Text } from 'react-native';
import React from 'react';
import Header from '../../components/Header/Header';
import ChatList from '../../components/Chat/ChatList';
import { useTailwind } from 'tailwind-rn/dist';

const ChatScreen = () => {
  const tw = useTailwind();

  return (
    <SafeAreaView style={tw('dark:bg-slate-900')}>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
