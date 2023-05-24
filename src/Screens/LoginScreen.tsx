import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {RootStackParamList} from '../Navigation/NavigationType';
import {styles} from '../Styles/Screen/LoginStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request} from '../Components/AxiosComponent';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
};

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigation.navigate('LoginHomeScreen');
  };

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    const res = await request('user/login', data, 'POST');
    if (res?.ok) {
      res
        .json()
        .then(response =>
          AsyncStorage.setItem('AccessToken', JSON.stringify(response)),
        )
        .catch(error => console.log(error));
      navigation.navigate('BottomTab');
    } else {
      console.log(res);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../public/images/MoA.png')}
        style={styles.logo}
      />
      <Image
        source={require('../../public/images/MoA_2.png')}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.inputText, {backgroundColor: '#FFFFFF'}]}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          multiline={false}
          textAlignVertical="auto"
          onChangeText={setEmail}></TextInput>
        <TextInput
          style={[styles.inputText, {backgroundColor: '#FFFFFF'}]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}></TextInput>
      </View>
      <View
        style={[
          styles.buttonContainer,
          {
            justifyContent: 'space-between',
            paddingHorizontal: '20%',
            paddingVertical: '1%',
          },
        ]}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text
            style={[
              styles.btnText,
              {
                paddingHorizontal: '2%',
                paddingVertical: '0.5%',
              },
            ]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text
            style={[
              styles.btnText,
              {
                paddingHorizontal: '2%',
                paddingVertical: '0.5%',
              },
            ]}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
