import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {MainParamList} from '../Navigation/NavigationType';

import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../Styles/Screen/MyPageStyle';
import {ScrollView} from 'react-native-gesture-handler';
import {request} from '../Components/AxiosComponent';

type MyPageScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'MyPageScreen'>;
};
type IngredientData = {
  name: string;
  registerDate: any;
  purchaseDate: any;
  expirationDate: any;
  email: string;
  birth: any;
};

// const testIngredientData: IngredientData[] = [
//   {
//     name: '식재료 1',
//     registerDate: 1023,
//     purchaseDate: 1024,
//     expirationDate: 1025,
//   },
//   {
//     name: '식재료 2',
//     registerDate: 2023,
//     purchaseDate: 2024,
//     expirationDate: 2025,
//   },
//   {
//     name: '식재료 3',
//     registerDate: 3023,
//     purchaseDate: 3024,
//     expirationDate: 3025,
//   },
// ];

const MyPageScreen = ({navigation}: MyPageScreenProps) => {
  const [data, setData] = useState<IngredientData[]>([]);
  const [registerDate, setRegisterDate] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');

  const handleIngredientPress = () => {
    navigation.navigate('IngredientScreen');
  };
  // useEffect(() => {
  //   setData(testIngredientData);
  // }, []);

  const renderItem = ({item}: {item: IngredientData}) => (
    <ScrollView>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={handleMyPageIngredient}></TouchableOpacity>
        <Text
          style={[
            styles.text,
            {color: 'black', fontSize: 20, fontWeight: 'bold'},
          ]}>
          {item.name}
          {item.registerDate}ddd
        </Text>
      </View>
    </ScrollView>
  );

  // 마이페이지 재료 조회 api
  const getRes = async () => {
    const res = await request('mypage/ingredients', [], 'GET');
    if (res?.ok) {
      res.json().then(response => setData(response));
    }
  };
  useEffect(() => {
    getRes();
  }, []);

  //마이페이지 정보 조회 api
  const getRes2 = async () => {
    const res = await request('mypage/info', [], 'GET');
    if (res?.ok) {
      res.json().then(response => setData(response));
    }
  };
  useEffect(() => {
    getRes2();
  }, []);

  const handleMyPageIngredient = async () => {
    const data = {
      registerDate: registerDate,
      purchaseDate: purchaseDate,
    };
    const res = await request('/');
    if (res?.ok) {
      console.log(res);
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, {alignItems: 'center'}]}>
        <View style={styles.thirdContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../public/images/MoA_2.png')}
              style={[
                styles.logo,
                {
                  width: '100%',
                  height: '90%',
                  borderRadius: 100,
                },
              ]}
            />
          </View>
          <View style={[styles.textContainer, {paddingHorizontal: 0}]}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 'bold',
                },
              ]}>
              Username:{}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 'bold',
                },
              ]}>
              Matching:{' '}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 'bold',
                },
              ]}>
              Location:{' '}
            </Text>
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
