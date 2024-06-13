import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {color} from '../style/color';
import {Images} from '../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {replace, Routes, navigate} from '../navigation/AppNavigator';

export const MainHeader: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleAddCategory = () => {
    setMenuVisible(false);
    navigate({
      screenName: Routes.Category,
      params: {item: {}, isEditing: false},
    });
  };

  return (
    <View style={styles.mainview}>
      <Pressable
        style={styles.logoutButton}
        onPress={async () => {
          await AsyncStorage.setItem('login', 'false');
          replace({screenName: Routes.Login});
        }}>
        <Image source={Images.logout} style={styles.logoutIcon} />
      </Pressable>
      <Text style={styles.text}>Home</Text>
      <View style={styles.secondview}>
        <Pressable onPress={() => setMenuVisible(!menuVisible)}>
          <Image source={Images.menubtn} style={styles.appiconimg} />
        </Pressable>
        {menuVisible && (
          <View style={styles.menu}>
            <Pressable onPress={handleAddCategory} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Add New Category</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: color.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    zIndex: 10,
  },
  logoutButton: {
    backgroundColor: color.blue,
    padding: 8,
    borderRadius: 24,
    elevation: 12,
  },
  logoutIcon: {
    width: 24,
    height: 24,
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
