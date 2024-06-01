import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {color} from '../style/color.ts';
interface InputLoginProps {
  placeholder: string;
  keyboardType: any;
  setname: (name: string) => void;
  maxLength: number;
  autoCapitalize: any;
  secureTextEntry: any;
  errorText: string;
}

export const InputLogin: React.FC<InputLoginProps> = ({
  placeholder,
  keyboardType,
  setname,
  maxLength,
  autoCapitalize,
  secureTextEntry,
  errorText,
}) => {
  return (
    <View
      style={{
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{width: '80%'}}>
        <View style={styles.inputview}>
          <TextInput
            // value={value}
            placeholder={placeholder}
            placeholderTextColor="#8c8c8c"
            keyboardType={keyboardType}
            onChangeText={setname}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            style={styles.inputsingup}
          />
        </View>
        <View style={{alignItems: 'flex-end'}}>
          {errorText && <Text style={{color: color.red}}>{errorText}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputview: {
    backgroundColor: color.gray1,
    borderRadius: 14,
    marginTop: 20,
  },
  inputsingup: {
    color: color.black,
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 22,
  },
});
