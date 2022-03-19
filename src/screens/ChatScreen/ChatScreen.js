import { SafeAreaView, Text } from 'react-native';
import React from 'react';
import Header from '../../components/Header/Header';
import ChatList from '../../components/ChatList/ChatList';

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" callEnable />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
