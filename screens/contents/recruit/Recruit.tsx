import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainParamList} from '../../NavigationType';
import {styles} from './Style';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

type dataList = {
  id: number;
  menu: string;
  cost: number;
  completed: boolean;
};

const InitialData: dataList[] = [
  {id: 1, menu: 'pasta', cost: 20000, completed: false},
  {id: 2, menu: 'pizza', cost: 21000, completed: false},
  {id: 3, menu: 'chicken', cost: 25000, completed: false},
  {id: 4, menu: 'cola', cost: 2000, completed: false},
  {id: 5, menu: 'water', cost: 1000, completed: false},
  {id: 6, menu: 'shrimp', cost: 5000, completed: false},
  {id: 7, menu: 'cheese', cost: 3000, completed: false},
];

type RecruitScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Recruit'>;
};

const RecruitScreen = ({navigation}: RecruitScreenProps) => {
  const [foodname, setFoodname] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [maxpeople, setMaxpeople] = useState('');
  const [recruitdate, setRecruitdate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleBack = () => {
    navigation.navigate('Home');
  };

  const [data, setData] = useState<dataList[]>(InitialData);

  const renderItem = ({item}: {item: dataList}) => (
    <TouchableOpacity
      style={[styles.item, item.completed && styles.completed]}
      onPress={() => {
        setData(
          data.map(dataList =>
            dataList.id === item.id
              ? {...dataList, completed: !dataList.completed}
              : dataList,
          ),
        );
      }}>
      <Text style={styles.text}>
        {item.menu}
        {item.cost}
      </Text>
    </TouchableOpacity>
  );
  const handleRecruit = async () => {
    // await axios
    //   .post('http://localhost:8080/recruit/create', {
    //     foodName: foodName,
    //     ingredients: ingredients,
    //     maxPeople: maxPeople,
    //     recruitDate : recruitDate,
    //     title : title,
    //     content: content,
    //     withCredentials: true,
    //     responsetype: 'json',
    //     header: {
    //       'content-type': 'application/json',
    //     },
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //     AsyncStorage.setItem('AccessToken', JSON.stringify(response.data));
    navigation.navigate('Recruit');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     Alert.alert('Recruit Failed', 'Please Check your Recruit Options');
    //   });
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleTextChange = (inputText: string) => {
    setText(inputText);
  };
  const handleSave = () => {
    console.log(`Saving: ${text}`);
    setIsModalVisible(false);
  };

  useEffect(() => {
    // axios
    //   .get('http://jsonplaceholder.typicode.com/posts')
    //   .then(response => setData(response.data))
    //   .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {
        <View>
          {/* <TextInput
            style={styles.textContainer}
            placeholder="foodname"
            keyboardType="email-address"
            autoCapitalize="none"
            value={foodname}
            onChangeText={setFoodname}></TextInput>
          <TextInput
            style={styles.textContainer}
            placeholder="ingredients"
            secureTextEntry
            value={ingredients}
            onChangeText={setIngredients}></TextInput> */}

          <FlatList data={data} renderItem={renderItem}></FlatList>
        </View>
      }
      <TouchableOpacity style={styles.button} onPress={handleModalOpen}>
        <Text>모집글 등록하기</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} onRequestClose={handleModalClose}>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text> 요리 이름 </Text>
          <TextInput value={text} onChangeText={handleTextChange} />
          <Text> 필요한 식재료 </Text>
          <Text> 최대 인원수 </Text>
          <Text> 최대 모집가능 날짜 </Text>
          <Text> 글 제목 </Text>
          <Text> content </Text>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={handleModalClose} />
        </View>
      </Modal>
      <FlatList
        data={InitialData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default RecruitScreen;
