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

interface Product {
  id: string;
  name: string;
  image: string | null;
  price: string;
}

export const EditProduct: React.FC = () => {
  const routes = useRoute<RouteProp<StackParamsList, 'EditProduct'>>();
  const {item} = routes.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductImage, setNewProductImage] = useState<string | null>(null);
  const [newProductPrice, setNewProductPrice] = useState('');
  const [isEditingProduct, setIsEditingProduct] = useState(false);
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
    };
    const updatedProducts = [...products, newProductObject];
    setProducts(updatedProducts);
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    resetFields();
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
  };

  const deleteProduct = async (id: string) => {
    const updatedProducts = products.filter(prod => prod.id !== id);
    setProducts(updatedProducts);
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
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
    setIsEditingProduct(false);
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
    setIsEditingProduct(true);
    setCurrentProduct(product);
  };

  return (
    <View style={styles.container}>
      <CustomHeader label={'Edit Product'} />
      <View style={{marginHorizontal: 12}}>
        <View style={styles.imagePickerContainer}>
          {newProductImage && (
            <Image source={{uri: newProductImage}} style={styles.image} />
          )}
        </View>
        <TextInput
          placeholder="Product Name"
          placeholderTextColor="#8c8c8c"
          value={newProductName}
          onChangeText={setNewProductName}
          style={styles.input}
        />
        <TextInput
          placeholder="Product Price"
          placeholderTextColor="#8c8c8c"
          value={newProductPrice}
          onChangeText={setNewProductPrice}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button
            title={isEditingProduct ? 'Update Product' : 'Add Product'}
            onPress={isEditingProduct ? updateProduct : addProduct}
          />
          {isEditingProduct && <Button title="Cancel" onPress={resetFields} />}
          <Button title="Select Image" onPress={selectImage} />
        </View>
        <View style={styles.productItem}>
          {item?.image && (
            <Image source={{uri: item?.image}} style={styles.productImage} />
          )}
          <View style={styles.productDetails}>
            <Text style={styles.productText}>{item?.name}</Text>
            <Text style={styles.productText}>Price: ${item?.price}</Text>
          </View>
          <View style={styles.btncontainer}>
            <Pressable onPress={() => startEditing(item)}>
              <Text style={styles.editbtn}>Edit</Text>
            </Pressable>
            <Pressable
              onPress={() => deleteProduct(item.id)}
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
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 60,
  },
  productDetails: {
    flex: 1,
  },
  productText: {
    color: color.black,
    marginBottom: 5,
  },
  btncontainer: {
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
