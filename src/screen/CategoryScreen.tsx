import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {color} from '../style/color.ts';
import {CustomHeader} from '../component/CustomHeader.tsx';
import {Images} from '../assets/images.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  navigate,
  Routes,
  StackParamsList,
} from '../navigation/AppNavigator.tsx';

interface Category {
  id: string;
  name: string;
  image: string | null;
}

export const CategoryScreen: React.FC = () => {
  const routes = useRoute<RouteProp<StackParamsList, 'CategoryScreen'>>();
  const {item} = routes.params;
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryImageUrl, setNewCategoryImageUrl] = useState<string | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      const storedCategories = await AsyncStorage.getItem('categories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    };
    loadCategories();
  }, []);

  const addCategory = async () => {
    if (newCategory.trim() === '') {
      return;
    }
    const id = Math.random().toString(36).substr(2, 9);
    const newCategoryObject: Category = {
      id,
      name: newCategory,
      image: newCategoryImageUrl,
    };
    const updatedCategories = [...categories, newCategoryObject];
    setCategories(updatedCategories);
    await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
    resetFields();
    navigate({screenName: Routes.Home});
  };

  const updateCategory = async () => {
    if (newCategory.trim() === '' || !currentCategory) {
      return;
    }
    const updatedCategories = categories.map(cat =>
      cat.id === currentCategory.id
        ? {
            ...cat,
            name: newCategory,
            image: newCategoryImageUrl,
          }
        : cat,
    );
    setCategories(updatedCategories);
    await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
    resetFields();
    navigate({screenName: Routes.Home});
  };

  const selectImage = async () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        response.assets[0].uri
      ) {
        setNewCategoryImageUrl(response.assets[0].uri);
      } else {
        setNewCategoryImageUrl(null);
      }
    });
  };

  const resetFields = () => {
    setIsEditing(false);
    setCurrentCategory(null);
    setNewCategory('');
    setNewCategoryImageUrl(null);
  };

  console.log(item);

  useEffect(() => {
    startEditing(item);
  }, [item]);

  const startEditing = (category: Category) => {
    setNewCategory(category.name);
    setNewCategoryImageUrl(category.image);
    setIsEditing(true);
    setCurrentCategory(category);
  };

  return (
    <View style={styles.container}>
      <CustomHeader label={'Edit Category'} />
      <View style={{marginHorizontal: 12}}>
        <View style={{alignItems: 'center', marginBottom: 16}}>
          <View
            style={[
              styles.image,
              {
                backgroundColor: newCategoryImageUrl
                  ? 'transparent'
                  : color.gray1,
              },
            ]}>
            {newCategoryImageUrl && (
              <Image
                source={{uri: newCategoryImageUrl}}
                style={{width: '100%', height: '100%', borderRadius: 100}}
              />
            )}
            {!newCategoryImageUrl && (
              <Image source={Images.addimage} style={{width: 42, height: 42}} />
            )}
            <Pressable style={styles.iconimage} onPress={selectImage}>
              <Image source={Images.cameraicon} style={styles.cameraimage} />
            </Pressable>
          </View>
        </View>
        <View style={styles.textview}>
          <Text style={styles.imputtitel}>Name:</Text>
          <TextInput
            placeholder="Category Name"
            placeholderTextColor="#8c8c8c"
            value={newCategory}
            onChangeText={setNewCategory}
            style={styles.input}
          />
        </View>
        <View style={{marginTop: 16}}>
          <Pressable
            onPress={isEditing ? updateCategory : addCategory}
            style={styles.buttonContainer}>
            <Text style={styles.buttontext}>
              {isEditing ? 'Update Category' : 'Add Category'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  input: {
    color: color.black,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  imagePickerContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  iconimage: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: color.blue,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraimage: {
    width: 20,
    height: 20,
  },
  textview: {
    marginTop: 12,
    borderWidth: 1,
    position: 'relative',
    borderRadius: 12,
    borderColor: color.gray,
  },
  imputtitel: {
    color: color.black,
    marginBottom: 5,
    padding: 5,
    position: 'absolute',
    top: -16,
    left: 12,
    backgroundColor: color.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: color.blue,
    padding: 8,
    borderRadius: 12,
    justifyContent: 'center',
  },
  buttontext: {
    color: color.black,
    fontSize: 16,
    fontWeight: '600',
  },
});
