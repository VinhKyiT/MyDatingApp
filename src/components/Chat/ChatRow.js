import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import { useTailwind } from 'tailwind-rn/dist';

const ChatRow = ({ matchDetails }) => {
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const navigation = useNavigation();
  const { user } = useAuth();
  const tw = useTailwind();

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Messages', { matchDetails })}
      style={[
        tw('flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg'),
        styles.cardShadow,
      ]}>
      <Image
        style={tw('rounded-full h-16 w-16 mr-4')}
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View>
        <Text style={tw('text-lg font-semibold')}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{'Say hi!'}</Text>
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
