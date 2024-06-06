import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigate, Routes} from '../navigation/AppNavigator';
import {color} from '../style/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Images} from '../assets/images';
import {MainHeader} from '../component/Mainheader';

export interface Category {
  id: string;
  name: string;
  image: string;
}

const predefinedCategories: Category[] = [
  {
    id: '1',
    name: 'Category 1',
    image: 'https://via.placeholder.com/60',
  },
  {
    id: '2',
    name: 'Category 2',
    image: 'https://via.placeholder.com/60',
  },
  {
    id: '3',
    name: 'Category 3',
    image: 'https://via.placeholder.com/60',
  },
  {
    id: '4',
    name: 'Category 4',
    image: 'https://via.placeholder.com/60',
  },
  {
    id: '5',
    name: 'Category 5',
    image: 'https://via.placeholder.com/60',
  },
];

export const HomeScreen: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const buttonsArray = [
    {
      name: 'Add Product',
      onPress: (item: Category) => {
        navigate({
          screenName: Routes.Category,
          params: {
            item: item,
          },
        });
      },
    },
    {
      name: 'Edit',
      onPress: (item: Category) => {
        navigate({
          screenName: Routes.Category,
          params: {item: item},
        });
      },
    },
    {
      name: 'Delete',
      onPress: (item: Category) => {
        deleteCategory(item.id);
      },
    },
  ];

  const loadCategories = async () => {
    const storedCategories = await AsyncStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(predefinedCategories);
      await AsyncStorage.setItem(
        'categories',
        JSON.stringify(predefinedCategories),
      );
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadCategories();
    }, []),
  );

  const deleteCategory = async (id: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const handleMenuPress = (item: Category) => {
    setSelectedCategory(item);
    setModalVisible(true);
  };

  const handleButtonPress = (action: (item: Category) => void) => {
    if (selectedCategory) {
      action(selectedCategory);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <MainHeader />
      <View style={{marginHorizontal: 12}}>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <Pressable
                onPress={() =>
                  navigate({
                    screenName: Routes.Product,
                    params: {categoryId: item.id, categoryName: item.name},
                  })
                }
                style={styles.categoryItem}>
                {item.image && (
                  <Image
                    source={{uri: item.image}}
                    style={styles.categoryImage}
                  />
                )}
                <View style={styles.categoryDetails}>
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
                <Pressable onPress={() => handleMenuPress(item)}>
                  <Image
                    source={Images.menubtn}
                    style={{height: 30, width: 30}}
                  />
                </Pressable>
              </Pressable>
            </View>
          )}
        />
      </View>
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image source={Images.cancel} style={styles.modalCloseIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            {buttonsArray.map(button => (
              <Pressable
                onPress={() => handleButtonPress(button.onPress)}
                key={button.name}>
                <Text style={styles.modalButtonText}>{button.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: color.white,
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    borderBottomColor: color.gray1,
    borderBottomWidth: 1,
    alignItems: 'center',
    marginTop: 12,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryText: {
    color: color.black,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: color.gray1,
    borderWidth: 1,
    borderColor: color.blue,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHeader: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: -6,
    marginRight: 10,
  },
  modalCloseIcon: {
    height: 24,
    width: 24,
  },
  modalContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  modalButtonText: {
    color: color.black,
    fontWeight: '600',
    fontSize: 22,
    marginTop: 10,
  },
});
