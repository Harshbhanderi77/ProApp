import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {goBack, navigate, Routes} from '../navigation/AppNavigator.tsx';
import {color} from '../style/color.ts';
import {Images} from '../assets/images.ts';

interface CartheaderProps {
  label: string;
  categoryId: string;
}

export const CustomHeader: React.FC<CartheaderProps> = ({
  label,
  categoryId,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleAddCategory = () => {
    setMenuVisible(false);
    navigate({
      screenName: Routes.EditProduct,
      params: {item: {}, isEditing: false, categoryId: categoryId},
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => goBack()} style={styles.backButton}>
        <Image source={Images.backbtn} style={styles.backButtonImage} />
      </Pressable>
      <Text style={styles.headerText}>{label}</Text>
      <View style={styles.secondview}>
        <Pressable onPress={() => setMenuVisible(!menuVisible)}>
          <Image source={Images.menubtn} style={styles.appiconimg} />
        </Pressable>
        {menuVisible && (
          <View style={styles.menu}>
            <Pressable onPress={handleAddCategory} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Add New Product</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 12,
    padding: 10,
    elevation: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
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
    alignItems: 'center',
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
