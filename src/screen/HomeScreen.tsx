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
  // {
  //   id: '6',
  //   name: 'Category 6',
  //   image: 'https://via.placeholder.com/60',
  // },
  // {
  //   id: '7',
  //   name: 'Category 7',
  //   image: 'https://via.placeholder.com/60',
  // },
  // {
  //   id: '8',
  //   name: 'Category 8',
  //   image: 'https://via.placeholder.com/60',
  // },
  // {
  //   id: '9',
  //   name: 'Category 9',
  //   image: 'https://via.placeholder.com/60',
  // },
  // {
  //   id: '10',
  //   name: 'Category 10',
  //   image: 'https://via.placeholder.com/60',
  // },
];

export const HomeScreen: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modelVisible, setModalVisible] = useState(false);

  const buttonsArray = [
    {
      name: 'Add Product',
      onPress: (item: string) => {
        console.log('eoreuioaos');
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
      onPress: (item: string) => {
        navigate({
          screenName: Routes.Category,
          params: {item: item},
        });
      },
    },
    {
      name: 'Delete',
      onPress: (item: string) => {},
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

  const editCategory = (item: Category) => {};

  return (
    <View style={styles.maincontainer}>
      <MainHeader />
      <View style={{marginHorizontal: 12}}>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          scrollEnabled={true}
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
                <Pressable onPress={() => setModalVisible(true)}>
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
        visible={modelVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            bottom: 0,
            position: 'absolute',
            width: '100%',
            backgroundColor: color.gray1,
            borderWidth: 1,
            borderColor: color.blue,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              top: -6,
              marginRight: 10,
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image source={Images.cancel} style={{height: 24, width: 24}} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              // marginHorizontal: 34,
              paddingVertical: 16,
            }}>
            {buttonsArray.map((value, index) => {
              return (
                <Pressable
                  onPress={() => {
                    value.onPress(value.name);
                  }}
                  key={value.name}>
                  <Text
                    style={{
                      color: color.black,
                      fontWeight: '600',
                      fontSize: 22,
                      marginTop: 10,
                    }}>
                    {value.name}
                  </Text>
                </Pressable>
              );
            })}
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
  btncontaner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editbtn: {
    color: color.black,
    fontSize: 16,
    fontWeight: '600',
  },
  trashimg: {
    height: 24,
    width: 24,
  },
});
