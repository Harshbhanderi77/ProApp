import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color} from '../style/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {replace, Routes} from '../navigation/AppNavigator.tsx';

export const Splashscreen: React.FC = () => {
  const asa = async () => {
    const ss = await AsyncStorage.getItem('login');
    if (ss === 'true') {
      replace({
        screenName: Routes.Home,
      });
    } else {
      replace({
        screenName: Routes.Login,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      asa();
    }, 2000);
    return () => clearTimeout('timers');
  }, []);

  return (
    <View
      style={{
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Text style={{color: color.black, fontSize: 22, fontWeight: '600'}}>
        Wellcome
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
