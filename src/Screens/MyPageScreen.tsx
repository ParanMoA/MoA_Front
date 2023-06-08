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
type UserData = {
  Name: string;
  birth: any;
  email: string;
};
const MyPageScreen = ({navigation}: MyPageScreenProps) => {
  const [ingredientdata, setIngredientData] = useState<IngredientData[]>([]);
  const [userdata, setUserdata] = useState<UserData[]>([]);
  const [registerDate, setRegisterDate] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');

  const handleIngredientPress = () => {
    navigation.navigate('IngredientScreen');
  };
  // useEffect(() => {
  //   setData(testIngredientData);
  // }, []);

  const renderItem = ({item}: {item: UserData}) => (
    <View key={item.Name}>
      <Text style={{fontSize: 50, color: 'black'}}>{item.Name}</Text>
    </View>
  );

  // 마이페이지 재료 조회 api
  const getRes = async () => {
    const res = await request('mypage/ingredients', [], 'GET');
    if (res?.ok) {
      res.json().then(response => console.log(response));
    }
  };
  useEffect(() => {
    getRes();
  }, []);

  // 마이페이지 정보 조회 api
  const getRes2 = async () => {
    const res = await request('mypage/info', [], 'GET');
    if (res?.ok) {
      res.json().then(response => setUserdata(response));
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
              style={styles.logo}
              source={require('../../public/images/MoA_2.png')}
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
              Name:{}
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
              Email:{' '}
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
              Birth:{' '}
            </Text>
          </View>
        </View>
        <View style={styles.ingContainer}>
          <TouchableOpacity onPress={handleIngredientPress}>
            <Icon name="plus" color="black" size={60}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyPageScreen;
