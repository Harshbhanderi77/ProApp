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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color} from '../style/color';
import {Images} from '../assets/images.ts';
import {CustomHeader} from '../component/CustomHeader.tsx';
import {navigate, Routes} from '../navigation/AppNavigator.tsx';

interface ProductScreenProps {
  route: any;
}

interface Product {
  id: string;
  categoryId: string;
  image: string;
  name: string;
  price: string;
}

const predefinedProducts: Product[] = [
  {
    id: '1',
    categoryId: '1',
    image: 'https://via.placeholder.com/60',
    name: 'Bajrano - Rotlo',
    price: '50.00',
  },
  {
    id: '2',
    categoryId: '1',
    image: 'https://via.placeholder.com/60',
    name: 'Khela Khela Khaman',
    price: '100.00',
  },
  {
    id: '3',
    categoryId: '2',
    image: 'https://via.placeholder.com/60',
    name: 'Cheez butter masala',
    price: '150.00',
  },
  {
    id: '4',
    categoryId: '2',
    name: 'Shahi Paneer',
    image: 'https://via.placeholder.com/60',
    price: '180.00',
  },
  {
    id: '5',
    categoryId: '2',
    name: 'Butter Nan',
    image: 'https://via.placeholder.com/60',
    price: '40.00',
  },
  {
    id: '6',
    categoryId: '3',
    name: 'Chaines Bhel',
    image: 'https://via.placeholder.com/60',
    price: '120.00',
  },
  {
    id: '7',
    categoryId: '3',
    name: 'Dry Manchurian',
    image: 'https://via.placeholder.com/60',
    price: '150.00',
  },
  {
    id: '8',
    categoryId: '4',
    name: 'Maisur Masala',
    image: 'https://via.placeholder.com/60',
    price: '150.00',
  },
  {
    id: '9',
    categoryId: '4',
    name: 'Uttapam',
    image: 'https://via.placeholder.com/60',
    price: '120.00',
  },
  {
    id: '10',
    categoryId: '5',
    name: 'Cauliflower Tacos',
    image: 'https://via.placeholder.com/60',
    price: '180.00',
  },
  {
    id: '11',
    categoryId: '5',
    name: 'Vegetarian Soup',
    image: 'https://via.placeholder.com/60',
    price: '170.00',
  },
];

export const ProductScreen: React.FC<ProductScreenProps> = ({route}) => {
  const {categoryId, categoryName} = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [modelVisible, setModalVisible] = useState(false);

  const buttonsArray = [
    {
      name: 'Add Product',
      onPress: () => navigate({screenName: Routes.Category}),
    },
    {
      name: 'Edit',
      onPress: () => {},
    },
    {
      name: 'Delete',
      onPress: () => {},
    },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        const parsedProducts: Product[] = JSON.parse(storedProducts);
        if (parsedProducts.length > 0) {
          setProducts(
            parsedProducts.filter(product => product.categoryId === categoryId),
          );
        } else {
          setProducts(
            predefinedProducts.filter(
              product => product.categoryId === categoryId,
            ),
          );
        }
      } else {
        setProducts(
          predefinedProducts.filter(
            product => product.categoryId === categoryId,
          ),
        );
        await AsyncStorage.setItem(
          'products',
          JSON.stringify(predefinedProducts),
        );
      }
    };
    loadProducts();
  }, [categoryId]);

  const saveProducts = async (updatedProducts: Product[]) => {
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = async (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    await saveProducts(updatedProducts);
  };

  const renderItem = ({item}: {item: Product}) => (
    // <View style={styles.productItem}>
    //   <Image source={{uri: item.image}} style={styles.productimg} />
    //   <View>
    //     <Text style={{color: color.black}}>{item.name}</Text>
    //     <Text style={{color: color.black}}>{item.price}</Text>
    //   </View>
    //   <View>
    //     <Button title="Delete" onPress={() => deleteProduct(item.id)} />
    //     <Button title="Edit" onPress={() => {}} />
    //   </View>
    // </View>
    <View>
      <View style={styles.categoryItem}>
        <Image source={{uri: item.image}} style={styles.categoryImage} />
        <View style={styles.categoryDetails}>
          <Text style={styles.categoryText}>{item.name}</Text>
          <Text style={styles.categoryText}>{item.price}</Text>
        </View>
        <Pressable onPress={() => setModalVisible(true)}>
          <Image source={Images.menubtn} style={{height: 30, width: 30}} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader label={'Product'} />
      <View>
        <Pressable onPress={() => navigate({screenName: Routes.EditProduct})}>
          <Text style={{color: color.black}}>EditProduct</Text>
        </Pressable>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
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
                <Pressable key={value.name}>
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
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  categoryItem: {
    flexDirection: 'row',
    borderBottomColor: color.gray1,
    borderBottomWidth: 1,
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 12,
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

  header: {
    fontSize: 20,
    color: color.black,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productimg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  maincontainer: {
    backgroundColor: color.white,
    flex: 1,
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
