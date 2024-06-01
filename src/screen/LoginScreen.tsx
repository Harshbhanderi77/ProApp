import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '../style/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InputLogin} from '../component/InputLogin.tsx';
import {replace, Routes} from '../navigation/AppNavigator.tsx';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputArrar = [
    {
      key: 1,
      placeholder: 'Enter your Email',
      onchange: setEmail,
      errorText: emailError,
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      // value: email,
    },
    {
      key: 2,
      placeholder: 'Enter your Password',
      onchange: setPassword,
      errorText: passwordError,
      keyboardType: 'default',
      maxLength: 8,
      secureTextEntry: !showPassword,
      autoCapitalize: 'none',
    },
  ];

  //validation
  const handleLogin = () => {
    let isValid = true;

    //email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    //password
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Invalid password length');
      isValid = false;
    } else {
      setPasswordError('');
    }
    console.log('data:', isValid);

    return isValid;
  };

  const handleLoginPress = async () => {
    if (handleLogin()) {
      console.log('Login successful');
      await AsyncStorage.setItem('login', 'true');
      replace({screenName: Routes.Home});
    } else {
      console.log('Login failed');
    }
  };

  return (
    <View
      style={{
        backgroundColor: color.white,
        flex: 1,
        justifyContent: 'center',
      }}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 120,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: color.black, fontSize: 26, fontWeight: '600'}}>
              Login
            </Text>
          </View>
          {inputArrar.map(item => (
            <InputLogin
              key={item.key}
              placeholder={item.placeholder}
              keyboardType={item.keyboardType}
              setname={item.onchange}
              errorText={item.errorText}
              maxLength={item.maxLength as number}
              autoCapitalize={item.autoCapitalize}
              secureTextEntry={item.secureTextEntry}
            />
          ))}
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginHorizontal: 40,
            }}>
            <Text
              style={{
                color: color.black,
              }}>
              {showPassword ? 'Hide Password' : 'Show Password'}
            </Text>
          </TouchableOpacity>
          <Pressable
            onPress={handleLoginPress}
            style={{
              marginTop: 30,
              marginBottom: 20,
              backgroundColor: color.green,
              paddingVertical: 6,
              borderRadius: 12,
              marginHorizontal: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: color.black, fontSize: 20, fontWeight: '600'}}>
              Login
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
