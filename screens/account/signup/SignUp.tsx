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
    console.log(email, password, gender, name, birthDate);
    Alert.alert('SignUp', 'SignUp Successful');
    navigation.goBack();
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
          onPress={() => handleGenderPress('male')}>
          <Text style={styles.buttonText}> male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGenderPress('female')}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
    flex: 1,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 12,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFD6BF',
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 100,
  },
  buttonText: {
    color: '#fff',
  },
});
export default SignUpScreen;
