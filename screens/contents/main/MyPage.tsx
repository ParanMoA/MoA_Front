import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {MainParamList} from '../../NavigationType';

type MyPageScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'MyPage'>;
};

import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const MyPageScreen = ({navigation}: MyPageScreenProps) => {
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
      <TouchableOpacity onPress={handleIngredientPress}>
        <Icon name="plus" color="black" size={60}></Icon>
      </TouchableOpacity>
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
  logo: {
    width: 200,
    height: 100,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFD6BF',
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius: 5,
  },
});

export default MyPageScreen;
