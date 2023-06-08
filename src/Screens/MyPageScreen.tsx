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
  const [ingredientdata, setIngredientdata] = useState<IngredientData[]>([]);
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
    <View style={styles.textContainer}>
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  {
    /* 마이페이지 재료 조회 api */
  }
  const getRes = async () => {
    const res = await request('mypage/ingredients', [], 'GET');
    if (res?.ok) {
      // res.json().then(response => setMyingredientdata(response));
      res.json().then(response => console.log(response));
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
      res.json().then(response => setUserdata(response));
    }
  };
  useEffect(() => {
    getRes2();
  }, []);

  // const handleMyPageIngredient = async () => {
  //   const data = {
  //     registerDate: registerDate,
  //     purchaseDate: purchaseDate,
  //   };
  //   const res = await request('/');
  //   if (res?.ok) {
  //     console.log(res);
  //   }
  // };

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
            <View>
              <Text style={styles.text}>Name: {userdata.name}</Text>
              <Text style={styles.text}>Email: {userdata.email}</Text>
              <Text style={styles.text}>Birth: {userdata.birth}</Text>
            </View>
          </View>
        </View>
        <View style={styles.ingContainer}>
          <FlatList
            data={myingredientdata}
            keyExtractor={item => item.name.toString()}
            renderItem={renderItem}
          />
          <View>
            <TouchableOpacity onPress={handleIngredientPress}>
              <Icon name="plus" color="black" size={60}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyPageScreen;
