import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {color} from '../style/color.ts';
import {Images} from '../assets/images.ts';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {StackParamsList} from '../navigation/AppNavigator.tsx';
import {SecondHeader} from '../component/SecondHeader.tsx';

interface Product {
  id: string;
  name: string;
  image: string | null;
  price: string;
  categoryId: string;
}

export const EditProduct: React.FC = () => {
  const routes = useRoute<RouteProp<StackParamsList, 'EditProduct'>>();
  const {item, isEditing, categoryId} = routes.params;
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductImage, setNewProductImage] = useState<string | null>(null);
  const [newProductPrice, setNewProductPrice] = useState('');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    };
    loadProducts();
  }, []);

  const addProduct = async () => {
    if (newProductName.trim() === '' || newProductPrice.trim() === '') {
      return;
    }
    const id = Math.random().toString(36).substr(2, 9);
    const newProductObject: Product = {
      id,
      name: newProductName,
      image: newProductImage,
      price: newProductPrice,
      categoryId: categoryId,
    };
    const updatedProducts = [...products, newProductObject];
    setProducts(updatedProducts);
    console.log(
      'updatedProducts',
      JSON.stringify(updatedProducts, undefined, 4),
    );
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    resetFields();
    navigation.goBack();
  };

  const updateProduct = async () => {
    if (
      newProductName.trim() === '' ||
      newProductPrice.trim() === '' ||
      !currentProduct
    ) {
      return;
    }
    const updatedProducts = products.map(prod =>
      prod.id === currentProduct.id
        ? {
            ...prod,
            name: newProductName,
            price: newProductPrice,
            image: newProductImage,
          }
        : prod,
    );
    setProducts(updatedProducts);
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    resetFields();
    navigation.goBack();
  };

  const selectImage = async () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        response.assets[0].uri
      ) {
        setNewProductImage(response.assets[0].uri);
      } else {
        setNewProductImage(null);
      }
    });
  };

  const resetFields = () => {
    setCurrentProduct(null);
    setNewProductName('');
    setNewProductImage(null);
    setNewProductPrice('');
  };

  useEffect(() => {
    startEditing(item);
  }, [item]);

  const startEditing = (product: Product) => {
    setNewProductName(product.name);
    setNewProductImage(product.image);
    setNewProductPrice(product.price);
    setCurrentProduct(product);
  };

  return (
    <View style={styles.container}>
      <SecondHeader label={'Edit Product'} />
      <View style={{marginHorizontal: 12}}>
        <View style={{alignItems: 'center', marginBottom: 16}}>
          <View
            style={[
              styles.image,
              {backgroundColor: newProductImage ? 'transparent' : color.gray1},
            ]}>
            {newProductImage && (
              <Image
                source={{uri: newProductImage}}
                style={{width: '100%', height: '100%', borderRadius: 100}}
              />
            )}
            {!newProductImage && (
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
            placeholder="Product Name"
            placeholderTextColor="#8c8c8c"
            value={newProductName}
            onChangeText={setNewProductName}
            style={styles.input}
          />
        </View>
        <View style={styles.textview}>
          <Text style={styles.imputtitel}>Price:</Text>
          <TextInput
            placeholder="$ 12.00"
            placeholderTextColor="#8c8c8c"
            keyboardType={'number-pad'}
            value={newProductPrice}
            onChangeText={setNewProductPrice}
            style={styles.input}
          />
        </View>
        <View style={{marginTop: 16}}>
          <Pressable
            onPress={async () => {
              if (isEditing) {
                await updateProduct();
              } else {
                await addProduct();
              }
            }}
            style={styles.buttonContainer}>
            <Text style={styles.buttontext}>
              {isEditing ? 'Update Product' : 'Add Product'}
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
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
    marginTop: 14,
    borderWidth: 1,
    position: 'relative',
    borderRadius: 12,
    borderColor: color.gray,
  },
  imputtitel: {
    color: color.black,
    position: 'absolute',
    top: -12,
    left: 12,
    backgroundColor: color.white,
  },
  buttonContainer: {
    marginBottom: 16,
    backgroundColor: color.blue,
    padding: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    color: color.black,
    fontSize: 16,
    fontWeight: '600',
  },
});
