import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const Hello = () => {
  const tailwind = useTailwind();

  return (
    <SafeAreaView style={tailwind('flex-1 justify-center items-center')}>
      <View style={tailwind('pt-12 items-center')}>
        <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
          <Text style={tailwind('text-blue-800 font-semibold')}>
            Hello Tailwind
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Hello;
