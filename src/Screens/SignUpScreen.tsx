import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {RootStackParamList} from '../Navigation/NavigationType';
import {styles} from '../Styles/Screen/SignUpStyle';
import {request} from '../Components/AxiosComponent';
import axios from 'axios';
type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUpScreen'>;
};

interface SignUpData {
  email: string;
  password: string;
  gender: string;
  birth: string;
  name: string;
}

const SignUpScreen = ({navigation}: SignUpScreenProps) => {
  const handlePress = () => {
    navigation.navigate('LoginHomeScreen');
  };
  const handleGenderPress = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const getButtonStyle = (buttonGender: string) => {
    return {
      ...styles.button,
      backgroundColor: gender === buttonGender ? '#FFC1B3' : '#FFF7F4',
    };
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [birthDate, setBirthDate] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [signUpPossible, setSignUpPossible] = useState<boolean>(false);
  const handleDateChange = (newDate: Date) => {
    if (newDate.getFullYear() > 2004) {
      setSignUpPossible(false);
    } else {
      const formattedDate =
        newDate.getFullYear() +
        '-' +
        (newDate.getMonth() + 1) +
        '-' +
        newDate.getDate();
      setBirthDate(formattedDate);
      setSignUpPossible(true);
    }
  };
  const handleSignUp = async () => {
    const data: SignUpData = {
      email: email,
      password: password,
      gender: gender,
      birth: birthDate,
      name: name,
    };
    if (email === '') {
      Alert.alert('이메일 입력', '이메일을 입력해주세요');
    } else if (password === '') {
      Alert.alert('비밀번호 입력', '비밀번호를 입력해주세요');
    } else if (name === '') {
      Alert.alert('닉네임 입력', '닉네임을 입력해주세요');
    } else if (gender === '') {
      Alert.alert('성별 선택 ', '성별을 선택해주세요');
    } else if (birthDate === '') {
      Alert.alert('생일 입력 ', '생일을 올바르게 선택하여 주세요');
    } else {
      const result = await request('user/signup', data, 'POST');
      if (result?.ok) {
        Alert.alert('회원 가입', '회원 가입에 성공하였습니다.');
        navigation.navigate('LoginHomeScreen');
      }
    }
  };

  const handleEmail = async () => {
    try {
      const res = await request(
        'user/signup/validation',
        {email: email},
        'GET',
      );
      if (res?.ok) {
        Alert.alert('이메일 인증', '사용가능한 이메일입니다.');
      }
    } catch (e) {
      console.log(e);
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
      <View
        style={[
          styles.inputContainer,
          {margin: '0.3%', paddingVertical: '1%'},
        ]}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          maxLength={20}
          value={email}
          onChangeText={setEmail}></TextInput>
      </View>
      <View
        style={[
          styles.buttonContainer,
          {margin: '0.3%', marginTop: 0, paddingVertical: '1%'},
        ]}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              marginHorizontal: '5%',
              paddingVertical: '2%',
              paddingHorizontal: '10%',
            },
          ]}
          onPress={handleEmail}>
          <Text style={[styles.buttonText, {paddingVertical: '1%'}]}>
            중복 확인
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.inputContainer,
          {margin: '0.3%', paddingVertical: '1%'},
        ]}>
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
      <View
        style={[
          styles.buttonContainer,
          {margin: '0.3%', marginTop: 0, paddingVertical: '1%'},
        ]}>
        <TouchableOpacity
          style={getButtonStyle('Male')}
          onPress={() => handleGenderPress('Male')}>
          <Text style={[styles.buttonText, {paddingVertical: '1%'}]}>male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('Female')}
          onPress={() => handleGenderPress('Female')}>
          <Text style={[styles.buttonText, {paddingVertical: '1%'}]}>
            female
          </Text>
        </TouchableOpacity>
      </View>
      <>
        <View
          style={[
            styles.inputContainer,
            {margin: '0.3%', paddingVertical: '1%'},
          ]}>
          <TouchableOpacity
            style={styles.BirthBtn}
            onPress={() => setOpen(true)}>
            <Text style={styles.inputText}> 생일 </Text>
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
        </View>
      </>
      <View
        style={[
          styles.buttonContainer,
          {margin: '0.3%', marginTop: 0, paddingVertical: '1%'},
        ]}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              marginHorizontal: '5%',
              paddingVertical: '2%',
              paddingHorizontal: '10%',
            },
          ]}
          onPress={handleSignUp}>
          <Text style={[styles.buttonText, {paddingVertical: '1%'}]}>
            SignUp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              marginHorizontal: '5%',
              paddingVertical: '2%',
              paddingHorizontal: '10%',
            },
          ]}
          onPress={handlePress}>
          <Text style={[styles.buttonText, {paddingVertical: '1%'}]}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
