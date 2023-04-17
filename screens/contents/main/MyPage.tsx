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
import {styles} from './MyPageStyle';

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

export default MyPageScreen;
