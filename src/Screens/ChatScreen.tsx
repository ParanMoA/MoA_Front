import {useEffect, useRef, useState, useCallback} from 'react';
import SockJS from 'sockjs-client';
import StompJs from '@stomp/stompjs';
import {useRoute} from '@react-navigation/native';
import {BASE_URL} from '../constants';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  TextInput,
  Button,
} from 'react-native';
import {ChatParamList} from '../Navigation/NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReservationScreen from './ReservationScreen';
import {styles} from '../Styles/Screen/ChatStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState, useRecoilValue} from 'recoil';
import authState, {IAuthTypes} from '../Recoil/idState';

interface Message {
  user: string;
  message: string;
}
interface RouteParams {
  apply_id: string;
}

type ChatDetailRouteProp = RouteProp<ChatParamList, 'ChatScreen'>;

type ChatDetailNavigationProps = {
  navigation: NativeStackNavigationProp<ChatParamList, 'ChatScreen'>;
  route: ChatDetailRouteProp;
};

const ChatScreen = ({navigation, route}: ChatDetailNavigationProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, SetSeleted] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState('');
  const [name, setName] = useState('');
  const [chatt, setChatt] = useState([]);
  const [chkLog, setChkLog] = useState(false);
  const [socketData, setSocketData] = useState();
  const auth = useRecoilValue(authState);

  var ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      const token = await AsyncStorage.getItem('AccessToken');
      if (token) {
        ws.current = new WebSocket(
          'ws://43.201.118.41:8081/chat/' +
            route.params.chatRoomId +
            '/' +
            auth[0].email,
        );

        console.log(ws.current);

        ws.current.onopen = () => {
          // connection opened
          console.log('connected');
          // send a message
          setSocketConnected(true);
        };
        ws.current.onmessage = e => {
          console.log(e.data);
        };
        ws.current.onerror = e => {
          // an error occurred
          console.log(e.message);
        };

        ws.current.onclose = e => {
          // connection closed
          console.log(e.code, e.reason);
        };
      } else {
        console.log('토큰 없음');
      }
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  useEffect(() => {
    if (socketConnected) {
      if (ws.current) {
        ws.current.send('hello');
        setSendMsg(true);
      }
    }
  }, [socketConnected]);
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 100,
        }}>
        {route.params.chatRoomId}
      </Text>
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
      <TouchableOpacity
        onPress={() => {
          ReservationScreen(route.params.chatRoomId);
        }}>
        <Text
          style={{
            fontSize: 100,
          }}>
          예약
        </Text>
      </TouchableOpacity>
    </View>
    // return (
    //   <View style={styles.container}>
    //     <TextInput value={name} placeholder="이름" onChangeText={setName} />
    //     <TextInput value={msg} placeholder="메시지" onChangeText={setMsg} />
    //     <Button title="전송" onPress={send} />
    //   </View>
  );
};

export default ChatScreen;
