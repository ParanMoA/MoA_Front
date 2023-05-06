import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {MainParamList} from '../../NavigationType';

type MyPageScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'MyPage'>;
};

import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './MyPageStyle';
import {ScrollView} from 'react-native-gesture-handler';

type IngredientData = {
  id: string;
  name: string;
};

const testIngredientData: IngredientData[] = [
  {
    id: '1',
    name: '식재료 1',
  },
  {
    id: '2',
    name: '식재료 2',
  },
  {
    id: '3',
    name: '식재료 3',
  },
];

const MyPageScreen = ({navigation}: MyPageScreenProps) => {
  const [data, setData] = useState<IngredientData[]>([]);
  const handleIngredientPress = () => {
    navigation.navigate('Ingredient');
  };
  useEffect(() => {
    setData(testIngredientData);
  }, []);
  const renderItem = ({item}: {item: IngredientData}) => (
    <ScrollView>
      <View style={styles.textContainer}>
        <Text style={styles.text}> {item.name}</Text>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.thirdContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../public/images/MoA_2.png')}
              style={styles.logo}
            />
          </View>
          <View style={[styles.textContainer, {paddingHorizontal: '8%'}]}>
            <Text style={[styles.text, {fontSize: 13}]}>Username: </Text>
            <Text style={[styles.text, {fontSize: 13}]}>Matching: </Text>
            <Text style={[styles.text, {fontSize: 13}]}>Location: </Text>
          </View>
        </View>
        <View style={styles.ingContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            style={{
              flex: 1,
            }}
          />
          <TouchableOpacity onPress={handleIngredientPress}>
            <Icon name="plus" color="black" size={60}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyPageScreen;
