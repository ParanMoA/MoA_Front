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
  name: string;
  birth: any;
  email: string;
};

type MyingredientData = {
  name: string;
  purchasedDate: any;
  expirationDate: any;
};

const MyPageScreen = ({navigation}: MyPageScreenProps) => {
  const [userdata, setUserdata] = useState<UserData>({
    name: '',
    birth: null,
    email: '',
  });
  const [myingredientdata, setMyingredientdata] = useState<MyingredientData[]>(
    [],
  );

  const handleIngredientPress = () => {
    navigation.navigate('IngredientScreen');
  };

  const renderItem = ({item}: {item: MyingredientData}) => (
    <View
      key={item.name}
      style={[styles.textContainer, {flexDirection: 'row'}]}>
      <Text style={styles.text}>{item.name}</Text>
      <View style={styles.line} />
      <View style={{flexDirection: 'column'}}>
        <Text>구매날짜 : {item.purchasedDate}</Text>
        <Text>유통기한 : {item.expirationDate}</Text>
      </View>
    </View>
  );

  const getRes = async () => {
    const res = await request('mypage/ingredients', [], 'GET');
    if (res?.ok) {
      let response = await res.json();
      console.log(response);
      setMyingredientdata(response);
    }
  };
  useEffect(() => {
    getRes();
  }, []);

  {
    /* 마이페이지 정보 조회 api */
  }
  const getRes2 = async () => {
    const res = await request('mypage/info', [], 'GET');
    if (res?.ok) {
      let response = await res.json();
      setUserdata(response);
    }
  };
  useEffect(() => {
    getRes2();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.thirdContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logo}
              source={require('../../public/images/MoA_2.png')}
            />
          </View>
          <View style={[styles.textContainer, {paddingHorizontal: 0}]}>
            <View>
              <Text style={styles.text}>Name: {userdata.name}</Text>
              <Text style={styles.text}>Email: {userdata.email}</Text>
              <Text style={styles.text}>Birth: {userdata.birth}</Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: '#6B7684'}}> 식재료 등록 목록 </Text>
            <TouchableOpacity onPress={handleIngredientPress}>
              <Icon name="plus" color="#6B7584" size={18}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.ingContainer}>
            <FlatList
              data={myingredientdata}
              keyExtractor={item => item.name.toString()}
              renderItem={renderItem}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyPageScreen;
