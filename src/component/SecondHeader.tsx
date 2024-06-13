import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {goBack} from '../navigation/AppNavigator.tsx';
import {color} from '../style/color.ts';
import {Images} from '../assets/images.ts';

interface CartheaderProps {
  label: string;
}

export const SecondHeader: React.FC<CartheaderProps> = ({label}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => goBack()} style={styles.backButton}>
        <Image source={Images.backbtn} style={styles.backButtonImage} />
      </Pressable>
      <View style={styles.textview}>
        <Text style={styles.headerText}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: color.blue,
    borderRadius: 50,
    padding: 8,
    elevation: 12,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  textview: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: color.black,
    fontSize: 20,
    fontWeight: '600',
  },
  secondview: {
    position: 'relative',
    zIndex: 15,
  },
  appiconimg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  text: {
    color: color.black,
    fontSize: 20,
    fontWeight: '700',
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: -8,
    backgroundColor: color.white,
    borderRadius: 5,
    elevation: 5,
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 100,
    width: 180,
  },
  menuItem: {
    padding: 16,
  },
  menuItemText: {
    color: color.black,
    fontSize: 16,
  },
});
