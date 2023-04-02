import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {MainParamList} from '../../NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Home'>;
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const handleIngredientPress = () => {
    navigation.navigate('Ingredient');
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleIngredientPress}>
          <Text> 식재료 등록 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text> 모집글 보기 </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  logo: {
    width: 200,
    height: 100,
  },
});

export default HomeScreen;
