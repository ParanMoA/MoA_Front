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
  const [isJoinModalVisible, setIsJoinModalVisible] = useState<boolean>(false);
  const [isIngredientModalVisible, setIsIngredientModalVisible] =
    useState<boolean>(false);
  const [recruitId, setRecruitId] = useState<number>();
  const [id, setId] = useState<string[]>([]);
  const [joinData, setJoinData] = useState({});
  const [ingredientData, setIngredientData] = useState<any>([]);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<any>([]);
  const [selectedIngredientNames, setSelectedIngredientNames] = useState<any>(
    [],
  );
  const [isIngredientSelected, setIsIngredientSelected] =
    useState<boolean>(false);
  const [data, setData] = useState<dataList[]>([]);
  const handleBack = () => {
    navigation.navigate('HomeScreen');
  };

  const Tab = createMaterialTopTabNavigator();

  const handleAddIngredient = () => {
    if (ingredient.trim() === '') {
      return;
    }
    setNeedIngredients([...needIngredients, ingredient]);
    setIngredient('');
  };

  const renderItem = ({item}: {item: dataList}) => (
    <View key={item.id} style={{flexDirection: 'row', alignItems: 'center'}}>
      <ScrollView>
        <Text style={[styles.item, {paddingVertical: '6%'}]}>
          {item.id} : {item.title}
        </Text>
      </ScrollView>
      <TouchableOpacity
        key={`${item.id}_button`}
        style={[styles.item, item && styles.completed]}
        onPress={() => {
          handleJoinModalOpen(item);
        }}>
        <Text style={styles.joinbtn}>Join</Text>
      </TouchableOpacity>
      {/* </ScrollView> */}
    </View>
  );

  //아래는 등록버튼
  const handleRecruit = async () => {
    const data = {
      foodName: foodname,
      needIngredients: needIngredients,
      maxPeople: maxpeople,
      recruitDate: recruitdate,
      title: title,
      content: content,
    };
    const res = await request('recruit/create', data, 'POST');
    if (res?.ok) {
      const rId = await res.json().then(response => response.id);
      setRecruitId(rId);
      Alert.alert('등록완료', '게시글 등록이 완료되었습니다.');
      setIsModalVisible(false);
      getRes();
    }
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
  //아래는 참여버튼

  const handleRecruitJoin = async () => {
    const data = {
      ingredient_id: selectedIngredientIds,
    };
    console.log(data);
    try {
      const res = await request(
        'recruit/' + recruitId + '/participate/register',
        data,
        'POST',
      );
      if (res?.ok) {
        Alert.alert('Join', '참여신청을 보냈습니다.');
        setSelectedIngredientIds([]);
        setSelectedIngredientNames([]);
        setIsIngredientSelected(false);
        setIsJoinModalVisible(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleJoinModalOpen = (item: any) => {
    setJoinData(item);
    setRecruitId(item.id);
    setIsJoinModalVisible(true);
  };
  const handleJoinModalClose = () => {
    setSelectedIngredientIds([]);
    setSelectedIngredientNames([]);
    setIsIngredientSelected(false);
    setIsJoinModalVisible(false);
    navigation.navigate('RecruitScreen');
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleIngredientModalClose = () => {
    setSelectedIngredientIds([]);
    setSelectedIngredientNames([]);
    setIsIngredientSelected(false);
    setIsIngredientModalVisible(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    Alert.alert('취소되었습니다.');
    navigation.navigate('RecruitScreen');
  };

  const handleIngredientChoice = async () => {
    try {
      const res = await request(
        'recruit/' + recruitId + '/participate/ingredients',
        {id: id},
      );
      if (res?.ok) {
        const response = await res.json();
        setIngredientData(response);

        setIsIngredientModalVisible(true);
      }
    } catch (e) {
      console.log(e);
    }
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
  const handleIngredientConfirm = () => {
    if (selectedIngredientIds === 0) {
      setIsIngredientSelected(false);
    } else {
      setIsIngredientSelected(true);
    }
    setIsIngredientModalVisible(false);
  };

  const handleIngredientPress = (ingredient: any) => {
    const isSelected = selectedIngredientIds.includes(ingredient.id);

    if (isSelected) {
      setSelectedIngredientIds(
        selectedIngredientIds.filter((id: any) => id !== ingredient.id),
      );
      setSelectedIngredientNames(
        selectedIngredientNames.filter((name: any) => name !== ingredient.name),
      );
    } else {
      setSelectedIngredientIds([...selectedIngredientIds, ingredient.id]);
      setSelectedIngredientNames([...selectedIngredientNames, ingredient.name]);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {marginTop: '18%'}]}
        onPress={handleModalOpen}>
        <Text style={styles.btnText}>모집글 등록하기</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} onRequestClose={handleModalClose}>
        <View style={styles.container}>
          <View style={[styles.item, {paddingHorizontal: '10%'}]}>
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
            <Button title="Save" onPress={handleRecruit} color="black" />
            <Text> </Text>
            <Button title="Cancel" onPress={handleModalClose} color="black" />
          </View>
        </View>
      </Modal>
      {/* 아래는 join버튼 눌렀을 때 모집글의 상세정보가 떠야함. */}
      <Modal visible={isJoinModalVisible} onRequestClose={handleJoinModalClose}>
        <View style={styles.container}>
          <View style={styles.joinDetail}>
            {Object.entries(joinData).map(([key, value]) => (
              <View key={key}>
                {key === 'needIngredients' ? (
                  <View>
                    <Text style={[styles.joinDetailText, {color: 'white'}]}>
                      {key} : {value as string}
                    </Text>
                    <View>
                      {!isIngredientSelected ? (
                        <View>
                          <TouchableOpacity onPress={handleIngredientChoice}>
                            <Text
                              style={[styles.joinDetailText, {color: 'white'}]}>
                              등록한 식재료 보기
                            </Text>
                          </TouchableOpacity>
                          <Modal
                            visible={isIngredientModalVisible}
                            onRequestClose={handleIngredientModalClose}>
                            <View style={styles.container}>
                              <View>
                                {ingredientData.map(
                                  (
                                    ingredient: {name: any; id: any},
                                    index: any,
                                  ) => (
                                    <View key={index}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          handleIngredientPress(ingredient)
                                        }
                                        style={{
                                          backgroundColor:
                                            selectedIngredientIds.includes(
                                              ingredient.id,
                                            )
                                              ? 'green'
                                              : 'transparent',
                                          // You can customize the selected and unselected colors as per your needs
                                        }}>
                                        <Text style={styles.joinDetailText}>
                                          {ingredient.name}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  ),
                                )}
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                <View style={styles.empty}>
                                  <Button
                                    title="Confirm"
                                    onPress={handleIngredientConfirm}
                                    color="black"
                                  />
                                </View>
                                <View style={styles.empty}>
                                  <Button
                                    title="Close"
                                    onPress={handleIngredientModalClose}
                                    color="black"
                                  />
                                </View>
                              </View>
                            </View>
                          </Modal>
                        </View>
                      ) : (
                        <View>
                          {selectedIngredientNames.map((selected: any) => (
                            <Text>{selected}</Text>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>
                ) : (
                  <Text style={styles.joinDetailText}>
                    {key}: {value as string}
                  </Text>
                )}
              </View>
            ))}
          </View>
          <View style={styles.ShowboxContainer}>
            <View style={styles.empty}>
              <Button title="Join" onPress={handleRecruitJoin} color="black" />
            </View>
            <View style={styles.empty}>
              <Button
                title="Cancel"
                onPress={handleJoinModalClose}
                color="black"
              />
            </View>
          </View>
        </View>
      </Modal>

      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default RecruitScreen;
