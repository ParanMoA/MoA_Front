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
};

const InitialData: dataList[] = [
  {id: 1, menu: 'pasta', cost: 20000},
  {id: 2, menu: 'pizza', cost: 21000},
  {id: 3, menu: 'chicken', cost: 25000},
  {id: 4, menu: 'cola', cost: 2000},
  {id: 5, menu: 'water', cost: 1000},
];

type RecruitScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Recruit'>;
};

const RecruitScreen = ({navigation}: RecruitScreenProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [data, setData] = useState(InitialData);
  const [visible, setVisible] = useState(true);

  const Show = () => {
    setVisible(current => !current);
  };

  const ShowConfirm = () => {
    Alert.alert('취소하시겠습니까?', '취소', [
      {text: '확인', onPress: () => Show()},
    ]);
  };
  const ShowAlert = () => {
    Alert.alert(
      '참여하시겠습니까?',
      '참여',
      [
        {
          text: 'Sure Join!',
          onPress: () => Show(),
        },
        {
          text: 'Cancel',
          onPress: () => Show(),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
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

  const renderItem = ({item}: {item: dataList}) => (
    <View style={styles.textContainer}>
      <View style={styles.ShowboxContainer}>
        <Button title="join⭕" onPress={ShowAlert} disabled={!visible} />
        <Button title="cancel❌" onPress={ShowConfirm} disabled={visible} />
      </View>
      <Text style={styles.title}>{item.menu}</Text>
      <Text style={styles.title}>{item.cost}</Text>
      {visible ? <Text>Join</Text> : <Text>Already Joined</Text>}
    </View>
  );
  return (
    <View style={styles.container}>
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
