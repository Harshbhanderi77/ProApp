import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../style/color';
import {CustomHeader} from '../component/CustomHeader';

export const EditProduct: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomHeader label={'Edit Product'} />
      <View style={{marginHorizontal: 12}}>
        <Text style={{color: color.black}}>EditProduct</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
