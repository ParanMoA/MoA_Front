import React, {useState, useEffect} from 'react';
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
import {MainParamList} from '../../NavigationType';
import {styles} from './Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');
type dataList = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type RecruitScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Recruit'>;
};

const RecruitScreen = ({navigation}: RecruitScreenProps) => {
  const [foodname, setFoodname] = useState('');
  const [ingredient, setIngredient] = useState<string>('');
  const [needIngredients, setNeedIngredients] = useState<string[]>([]);
  const [maxpeople, setMaxpeople] = useState<number>();
  const [recruitdate, setRecruitdate] = useState<string>('');
  const [writeremail, setWriterEmail] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleBack = () => {
    navigation.navigate('Home');
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
    <TouchableOpacity
      style={[styles.item, item && styles.completed]}
      onPress={() => {
        Alert.alert('Are you sure to join?', 'really?', [
          {text: 'confirm', onPress: () => Alert.alert('confirm')},
          {text: 'cancel', onPress: () => Alert.alert('cancel')},
        ]);
        setData(
          data.map(dataList =>
            dataList.id === item.id ? {...dataList} : dataList,
          ),
        );
      }}>
      <Text style={styles.text}>
        {item.id}
        {item.title}
      </Text>
    </TouchableOpacity>
  );

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
      writerEmail: writeremail,
      title: title,
      content: content,
    };
    console.log(data);
    await axios({
      method: 'POST',
      url: 'http://10.0.2.2:8080/recruit/create',
      data,
      headers: reqHeader,
    })
      .then(response => {
        console.log(response.data);
        navigation.navigate('Recruit');
      })
      .catch(error => {
        console.log(error.request);
        Alert.alert('Recruit Failed', 'Please Check your Recruit Options');
      });
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
    // setIsModalVisible(false);
  };

  const handleConfirm = () => {
    Alert.alert('등록자에게 요청을 보냈습니다.');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    Alert.alert('취소되었습니다.');
    setIsModalVisible(false);
  };

  useEffect(() => {
    axios
      .get('http://jsonplaceholder.typicode.com/posts')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleModalOpen}>
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
            <TextInput
              style={styles.btnText}
              placeholder="write user email.."
              value={writeremail}
              onChangeText={setWriterEmail}></TextInput>
          </View>
          <View style={styles.ShowboxContainer}>
            <Button title="Save" onPress={handleRecruit} />
            <Button title="Cancel" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
      <View>
        {/* <ScrollView> */}
        <FlatList data={data} renderItem={renderItem} />
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

export default RecruitScreen;
