import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../NavigationType';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const handlePress = () => {
    navigation.navigate('LoginHome');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // if (email === 'MoA' && password === 'Hello') {
    //   navigation.navigate('Main');
    // } else {
    //   Alert.alert('Error', 'Invalid email or password');
    // }
    navigation.navigate('Main');
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text>Login</Text>
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
  buttonContainer: {flexDirection: 'row'},
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFD6BF',
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  logo: {
    width: 200,
    height: 100,
  },
});
export default LoginScreen;
