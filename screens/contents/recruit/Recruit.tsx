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
  // const [writeremail, setWriterEmail] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [recruitId, setRecruitId] = useState<number>();
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
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={styles.item}>
        {item.id}
        {item.title}
      </Text>
      <TouchableOpacity
        style={[styles.item, item && styles.completed]}
        onPress={() => {
          Alert.alert('Are you sure to join?', 'really?', [
            {
              text: 'confirm',
              onPress: handleRecruitJoin => Alert.alert('confirm'),
            },
            {
              text: 'cancel',
              onPress: handleRecruitJoin => Alert.alert('cancel'),
            },
          ]);
          setData(
            data.map(dataList =>
              dataList.id === item.id ? {...dataList} : dataList,
            ),
          );
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
      url: 'http://10.0.2.2:8080/recruit/create',
      data,
      headers: reqHeader,
    })
      .then(response => {
        console.log('Data : ', response.data);
        const rId = response.data.recruitId;
        console.log(rId);
        setRecruitId(rId);
        navigation.navigate('Recruit');
      })
      .catch(error => {
        console.log(error.request);
        Alert.alert('Recruit Failed', 'Please Check your Recruit Options');
      });
  };
  //아래는 수정버튼

  const handleRecruitModify = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    const reqHeader = {
      'x-access-token': token || '',
      'content-type': 'application/json',
    };
    const data = {
      recruitId: recruitId,
    };
    console.log(data);
    await axios({
      method: 'POST',
      url: 'http://10.0.2.2:8080/recruit/create/modify',
      data,
      headers: reqHeader,
    })
      .then(response => {
        console.log('Data : ', response.data);
        console.log(response);
        navigation.navigate('Recruit');
      })
      .catch(error => {
        console.log(error.request);
        Alert.alert('Modify Failed', 'Please Check your Options Agin');
      });
  };

  //아래는 삭제버튼
  const handleRecruitDelete = () => {
    axios
      .get('http://10.0.2.2:8080/recruit/delete', {
        params: {id: recruitId},
      })
      .then(response => {
        console.log(response);
        // navigation.navigate('Recruit');
        Alert.alert('Deleted', '삭제되었습니다.');
      })
      .catch(error => {
        console.log(error.request);
        Alert.alert('Delete Failed', '삭제 실패하였습니다.');
      });
  };

  //아래는 참여버튼
  const handleRecruitJoin = () => {
    axios
      .get('http://10.0.2.2:8080/recruit/participate/{id}/enter', {
        params: {id: recruitId},
      })
      .then(response => {
        console.log(response);
        // navigation.navigate('Recruit');
        Alert.alert('Join', '참여신청을 보냈습니다.');
      })
      .catch(error => {
        console.log(error.request);
        Alert.alert('Join Falied', '참여신청 보내기를 실패하였습니다.');
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
          </View>
          <View style={styles.ShowboxContainer}>
            <Button title="Save" onPress={handleRecruit} />
            <Button title="Cancel" onPress={handleModalClose} />
            <Button title="Modify" onPress={handleRecruitModify} />
            <Button title="Delete" onPress={handleRecruitDelete} />
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
