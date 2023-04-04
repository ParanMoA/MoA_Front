import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MainParamList} from '../../NavigationType';

type MyPageScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'MyPage'>;
};

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
      <TouchableOpacity style={styles.button} onPress={handleIngredientPress}>
        <Text>식재료 등록</Text>
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
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius: 5,
  },
});

export default MyPageScreen;
