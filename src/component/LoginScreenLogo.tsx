import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Images} from '../assets/images.ts';
import {color} from '../style/color.ts';

export const LoginScreenLogo: React.FC = () => {
  return (
    <View style={styles.maincontainer}>
      <View style={styles.secondview}>
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

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: color.white,
    alignItems: 'center',
    position: 'relative',
    margin: 60,
  },
  secondview: {
    backgroundColor: color.black,
    padding: 10,
    borderRadius: 100,
    elevation: 16,
  },
});
