import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color} from '../style/color';
import {Images} from '../assets/images.ts';
import {CustomHeader} from '../component/CustomHeader.tsx';
import {navigate, Routes} from '../navigation/AppNavigator.tsx';
import {useFocusEffect} from '@react-navigation/native';

interface ProductScreenProps {
  route: any;
}

export interface Product {
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
    image:
      'https://cdn.tarladalal.com/members/9306/procstepimgs/rotla_dsc2818-(20)-11-186406.jpg',
    name: 'Bajrano - Rotlo',
    price: '50.00',
  },
  {
    id: '2',
    categoryId: '1',
    image:
      'https://www.ranioil.com/wp-content/uploads/2022/01/khaman-dhokla.png',
    name: 'Khela Khela Khaman',
    price: '100.00',
  },
  {
    id: '3',
    categoryId: '2',
    image:
      'https://t4.ftcdn.net/jpg/05/82/28/65/360_F_582286506_Kji3X5NrZBHMTFSqwG9gADXWMsjrtEjL.jpg',
    name: 'Cheez butter masala',
    price: '150.00',
  },
  {
    id: '4',
    categoryId: '2',
    name: 'Shahi Paneer',
    image:
      'https://t4.ftcdn.net/jpg/03/31/65/45/360_F_331654539_FaCJJWVUB3SmrIPIkmeEOnk7TYgl7xQC.jpg',
    price: '180.00',
  },
  {
    id: '5',
    categoryId: '2',
    name: 'Butter Nan',
    image:
      'https://t3.ftcdn.net/jpg/01/71/17/02/360_F_171170289_WnnpOeTro0XbmoJzLmUZVLDgigoxWd2t.jpg',
    price: '40.00',
  },
  {
    id: '6',
    categoryId: '3',
    name: 'Chaines Bhel',
    image:
      'https://www.shutterstock.com/image-photo/chinese-bhel-spicy-indochinese-recipe-600nw-1387600910.jpg',
    price: '120.00',
  },
  {
    id: '7',
    categoryId: '3',
    name: 'Dry Manchurian',
    image:
      'https://t4.ftcdn.net/jpg/03/24/56/73/360_F_324567329_VIPsg4s4kWkvqJviANcIgeYPG602kN56.jpg',
    price: '150.00',
  },
  {
    id: '8',
    categoryId: '4',
    name: 'Maisur Masala',
    image:
      'https://t4.ftcdn.net/jpg/01/89/45/21/360_F_189452136_gJBG4ZRXY9NnZZCGV2s8QhObmpeerJTO.jpg',
    price: '150.00',
  },
  {
    id: '9',
    categoryId: '4',
    name: 'Uttapam',
    image:
      'https://priyafoods.com/cdn/shop/files/UTAPPAMMIX_2.jpg?v=1708926544',
    price: '120.00',
  },
  {
    id: '10',
    categoryId: '5',
    name: 'Cauliflower Tacos',
    image:
      'https://allthehealthythings.com/wp-content/uploads/2021/02/chipotle-cauliflower-tacos-4.jpg',
    price: '180.00',
  },
  {
    id: '11',
    categoryId: '5',
    name: 'Vegetarian Soup',
    image:
      'https://feelgoodfoodie.net/wp-content/uploads/2020/02/Creamy-Vegetable-Soup-11.jpg',
    price: '170.00',
  },
  {
    id: '12',
    categoryId: '6',
    name: 'Pizza',
    image:
      'https://t4.ftcdn.net/jpg/05/76/79/39/360_F_576793989_5CFFMwWhwItXPyTVeDPsQaRTm5o2JA5Y.jpg',
    price: '220.00',
  },
  {
    id: '13',
    categoryId: '6',
    name: 'Pasta',
    image:
      'https://img.freepik.com/free-photo/authentic-italian-pasta_24972-2334.jpg',
    price: '200.00',
  },
];

export const ProductScreen: React.FC<ProductScreenProps> = ({route}) => {
  const {categoryId} = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const buttonsArray = [
    {
      name: 'Edit',
      onPress: (item: Product) => {
        navigate({
          screenName: Routes.EditProduct,
          params: {item: item, isEditing: true, categoryId: categoryId},
        });
        setModalVisible(false);
      },
    },
    {
      name: 'Delete',
      onPress: async (item: Product) => {
        await deleteProduct(item.id);
        setModalVisible(false);
      },
    },
  ];

  useEffect(() => {
    const loadInitialProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      if (!storedProducts) {
        await AsyncStorage.setItem(
          'products',
          JSON.stringify(predefinedProducts),
        );
      }
    };
    loadInitialProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadProducts = async () => {
        const storedProducts = await AsyncStorage.getItem('products');
        if (storedProducts) {
          const parsedProducts: Product[] = JSON.parse(storedProducts);
          const filteredProducts = parsedProducts.filter(
            product => product.categoryId === categoryId,
          );
          setProducts(filteredProducts);
        }
      };
      loadProducts();
    }, [categoryId]),
  );

  const saveProducts = async (updatedProducts: Product[]) => {
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = async (id: string) => {
    const storedProducts = await AsyncStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts: Product[] = JSON.parse(storedProducts);
      const updatedProducts = parsedProducts.filter(
        product => product.id !== id,
      );
      await saveProducts(updatedProducts);
      const filteredProducts = updatedProducts.filter(
        product => product.categoryId === categoryId,
      );
      setProducts(filteredProducts);
    }
  };

  const refreshProducts = async () => {
    setRefreshing(true);
    const storedProducts = await AsyncStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts: Product[] = JSON.parse(storedProducts);
      setProducts(
        parsedProducts.filter(product => product.categoryId === categoryId),
      );
    }
    setRefreshing(false);
  };

  const renderItem = ({item}: {item: Product}) => (
    <View style={{marginHorizontal: 12}}>
      <View style={styles.productitem}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View>
          <Text style={styles.productText}>{item.name}</Text>
          <Text style={styles.productText}>₹ {item.price}</Text>
        </View>
        <View style={styles.menuButtonContainer}>
          <Pressable
            onPress={() => {
              setSelectedProduct(item);
              setModalVisible(true);
            }}>
            <Image source={Images.menubtn} style={styles.menuButton} />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader categoryId={categoryId} label={'Product'} />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshProducts} />
        }
      />
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.btnView}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image source={Images.cancel} style={{height: 24, width: 24}} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnArrayView}>
            {buttonsArray.map(value => (
              <Pressable
                key={value.name}
                onPress={() => value.onPress(selectedProduct!)}>
                <Text style={styles.arrayBtn}>{value.name}</Text>
              </Pressable>
            ))}
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
  productitem: {
    flexDirection: 'row',
    borderColor: color.blue,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 16,
    padding: 6,
    shadowColor: color.black,
    elevation: 5,
    backgroundColor: color.white,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 10,
    resizeMode: 'cover',
  },
  productText: {
    color: color.black,
    margin: 4,
    fontSize: 14,
    width: 160,
  },
  menuButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  menuButton: {
    height: 30,
    width: 30,
  },
  modalView: {
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
  btnView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: -6,
    marginRight: 10,
  },
  btnArrayView: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  arrayBtn: {
    color: color.black,
    fontWeight: '600',
    fontSize: 22,
    marginTop: 10,
  },
});
