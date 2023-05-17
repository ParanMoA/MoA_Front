import React, {useState, useEffect, useId} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Modal,
  TextInput,
} from 'react-native';

import axios from 'axios';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainParamList} from '../Navigation/NavigationType';
import {styles} from '../Styles/Screen/RecruitStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {request} from '../Components/AxiosComponent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Test from './test';
import MyRecruitScreen from './MyRecruitScreen';

type dataList = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type RecruitScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'RecruitScreen'>;
};

const TopTab = createMaterialTopTabNavigator();

const RecruitScreen = ({navigation}: RecruitScreenProps) => {
  const [foodname, setFoodname] = useState('');
  const [ingredient, setIngredient] = useState<string>('');
  const [needIngredients, setNeedIngredients] = useState<string[]>([]);
  const [maxpeople, setMaxpeople] = useState<number>();
  const [recruitdate, setRecruitdate] = useState<string>('');
  const [useremail, setUserEmail] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [recruitId, setRecruitId] = useState<number>();
  const [id, setId] = useState<string[]>([]);
  const handleBack = () => {
    navigation.navigate('HomeScreen');
  };

  const Tab = createMaterialTopTabNavigator();

  const SettingList = () => {
    return (
      <View style={styles.textContainer}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    );
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() === '') {
      return;
    }
    setNeedIngredients([...needIngredients, ingredient]);
    setIngredient('');
  };
  const [data, setData] = useState<dataList[]>([]);

  const renderItem = ({item}: {item: dataList}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={styles.item}>
        {item.id}
        {item.title}
      </Text>
      <TouchableOpacity
        style={[styles.item, item && styles.completed]}
        onPress={handleRecruitJoin}
        // if작성자라면 내가 등록한 모집글 리스트에서 승인/거절 결정가능
        // onPress={() => {
        //   setData(
        //     data.map(dataList =>
        //       dataList.id === item.id ? {...dataList} : dataList,
        //     ),
        //   );
        // }}>
      >
        <Text style={styles.joinbtn}>Join</Text>
      </TouchableOpacity>
    </View>
  );

  //아래는 등록버튼
  const handleRecruit = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    const reqHeader = {
      'x-access-token': token || '',
      'content-type': 'application/json',
    };
    const data = {
      foodName: foodname,
      needIngredients: needIngredients,
      maxPeople: maxpeople,
      recruitDate: recruitdate,
      title: title,
      content: content,
    };
    console.log(data);
    await axios({
      method: 'POST',
      url: 'http://localhost:8080/recruit/create',
      data,
      headers: reqHeader,
    })
      .then(response => {
        console.log('Data : ', response.data);
        const rId = response.data.id;
        console.log(rId);
        setRecruitId(rId);
        navigation.navigate('RecruitScreen');
      })
      .catch(error => {
        console.log(error.request);
        Alert.alert('Recruit Failed', 'Please Check your Recruit Options');
      });
  };
  //아래는 수정버튼

  const handleRecruitModify = async () => {
    const data = {
      foodName: foodname,
      needIngredients: needIngredients,
      maxPeople: maxpeople,
      recruitDate: recruitdate,
      title: title,
      content: content,
    };
    const res = await request('recruit/modify/' + recruitId, data, 'POST');
    if (res?.ok) {
      console.log(res);
    }
  };

  //아래는 삭제버튼
  const handleRecruitDelete = async () => {
    const res = await request('recruit/delete/' + recruitId, {}, 'POST');
    if (res?.ok) {
      console.log(res);
    }
  };

  //아래는 참여버튼

  const handleRecruitJoin = async () => {
    try {
      const res = await request(
        'recruit/' + recruitId + '/participate/register',
        {id: id},
        'POST',
      );
      if (res?.ok) {
        Alert.alert('Join', '참여신청을 보냈습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  //아래는 승인
  const handleApprove = async () => {
    try {
      const res = await request(
        'recruit/' + recruitId + '/participate/allow' + id,
        {id: id},
        'POST',
      );
      if (res?.ok) {
        Alert.alert('Approve', '승인처리 되었습니다.');
      }
    } catch (e) {
      console.log(e);
      navigation.navigate('RecruitScreen');
    }
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    console.log(`Saving: ${foodname}`);
    Alert.alert('Are you sure to join?', 'really?', [
      {text: 'confirm', onPress: () => Alert.alert('confirm')},
      {text: 'cancel', onPress: () => Alert.alert('cancel')},
    ]);
  };

  const handleConfirm = () => {
    Alert.alert('등록자에게 요청을 보냈습니다.');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    Alert.alert('취소되었습니다.');
    setIsModalVisible(false);
  };

  const getRes = async () => {
    const res = await request('recruit/list');
    console.log(res);
  };

  useEffect(() => {
    getRes();
  }, []);

  return (
    // <View>
    <TopTab.Navigator
      initialRouteName="Tab1"
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarLabelStyle: {fontSize: 15},
        tabBarStyle: {backgroundColor: '#FFD8C6'},
      }}>
      <TopTab.Screen
        name="Tab1"
        component={Test}
        options={{tabBarLabel: '모집글 리스트'}}
      />
      <TopTab.Screen
        name="Tab2"
        component={MyRecruitScreen}
        options={{tabBarLabel: '내가 등록한 모집글'}}
      />
    </TopTab.Navigator>
    // </View>
    // <View style={styles.container}>
    //   <TouchableOpacity style={styles.button} onPress={handleModalOpen}>
    //     <Text style={styles.btnText}>모집글 등록하기</Text>
    //   </TouchableOpacity>
    //   <Modal visible={isModalVisible} onRequestClose={handleModalClose}>
    //     <View style={styles.container}>
    //       <View style={styles.item}>
    //         <TextInput
    //           style={styles.btnText}
    //           placeholder="put your foodname..."
    //           value={foodname}
    //           onChangeText={setFoodname}></TextInput>
    //         <TextInput
    //           style={styles.btnText}
    //           placeholder="put ingredients..."
    //           value={ingredient}
    //           onChangeText={setIngredient}
    //           onSubmitEditing={handleAddIngredient}></TextInput>
    //         <TextInput
    //           style={styles.btnText}
    //           placeholder="put max people..."
    //           value={maxpeople?.toString()}
    //           onChangeText={text => setMaxpeople(parseInt(text))}></TextInput>
    //         <TextInput
    //           style={styles.btnText}
    //           placeholder="put available recuitdate..."
    //           value={recruitdate}
    //           onChangeText={setRecruitdate}></TextInput>
    //         <TextInput
    //           style={styles.btnText}
    //           placeholder="put your title..."
    //           value={title}
    //           onChangeText={setTitle}></TextInput>
    //         <TextInput
    //           style={styles.btnText}
    //           placeholder="put your content..."
    //           value={content}
    //           onChangeText={setContent}></TextInput>
    //       </View>
    //       <View style={styles.ShowboxContainer}>
    //         <Button title="Save" onPress={handleRecruit} />
    //         <Button title="Cancel" onPress={handleModalClose} />
    //         <Button title="Modify" onPress={handleRecruitModify} />
    //         <Button title="Delete" onPress={handleRecruitDelete} />
    //       </View>
    //     </View>
    //   </Modal>
    //   <View>
    //     {/* <ScrollView> */}
    // {/* <FlatList data={data} renderItem={renderItem} /> */}
    //     {/* </ScrollView> */}
    //   </View>
    // </View>
  );
};

const TabScreen1 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Tab1</Text>
    </View>
  );
};

const TabScreen2 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Tab2</Text>
    </View>
  );
};

export default RecruitScreen;
