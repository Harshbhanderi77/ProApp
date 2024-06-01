/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AppNavigator} from './src/navigation/AppNavigator.tsx';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
