import React, {useState, useEffect, useId} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';

import axios from 'axios';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainParamList} from '../Navigation/NavigationType';
import {styles} from '../Styles/Screen/RecruitStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request} from '../Components/AxiosComponent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import idState, {IAuthTypes} from '../Recoil/idState';
import {useRecoilState, useRecoilValue} from 'recoil';
import authState from '../Recoil/idState';

type dataList = {
  userId: number;
  id: number;
  title: string;
  content: string;
  maxPeople: number;
  needIngredients: string[];
  recruitDate: string;
  foodName: string;
};

type joinDataList = {
  id: number;
  name: string;
};

type RecruitScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'MyRecruitScreen'>;
};

const TopTab = createMaterialTopTabNavigator();

const MyRecruitScreen = ({navigation}: RecruitScreenProps) => {
  const [foodName, setFoodName] = useState('');
  const [ingredient, setIngredient] = useState<string>('');
  const [needIngredients, setNeedIngredients] = useState<string[]>([]);
  const [maxPeople, setMaxPeople] = useState<number>();
  const [recruitDate, setRecruitDate] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isJoinListModalVisible, setIsJoinListModalVisible] =
    useState<boolean>(false);
  const [recruitId, setRecruitId] = useState<number>();
  const userId = useRecoilValue(authState);
  const [data, setData] = useState<dataList[]>([]);
  const [modifyData, setModifyData] = useState<dataList>();
  const [joinList, setJoinList] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [idList, setIdList] = useState([]);
  const handleBack = () => {
    navigation.navigate('HomeScreen');
  };

  const Tab = createMaterialTopTabNavigator();

  const getResult = async () => {
    const res = await request('recruit/list/my');
    if (res?.ok) {
      res.json().then(response => setData(response));
      // Alert.alert('내가 등록한 모집글', '내가 등록한 모집글 정보입니다.');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      getResult();
    });
  }, []);

  const handleAddIngredient = () => {
    if (ingredient.trim() === '') {
      return;
    }
    setNeedIngredients([...needIngredients, ingredient]);
    setIngredient('');
  };

  const renderItem = ({item}: {item: dataList}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <ScrollView>
        <TouchableOpacity
          style={[styles.item, item && styles.completed]}
          onPress={() => {
            setRecruitId(item.id);
            handleJoinList(item.id);
          }}>
          <Text key={item.id} style={styles.item}>
            {item.id} : {item.title}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={[styles.item, item && styles.completed]}
        onPress={() => {
          setNeedIngredients(item.needIngredients);
          setMaxPeople(item.maxPeople);
          setRecruitDate(item.recruitDate);
          setTitle(item.title);
          setContent(item.content);
          // setRecruitId(item.id);
          setFoodName(item.foodName);
          handleModalOpen();
        }}>
        <Text style={[styles.joinbtn, {flexDirection: 'row'}]}>Modify</Text>
      </TouchableOpacity>
    </View>
  );
  //아래는 수정버튼
  const handleRecruitModify = async () => {
    const data = {
      foodName: foodName,
      needIngredients: needIngredients,
      maxPeople: maxPeople,
      recruitDate: recruitDate,
      title: title,
      content: content,
    };
    // console.log(recruitId);
    const res = await request('recruit/modify/' + recruitId, data, 'POST');
    if (res?.ok) {
      // console.log(res);
      Alert.alert('수정완료', '수정되었습니다.');
      setIsModalVisible(false);
    }
  };

  //아래는 삭제버튼
  const handleRecruitDelete = async () => {
    const res = await request('recruit/delete/' + recruitId, {}, 'POST');
    if (res?.ok) {
      // console.log(res);
      Alert.alert('삭제완료', '삭제되었습니다.');
      setIsModalVisible(false);
    }
  };

  //아래는 승인
  const handleJoinList = async (id: number) => {
    try {
      const res = await request('recruit/' + id + '/participate/list');
      if (res?.ok) {
        const response = await res.json();
        const JoinList = response.map((item: any) => item);
        setJoinList(JoinList);
        JoinList.map((item: any) => console.log(item.ingredientResponseDto));
        setIsJoinListModalVisible(true);
      }
    } catch (e) {
      console.log(e);
      navigation.navigate('RecruitScreen');
    }
  };
  // const handleJoinListModalOpen = () => {
  //   setIsJoinListModalVisible(true);
  // };
  const handleJoinListModalClose = () => {
    setIsJoinListModalVisible(false);
  };
  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    console.log(`Saving: ${foodName}`);
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
  const handleApply = async (id: number) => {
    const res = await request(
      'recruit/' + recruitId + '/participate/allow/' + id,
    );
    if (res?.ok) {
      console.log(res);
      setIsJoinListModalVisible(false);
    }
  };
  const handleReject = () => {};
  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} onRequestClose={handleModalClose}>
        <View style={styles.container}>
          <View style={[styles.item, {paddingHorizontal: '5%'}]}>
            <TextInput
              style={styles.btnText}
              placeholder="put your foodname..."
              value={foodName}
              onChangeText={setFoodName}></TextInput>
            <TextInput
              style={styles.btnText}
              placeholder="put ingredients..."
              value={ingredient}
              onChangeText={setIngredient}
              onSubmitEditing={handleAddIngredient}></TextInput>
            <TextInput
              style={styles.btnText}
              placeholder="put max people..."
              value={maxPeople?.toString()}
              onChangeText={text => setMaxPeople(parseInt(text))}></TextInput>
            <TextInput
              style={styles.btnText}
              placeholder="put available recuitdate..."
              value={recruitDate}
              onChangeText={setRecruitDate}></TextInput>
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
            {/* <Button title="Save" onPress={handleRecruit} /> */}
            <Button title="Cancel" onPress={handleModalClose} color="black" />
            <Text> </Text>
            <Button
              title="Modify"
              onPress={handleRecruitModify}
              color="black"
            />
            <Text> </Text>
            <Button
              title="Delete"
              onPress={handleRecruitDelete}
              color="black"
            />
          </View>
        </View>
      </Modal>
      <View>
        {/* 아래 touchableOpacity추가햇슴 */}
        <FlatList data={data} renderItem={renderItem} />
        <Modal
          visible={isJoinListModalVisible}
          onRequestClose={handleJoinListModalClose}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              {joinList.map((item: any) => (
                <View key={item.id} style={{flexDirection: 'row'}}>
                  <View style={styles.joinlist}>
                    <Text style={styles.joinlistname}>이름: {item.name}</Text>
                    {item.ingredientResponseDto.map(
                      (value: {name: string; id: any}) => (
                        <View key={value.id}>
                          <Text style={styles.joinlistname}>
                            식재료: {value.name}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <View style={styles.empty}>
                        <Button
                          title="승인"
                          onPress={() => {
                            handleApply(item.id);
                          }}
                          color="black"
                        />
                      </View>
                      <View style={styles.empty}>
                        <Button
                          title="거부"
                          onPress={handleReject}
                          color="black"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={[styles.empty, {marginVertical: 15}]}>
              <Button
                title="Close"
                onPress={handleJoinListModalClose}
                color="black"
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default MyRecruitScreen;
