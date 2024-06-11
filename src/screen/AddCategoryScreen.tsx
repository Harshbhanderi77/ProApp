import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {color} from '../style/color.ts';
import {CustomHeader} from '../component/CustomHeader.tsx';
import {Images} from '../assets/images.ts';

export const AddCategoryScreen: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const navigation = useNavigation();

  const addCategory = async () => {
    if (categoryName.trim() === '' || !imageUri) {
      return;
    }

    const id = Math.random().toString(36).substr(2, 9);
    const newCategory = {
      id,
      name: categoryName,
      image: imageUri,
    };

    const storedCategories = await AsyncStorage.getItem('categories');
    const categories = storedCategories ? JSON.parse(storedCategories) : [];
    const updatedCategories = [...categories, newCategory];
    await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));

    setCategoryName('');
    setImageUri(null);
    navigation.goBack();
  };

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        response.didCancel ||
        response.errorCode ||
        !response.assets ||
        response.assets.length === 0
      ) {
        console.log('User cancelled image picker or there was an error');
      } else {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader label={'Add Category'} />
      <View style={{marginHorizontal: 12}}>
        <View style={{alignItems: 'center', marginBottom: 16}}>
          <View
            style={[
              styles.image,
              {backgroundColor: imageUri ? 'transparent' : color.gray1},
            ]}>
            {imageUri && (
              <Image
                source={{uri: imageUri}}
                style={{width: '100%', height: '100%', borderRadius: 100}}
              />
            )}
            {!imageUri && (
              <Image source={Images.addimage} style={{width: 42, height: 42}} />
            )}
            <Pressable style={styles.iconimage} onPress={selectImage}>
              <Image source={Images.cameraicon} style={styles.cameraimage} />
            </Pressable>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Category Name"
          placeholderTextColor="#8c8c8c"
          value={categoryName}
          onChangeText={setCategoryName}
        />
        <Pressable style={styles.button} onPress={addCategory}>
          <Text style={styles.buttonText}>Add Category</Text>
        </Pressable>
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
    borderWidth: 1,
    color: color.black,
    borderColor: color.gray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    marginTop: 12,
  },
  imageButton: {
    backgroundColor: color.blue,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    color: color.black,
    fontSize: 16,
    fontWeight: '600',
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
  imageText: {
    color: color.gray,
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconimage: {
    position: 'absolute',
    bottom: 0,
    right: 8,
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
  button: {
    backgroundColor: color.blue,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: color.black,
    fontSize: 16,
    fontWeight: '600',
  },
});
