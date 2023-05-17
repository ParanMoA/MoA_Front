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

const Test = ({navigation}: RecruitScreenProps) => {
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
  const [isJoinModalVisible, setIsJoinModalVisible] = useState<boolean>(false);
  const [recruitId, setRecruitId] = useState<number>();
  const [id, setId] = useState<string[]>([]);
  const [joinData, setJoinData] = useState({});
  const handleBack = () => {
    navigation.navigate('HomeScreen');
  };

  const Tab = createMaterialTopTabNavigator();

  //   const SettingList = () => {
  //     return (
  //       <View style={styles.textContainer}>
  //         <FlatList data={data} renderItem={renderItem} />
  //       </View>
  //     );
  //   };

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
        // onPress={async () => {
        //   setRecruitId(item.id);
        // await handleRecruitJoin();
        // }}
        onPress={() => {
          console.log(item);
          handleJoinModalOpen(item);
        }}>
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
      url: 'http://43.201.118.41:8081/recruit/create',
      data,
      headers: reqHeader,
    })
      .then(response => {
        console.log('Data : ', response.data);
        const rId = response.data.id;
        console.log(rId);
        setRecruitId(rId);
        setIsModalVisible(false);
        navigation.navigate('RecruitScreen');
      })
      .catch(error => {
        console.log(error.request);
        Alert.alert('Recruit Failed', 'Please Check your Recruit Options');
      });
  };

  //아래는 참여버튼

  const handleRecruitJoin = async () => {
    // handleJoinModalOpen();
    console.log(recruitId);
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

  const handleJoinModalOpen = (item: any) => {
    setJoinData(item);
    setIsJoinModalVisible(true);
  };
  const handleJoinModalClose = () => {
    setIsJoinModalVisible(false);
    navigation.navigate('RecruitScreen');
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    Alert.alert('취소되었습니다.');
    navigation.navigate('RecruitScreen');
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
    if (res?.ok) {
      res.json().then(response => setData(response));
    }
  };

  useEffect(() => {
    getRes();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {marginTop: '18%'}]}
        onPress={handleModalOpen}>
        <Text style={styles.btnText}>모집글 등록하기</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} onRequestClose={handleModalClose}>
        <View style={styles.container}>
          <View style={styles.item}>
            <TextInput
              style={styles.btnText}
              placeholder="put your foodname..."
              value={foodname}
              onChangeText={setFoodname}></TextInput>
            <TextInput
              style={styles.btnText}
              placeholder="put ingredients..."
              value={ingredient}
              onChangeText={setIngredient}
              onSubmitEditing={handleAddIngredient}></TextInput>
            <TextInput
              style={styles.btnText}
              placeholder="put max people..."
              value={maxpeople?.toString()}
              onChangeText={text => setMaxpeople(parseInt(text))}></TextInput>
            <TextInput
              style={styles.btnText}
              placeholder="put available recuitdate..."
              value={recruitdate}
              onChangeText={setRecruitdate}></TextInput>
            <TextInput
              style={styles.btnText}
              placeholder="put your title..."
              value={title}
              onChangeText={setTitle}></TextInput>
            <TextInput
              style={styles.btnText}
              placeholder="put your content..."
              value={content}
              onChangeText={setContent}></TextInput>
          </View>

          <View style={styles.ShowboxContainer}>
            <Button title="Save" onPress={handleRecruit} />
            <Button title="Cancel" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
      {/* 아래는 join버튼 눌렀을 때 모집글의 상세정보가 떠야함. */}
      <Modal visible={isJoinModalVisible} onRequestClose={handleJoinModalClose}>
        <View style={styles.container}>
          {Object.entries(joinData).map(([key, value]) => (
            <View style={styles.fuckkkk}>
              <Text key={key}>
                {key}: {value as string}
              </Text>
            </View>
          ))}
          <Button title="Join" onPress={handleRecruitJoin} />
          <Button title="Cancel" onPress={handleJoinModalClose} />
        </View>
      </Modal>
      <View>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default Test;
