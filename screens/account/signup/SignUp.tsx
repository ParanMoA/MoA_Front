import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RootStackParamList} from '../../NavigationType';
import {styles} from './Style';

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
  const [date, setDate] = useState<Date>(new Date());
  const [birthDate, setBirthDate] = useState('');
  const [open, setOpen] = useState(false);

  const handleDateChange = (newDate: Date) => {
    const formattedDate =
      newDate.getFullYear() +
      '-' +
      (newDate.getMonth() + 1) +
      '-' +
      newDate.getDate();
    setBirthDate(formattedDate);
  };
  const handleSignUp = () => {
    const data = {
      email: email,
      password: password,
      gender: gender,
      birth: birthDate,
      name: name,
    };
    console.log(data);
    axios
      .post('http://localhost:8080/user/signup', {
        email: email,
        password: password,
        gender: gender,
        birth: birthDate,
        name: name,
      })
      .then(response => {
        console.log(response);
        Alert.alert('회원 가입', '회원 가입에 성공하였습니다.');
        navigation.navigate('LoginHome');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Login Failed', 'Please Check your email and password');
      });
  };

  const handleEmail = () => {
    axios
      .get('http://localhost:8080/user/signup/validation', {
        params: {email: email},
      })
      .then(response => {
        // console.log(response.headers['set-cookie']);
        console.log(response);
        Alert.alert('이메일 인증', '사용가능한 이메일입니다.');
      })
      .catch(error => {
        console.log(error);
        console.log(error.request);
        Alert.alert('이메일 인증', '중복된 이메일입니다.');
      });
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
      <View style={styles.emailContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}></TextInput>
        <TouchableOpacity style={styles.emailBtn} onPress={handleEmail}>
          <Text> 확인 </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}></TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGenderPress('Male')}>
          <Text style={styles.buttonText}> male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGenderPress('Female')}>
          <Text style={styles.buttonText}> female</Text>
        </TouchableOpacity>
      </View>
      <>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginHorizontal: '5%',
            paddingVertical: '2%',
            backgroundColor: '#FFF7F4',
            borderColor: '#000000',
            borderWidth: 1.5,
            borderRadius: 5,
            width: 100,
            height: 40,
          }}
          onPress={() => setOpen(true)}>
          <Text> 생일 </Text>
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              handleDateChange(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </TouchableOpacity>
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
