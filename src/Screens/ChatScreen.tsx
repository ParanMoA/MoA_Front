import {useEffect, useRef, useState} from 'react';
import {getUniqueId} from 'react-native-device-info';
import io from 'socket.io-client';
import {BASE_URL} from '../constants';
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import {ChatParamList} from '../Navigation/NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../Styles/Screen/StyleComponent';

interface Message {
  user: string;
  message: string;
}
interface Chat {}

type ChatDetailRouteProp = RouteProp<ChatParamList, 'ChatScreen'>;

type ChatDetailNavigationProps = {
  navigation: NativeStackNavigationProp<ChatParamList, 'ChatScreen'>;
  route: ChatDetailRouteProp;
};

const ChatScreen = ({navigation, route}: ChatDetailNavigationProps) => {
  const [messageText, setMessageText] = useState('');
  const [serverMessages, setServerMessages] = useState([]);
  const serverMessagesList = [];
  const chatSocket = useRef(null);
  const {chatRoomId} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, SetSeleted] = useState('');

  // useEffect(() => {
  //   chatSocket.current = io(BASE_URL + '/chat');
  // }, []);

  return (
    <View style={styles.container}>
      {/* <FlatList data={serverMessages} renderItem={} keyExtractor={}></FlatList> */}
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <Icon name="plus" color="black" size={60} />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Icon name="backward" color="black" size={60}></Icon>
        </TouchableOpacity>
        <Calendar
          onDayPress={day => {
            console.log('selected day', day);
            SetSeleted(day.dateString);
          }}
        />
      </Modal>
    </View>
  );
};

export default ChatScreen;
