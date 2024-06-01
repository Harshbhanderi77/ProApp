import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProductScreenProps {
  route: any;
}

interface Product {
  id: string;
  categoryId: string;
  name: string;
  price: string;
}

const predefinedProducts: Product[] = [
  {
    id: '1',
    categoryId: '1',
    name: 'Bajrano - Rotlo',
    price: '50.00',
  },
  {
    id: '2',
    categoryId: '2',
    name: 'Khela Khela Khaman',
    price: '100.00',
  },
  {
    id: '3',
    categoryId: '3',
    name: 'Cheez butter masala',
    price: '150.00',
  },
];

export const ProductScreen: React.FC<ProductScreenProps> = ({route}) => {
  const {categoryId, categoryName} = route.params;

  const [productss, setProductss] = useState<Product[]>();

  useMemo(async () => {
    const storedProducts = await AsyncStorage.getItem('products');

    if (storedProducts !== null) {
      if (JSON.parse(storedProducts).length > 0) {
        setProductss(
          JSON.parse(storedProducts).filter(
            (product: Product) => product.categoryId === categoryId,
          ),
        );
      } else {
        setProductss(
          predefinedProducts.filter(
            product => product.categoryId === categoryId,
          ),
        );
      }
    }
  }, [categoryId]);


  const saveProducts = async (updatedProducts: Product[]) => {
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // const addProduct = (newProduct: Product) => {
  //   const updatedProducts = [...products, newProduct];
  //   saveProducts(updatedProducts);
  // };

  // const deleteProduct = (id: string) => {
  //   const updatedProducts = products.filter(product => product.id !== id);
  //   saveProducts(updatedProducts);
  // };

  const renderItem = ({item}: {item: Product}) => (
    <View style={styles.productItem}>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <Button title="Delete" onPress={() => {}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products for {categoryName}</Text>
      <FlatList
        data={productss}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

// import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {color} from '../style/color.ts';
//
// export const ProductScreen: React.FC = () => {
//   return (
//     <View style={{backgroundColor: color.white, flex: 1}}>
//       <Text style={{color: color.black}}>ProductScreen</Text>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({});
