import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {color} from '../style/color.ts';
import {Images} from '../assets/images.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {replace, Routes} from '../navigation/AppNavigator.tsx';

export const MainHeader: React.FC = () => {
  return (
    <View
      style={{
        backgroundColor: color.white,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
      }}>
      <View
        style={{
          backgroundColor: color.black,
          padding: 2,
          borderRadius: 24,
          elevation: 12,
          // borderColor: color.green,
          borderWidth: 1,
        }}>
        <Image
          source={Images.appicon}
          style={{
            width: 34,
            height: 34,
            resizeMode: 'contain',
          }}
        />
      </View>
      <Text
        style={{
          color: color.black,
          fontSize: 20,
          fontWeight: '700',
        }}>
        Home
      </Text>
      <Pressable
        style={{
          backgroundColor: color.blue,
          padding: 8,
          borderRadius: 24,
          elevation: 12,
        }}
        onPress={async () => {
          await AsyncStorage.setItem('login', 'false');
          replace({screenName: Routes.Login});
        }}>
        <Image
          source={Images.logout}
          style={{
            width: 24,
            height: 24,
          }}
        />
      </Pressable>
    </View>
  );
};
