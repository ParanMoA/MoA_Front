import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Calendar} from 'react-native-calendars';
import {styles} from './ChatStyle';
import ChatList from './ChatList';

type ChatItem = {
  id: string;
  user: string;
  message: string;
};
const testChatData: ChatItem[] = [
  {
    id: '1',
    user: 'Alice',
    message: '음식 1',
  },
  {
    id: '2',
    user: 'Bob',
    message: '음식 2',
  },
  {
    id: '3',
    user: 'Charlie',
    message: '음식 3',
  },
];

const ChatScreen = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [selectedChat, setSelectedChat] = useState<Object>({});
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const onDateChange = (date: Date) => {
    setSelectedStartDate(date);
  };

  const startDate = selectedStartDate ? setSelectedStartDate.toString() : '';

  useEffect(() => {
    setChats(testChatData);
  }, []);
  // const handlePress = () => {
  //   axios
  //     .get(
  //       'https://new-api.spacecloud.kr/products/60569/prices?reservation_type_id=110488&year=2023&month=04',
  //     )
  //     .then(response => {
  //       // setData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const handleChatSelect = (chat: object) => {
    setSelectedChat(chat);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text> 채팅방 목록 </Text>
        <ChatList chats={chats} onPress={handleChatSelect} />
      </View>
      {/* {selectedChat && (
        <View>
          <Text>{selectedChat}</Text>
        </View>
      )} */}
      {/* <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Icon name="backward" color="black" size={60}></Icon>
        </TouchableOpacity>
        <Calendar
          onDayPress={day => {
            console.log('selected day', day);
          }}
        />
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
          // handlePress();
        }}> */}
      {/* <CalendarPicker onDateChange={onDateChange} />; */}
      {/* <Icon name="calendar" color="black" size={60}></Icon>
      </TouchableOpacity>  */}
    </View>
  );
};

export default ChatScreen;
