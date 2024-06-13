import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
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
import {MainHeader} from '../component/Mainheader.tsx';

export interface Category {
  id: string;
  name: string;
  image: string;
}

const predefinedCategories: Category[] = [
  {
    id: '1',
    name: 'Gujrati',
    image:
      'https://www.nehascookbook.com/wp-content/uploads/2022/10/Shrad-thali-WS.jpg',
  },
  {
    id: '2',
    name: 'Panjabi',
    image:
      'https://t4.ftcdn.net/jpg/03/45/64/29/360_F_345642976_fzD1FcOY69LghUbXNmyCRZPRSwRVDNlj.jpg',
  },
  {
    id: '3',
    name: 'Chinese',
    image:
      'https://www.recipetineats.com/wp-content/uploads/2023/06/Chili-crisp-noodles_2.jpg?w=747&h=747&crop=1',
  },
  {
    id: '4',
    name: 'South Indian',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTinCKGPNr2g5zx4Qet43b2n3rGXhO-_ppJww&s',
  },
  {
    id: '5',
    name: 'Mexican',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2022/10/Pork-carnitas-b94893e.jpg?quality=90&resize=556,505',
  },
  {
    id: '6',
    name: 'Italian',
    image:
      'https://www.eatingwell.com/thmb/eL6SiYsG7FVKf8MYDilOqrv63gQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3837844-2d4accd800f44c6e9a41d5aad0811dbe.jpg',
  },
];

export const HomeScreen: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const storedCategories = await AsyncStorage.getItem('categories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    };
    fetchCategories();
  }, []);

  const buttonsArray = [
    {
      name: 'Edit',
      onPress: (item: Category) => {
        navigate({
          screenName: Routes.Category,
          params: {item: item, isEditing: true},
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
    setRefreshing(true);
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
    setRefreshing(false);
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
      <View style={{marginHorizontal: 12, flex: 1}}>
        <FlatList
          data={categories}
          extraData={categories}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadCategories}
            />
          }
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
                <View>
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
                <View style={styles.menuButtonContainer}>
                  <Pressable onPress={() => handleMenuPress(item)}>
                    <Image source={Images.menubtn} style={styles.menuButton} />
                  </Pressable>
                </View>
              </Pressable>
            </View>
          )}
          keyExtractor={item => item.id}
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
    borderColor: color.blue,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 20,
    padding: 6,
    elevation: 5,
    backgroundColor: color.white,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 10,
  },
  categoryText: {
    color: color.black,
    fontSize: 16,
    width: 160,
    fontWeight: '600',
  },
  menuButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 6,
  },
  menuButton: {
    height: 30,
    width: 30,
  },
  modalContainer: {
    flex: 1,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: color.gray1,
    borderWidth: 1,
    borderColor: color.blue,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  modalHeader: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: -6,
    marginRight: 12,
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
