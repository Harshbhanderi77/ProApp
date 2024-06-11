// import React, {useEffect, useState} from 'react';
// import {
//   FlatList,
//   Image,
//   Modal,
//   Pressable,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   RefreshControl,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {color} from '../style/color';
// import {Images} from '../assets/images.ts';
// import {CustomHeader} from '../component/CustomHeader.tsx';
// import {navigate, Routes} from '../navigation/AppNavigator.tsx';
//
// interface ProductScreenProps {
//   route: any;
// }
//
// export interface Product {
//   id: string;
//   categoryId: string;
//   image: string;
//   name: string;
//   price: string;
// }
//
// const predefinedProducts: Product[] = [
//   {
//     id: '1',
//     categoryId: '1',
//     image: 'https://via.placeholder.com/60',
//     name: 'Bajrano - Rotlo',
//     price: '50.00',
//   },
//   {
//     id: '2',
//     categoryId: '1',
//     image: 'https://via.placeholder.com/60',
//     name: 'Khela Khela Khaman',
//     price: '100.00',
//   },
//   {
//     id: '3',
//     categoryId: '2',
//     image: 'https://via.placeholder.com/60',
//     name: 'Cheez butter masala',
//     price: '150.00',
//   },
//   {
//     id: '4',
//     categoryId: '2',
//     name: 'Shahi Paneer',
//     image: 'https://via.placeholder.com/60',
//     price: '180.00',
//   },
//   {
//     id: '5',
//     categoryId: '2',
//     name: 'Butter Nan',
//     image: 'https://via.placeholder.com/60',
//     price: '40.00',
//   },
//   {
//     id: '6',
//     categoryId: '3',
//     name: 'Chaines Bhel',
//     image: 'https://via.placeholder.com/60',
//     price: '120.00',
//   },
//   {
//     id: '7',
//     categoryId: '3',
//     name: 'Dry Manchurian',
//     image: 'https://via.placeholder.com/60',
//     price: '150.00',
//   },
//   {
//     id: '8',
//     categoryId: '4',
//     name: 'Maisur Masala',
//     image: 'https://via.placeholder.com/60',
//     price: '150.00',
//   },
//   {
//     id: '9',
//     categoryId: '4',
//     name: 'Uttapam',
//     image: 'https://via.placeholder.com/60',
//     price: '120.00',
//   },
//   {
//     id: '10',
//     categoryId: '5',
//     name: 'Cauliflower Tacos',
//     image: 'https://via.placeholder.com/60',
//     price: '180.00',
//   },
//   {
//     id: '11',
//     categoryId: '5',
//     name: 'Vegetarian Soup',
//     image: 'https://via.placeholder.com/60',
//     price: '170.00',
//   },
// ];
//
// export const ProductScreen: React.FC<ProductScreenProps> = ({route}) => {
//   const {categoryId} = route.params;
//   const [products, setProducts] = useState<Product[]>([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [refreshing, setRefreshing] = useState(false);
//
//   const buttonsArray = [
//     {
//       name: 'Add Product',
//       onPress: () => {
//         navigate({
//           screenName: Routes.EditProduct,
//           params: {item: {}},
//         });
//       },
//     },
//     {
//       name: 'Edit',
//       onPress: (item: Product) => {
//         navigate({
//           screenName: Routes.EditProduct,
//           params: {item: item},
//         });
//         setModalVisible(false);
//       },
//     },
//     {
//       name: 'Delete',
//       onPress: async (item: Product) => {
//         await deleteProduct(item.id);
//         setModalVisible(false);
//       },
//     },
//   ];
//
//   useEffect(() => {
//     const loadProducts = async () => {
//       const storedProducts = await AsyncStorage.getItem('products');
//       if (storedProducts) {
//         const parsedProducts: Product[] = JSON.parse(storedProducts);
//         if (parsedProducts.length > 0) {
//           setProducts(
//             parsedProducts.filter(product => product.categoryId === categoryId),
//           );
//         } else {
//           setProducts(
//             predefinedProducts.filter(
//               product => product.categoryId === categoryId,
//             ),
//           );
//         }
//       } else {
//         setProducts(
//           predefinedProducts.filter(
//             product => product.categoryId === categoryId,
//           ),
//         );
//         await AsyncStorage.setItem(
//           'products',
//           JSON.stringify(predefinedProducts),
//         );
//       }
//     };
//     loadProducts();
//   }, [categoryId]);
//
//   const saveProducts = async (updatedProducts: Product[]) => {
//     await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
//   };
//
//   const deleteProduct = async (id: string) => {
//     const updatedProducts = products.filter(product => product.id !== id);
//     setProducts(updatedProducts);
//     await saveProducts(updatedProducts);
//   };
//
//   const refreshProducts = async () => {
//     setRefreshing(true);
//     const storedProducts = await AsyncStorage.getItem('products');
//     if (storedProducts) {
//       const parsedProducts: Product[] = JSON.parse(storedProducts);
//       setProducts(
//         parsedProducts.filter(product => product.categoryId === categoryId),
//       );
//     } else {
//       setProducts(
//         predefinedProducts.filter(product => product.categoryId === categoryId),
//       );
//       await AsyncStorage.setItem(
//         'products',
//         JSON.stringify(predefinedProducts),
//       );
//     }
//     setRefreshing(false);
//   };
//
//   const renderItem = ({item}: {item: Product}) => (
//     <View style={{marginHorizontal: 12}}>
//       <View style={styles.categoryItem}>
//         <Image source={{uri: item.image}} style={styles.categoryImage} />
//         <View style={styles.categoryDetails}>
//           <Text style={styles.categoryText}>{item.name}</Text>
//           <Text style={styles.categoryText}>$ {item.price}</Text>
//         </View>
//         <View style={styles.menuButtonContainer}>
//           <Pressable
//             onPress={() => {
//               setSelectedProduct(item);
//               setModalVisible(true);
//             }}>
//             <Image source={Images.menubtn} style={styles.menuButton} />
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   );
//
//   return (
//     <View style={styles.container}>
//       <CustomHeader label={'Product'} />
//       <FlatList
//         data={products}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={refreshProducts} />
//         }
//       />
//       <Modal
//         transparent={true}
//         animationType={'slide'}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modelview}>
//           <View style={styles.btnview}>
//             <TouchableOpacity onPress={() => setModalVisible(false)}>
//               <Image source={Images.cancel} style={{height: 24, width: 24}} />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.btnarrayview}>
//             {buttonsArray.map(value => {
//               return (
//                 <Pressable
//                   key={value.name}
//                   onPress={() => value.onPress(selectedProduct!)}>
//                   <Text style={styles.arraybtn}>{value.name}</Text>
//                 </Pressable>
//               );
//             })}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: color.white,
//   },
//   categoryItem: {
//     flexDirection: 'row',
//     borderColor: color.blue,
//     borderRadius: 12,
//     borderWidth: 1,
//     alignItems: 'center',
//     marginTop: 16,
//     padding: 6,
//     // Add shadow for iOS
//     shadowColor: color.black,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 3.84,
//     // Add elevation for Android
//     elevation: 5,
//     backgroundColor: color.white,
//   },
//   categoryImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 100,
//     marginRight: 10,
//   },
//   categoryDetails: {
//     flex: 1,
//   },
//   categoryText: {
//     color: color.black,
//     marginBottom: 5,
//   },
//   menuButtonContainer: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   menuButton: {
//     height: 30,
//     width: 30,
//   },
//   header: {
//     fontSize: 20,
//     color: color.black,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   productItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   productimg: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 10,
//   },
//   maincontainer: {
//     backgroundColor: color.white,
//     flex: 1,
//   },
//   btncontaner: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   editbtn: {
//     color: color.black,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   trashimg: {
//     height: 24,
//     width: 24,
//   },
//   modelview: {
//     flex: 1,
//     bottom: 0,
//     position: 'absolute',
//     width: '100%',
//     backgroundColor: color.gray1,
//     borderWidth: 1,
//     borderColor: color.blue,
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//   },
//   btnview: {
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     top: -6,
//     marginRight: 10,
//   },
//   btnarrayview: {
//     alignItems: 'center',
//     paddingVertical: 16,
//   },
//   arraybtn: {
//     color: color.black,
//     fontWeight: '600',
//     fontSize: 22,
//     marginTop: 10,
//   },
// });

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
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color} from '../style/color';
import {Images} from '../assets/images.ts';
import {CustomHeader} from '../component/CustomHeader.tsx';
import {navigate, Routes} from '../navigation/AppNavigator.tsx';

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
  const {categoryId} = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const buttonsArray = [
    // {
    //   name: 'Add Product',
    //   onPress: () => {
    //     navigate({
    //       screenName: Routes.EditProduct,
    //       params: {item: {}, categoryId},
    //     });
    //   },
    // },
    {
      name: 'Edit',
      onPress: (item: Product) => {
        navigate({
          screenName: Routes.EditProduct,
          params: {item: item},
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
    const loadProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        const parsedProducts: Product[] = JSON.parse(storedProducts);
        setProducts(
          parsedProducts.filter(product => product.categoryId === categoryId),
        );
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

  const refreshProducts = async () => {
    setRefreshing(true);
    const storedProducts = await AsyncStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts: Product[] = JSON.parse(storedProducts);
      setProducts(
        parsedProducts.filter(product => product.categoryId === categoryId),
      );
    } else {
      setProducts(
        predefinedProducts.filter(product => product.categoryId === categoryId),
      );
      await AsyncStorage.setItem(
        'products',
        JSON.stringify(predefinedProducts),
      );
    }
    setRefreshing(false);
  };

  const renderItem = ({item}: {item: Product}) => (
    <View style={{marginHorizontal: 12}}>
      <View style={styles.categoryItem}>
        <Image source={{uri: item.image}} style={styles.categoryImage} />
        <View style={styles.categoryDetails}>
          <Text style={styles.categoryText}>{item.name}</Text>
          <Text style={styles.categoryText}>$ {item.price}</Text>
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
      <CustomHeader label={'Product'} />
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
        <View style={styles.modelview}>
          <View style={styles.btnview}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image source={Images.cancel} style={{height: 24, width: 24}} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnarrayview}>
            {buttonsArray.map(value => {
              return (
                <Pressable
                  key={value.name}
                  onPress={() => value.onPress(selectedProduct!)}>
                  <Text style={styles.arraybtn}>{value.name}</Text>
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
    borderColor: color.blue,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 16,
    padding: 6,
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: color.white,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 10,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryText: {
    color: color.black,
    marginBottom: 5,
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
  modelview: {
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
  btnview: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: -6,
    marginRight: 10,
  },
  btnarrayview: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  arraybtn: {
    color: color.black,
    fontWeight: '600',
    fontSize: 22,
    marginTop: 10,
  },
});
