import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Images} from '../assets/images.ts';
import {color} from '../style/color.ts';

export const LoginScreenLogo: React.FC = () => {
  return (
    <View
      style={{
        backgroundColor: color.white,
        alignItems: 'center',
        position: 'relative',
        margin: 60,
      }}>
      <View
        style={{
          backgroundColor: color.black,
          padding: 10,
          borderRadius: 100,
          elevation: 16,
        }}>
        <View style={{position: 'relative'}}>
          <Image
            source={Images.appicon}
            style={{width: 80, height: 80, resizeMode: 'center'}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
