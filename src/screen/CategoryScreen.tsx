import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {color} from '../style/color.ts';
import {CustomHeader} from '../component/CustomHeader.tsx';
import {Images} from '../assets/images.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamsList} from '../navigation/AppNavigator.tsx';

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
  };

  const deleteCategory = async (id: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  // const startEditing = (category: Category) => {
  //   setNewCategory(category.name);
  //   setNewCategoryImageUrl(category.image);
  //   setIsEditing(true);
  //   setCurrentCategory(category);
  // };

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
        <View style={styles.imagePickerContainer}>
          {newCategoryImageUrl && (
            <Image source={{uri: newCategoryImageUrl}} style={styles.image} />
          )}
        </View>
        <TextInput
          placeholder="Category Name"
          placeholderTextColor="#8c8c8c"
          value={newCategory}
          onChangeText={setNewCategory}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button
            title={isEditing ? 'Update Category' : 'Add Category'}
            onPress={isEditing ? updateCategory : addCategory}
          />
          {isEditing && <Button title="Cancel" onPress={resetFields} />}
          <Button title="Select Image" onPress={selectImage} />
        </View>
        <View style={styles.categoryItem}>
          {item?.image && (
            <Image source={{uri: item?.image}} style={styles.categoryImage} />
          )}
          <View style={styles.categoryDetails}>
            <Text style={styles.categoryText}>{item?.name}</Text>
          </View>
          <View style={styles.btncontaner}>
            <Pressable onPress={() => startEditing(item)}>
              <Text style={styles.editbtn}>Edit</Text>
            </Pressable>
            <Pressable
              onPress={() => deleteCategory(item.id)}
              style={{marginTop: 12}}>
              <Image source={Images.trash} style={styles.trashimg} />
            </Pressable>
          </View>
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
    height: 40,
    color: color.black,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  imagePickerContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    // marginLeft: 12,
    borderRadius: 60,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 60,
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
