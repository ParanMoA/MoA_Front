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

  const handleDateChange = (newDate: Date) => {
    const formattedDate =
      newDate.getFullYear() +
      '-' +
      (newDate.getMonth() + 1) +
      '-' +
      newDate.getDate();
    setBirthDate(formattedDate);
  };
  const handleSignUp = async () => {
    const data: SignUpData = {
      email: email,
      password: password,
      gender: gender,
      birth: birthDate,
      name: name,
    };
    const result = await request('user/signup', data, 'POST');
    if (result?.ok) {
      Alert.alert('회원 가입', '회원 가입에 성공하였습니다.');
      navigation.navigate('LoginHomeScreen');
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          maxLength={20}
          value={email}
          onChangeText={setEmail}></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEmail}>
          <Text style={styles.buttonText}> 중복 확인 </Text>
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
          style={getButtonStyle('Male')}
          onPress={() => handleGenderPress('Male')}>
          <Text style={styles.buttonText}> male </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('Female')}
          onPress={() => handleGenderPress('Female')}>
          <Text style={styles.buttonText}> female </Text>
        </TouchableOpacity>
      </View>
      <>
        <View style={styles.inputContainer}>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;