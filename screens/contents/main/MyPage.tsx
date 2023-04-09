import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {MainParamList} from '../../NavigationType';

type MyPageScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'MyPage'>;
};

import axios from 'axios';

const MyPageScreen = ({navigation}: MyPageScreenProps) => {
  const handleIngredientPress = () => {
    navigation.navigate('Ingredient');
  };
  const handleData = () => {
    // console.log('hello');
    axios
      .get(
        'https://new-api.spacecloud.kr/products/56984/prices?reservation_type_id=104496&year=2023&month=04',
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
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
      <TouchableOpacity style={styles.button} onPress={handleData}>
        <Text>클릭</Text>
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
