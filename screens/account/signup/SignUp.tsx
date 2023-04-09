import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {RootStackParamList} from '../../NavigationType';
import DatePicker from 'react-native-date-picker';

import {styles} from './Style';

import axios from 'axios';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

const SignUpScreen = ({navigation}: SignUpScreenProps) => {
  const handlePress = () => {
    navigation.navigate('LoginHome');
  };
  const handleGenderPress = (selectedGender: string) => {
    setGender(selectedGender);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date) => {
    setBirthDate(newDate);
  };
  const dateString = birthDate.toISOString().slice(0, 10).replace(/-/g, '');
  const handleSignUp = () => {
    navigation.goBack();
    // axios
    //   .post('http://localhost:8080/user/signup', {
    //     email,
    //     password,
    //     name,
    //     birthDate,
    //     gender,
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //     Alert.alert('SignUp', 'SignUp Successful');
    //     navigation.goBack();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     Alert.alert('SignUp', 'SignUp Failed');
    //   });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../public/images/MoA.png')}
        style={styles.logo}
      />
      <Image
        source={require('../../../public/images/MoA_2.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}></TextInput>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGenderPress('M')}>
          <Text style={styles.buttonText}> male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGenderPress('F')}>
          <Text style={styles.buttonText}> female</Text>
        </TouchableOpacity>
      </View>
      <>
        <DatePicker
          date={birthDate}
          mode="date"
          onDateChange={handleDateChange}
        />
      </>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
