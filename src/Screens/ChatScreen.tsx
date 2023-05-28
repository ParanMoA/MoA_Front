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
import {useRecoilState} from 'recoil';
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

  const [msg, setMsg] = useState('');
  const [name, setName] = useState('');
  const [chatt, setChatt] = useState([]);
  const [chkLog, setChkLog] = useState(false);
  const [socketData, setSocketData] = useState();
  const [auth, setAuth] = useRecoilState<IAuthTypes[]>(authState);
  // const ws = useRef<WebSocket | null>(null);

  // useEffect(() => {
  //   if (socketData !== undefined) {
  //     const tempData = chatt.concat(socketData);
  //     console.log(tempData);
  //     setChatt(tempData);
  //   }
  // }, [socketData]);
  // const webSocketLogin = useCallback(() => {
  //   console.log(route.params.chatRoomId);
  //   ws.current = new WebSocket(
  //     'ws://43.201.118.41:8081/chat/room/' + route.params.chatRoomId,
  //   );
  //   console.log(ws.current);
  // }, []);

  // const send = useCallback(() => {
  //   if (!chkLog) {
  //     if (name === '') {
  //       Alert.alert('이름을 입력하세요.');
  //       return;
  //     }
  //     webSocketLogin();
  //     setChkLog(true);
  //   }

  //   if (msg !== '') {
  //     const data = {
  //       name,
  //       msg,
  //       date: new Date().toLocaleString(),
  //     }; //전송 데이터(JSON)

  //     const temp = JSON.stringify(data);

  //     if (ws.current) {
  //       if (ws.current.readyState === WebSocket.OPEN) {
  //         ws.current.send(temp);
  //       } else {
  //         Alert.alert('WebSocket 연결이 아직 준비되지 않았습니다.');
  //       }
  //     }
  //   } else {
  //     Alert.alert('메세지를 입력하세요.');
  //   }

  //   setMsg('');
  // }, [chkLog, name, msg, webSocketLogin]);

  var ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      const token = await AsyncStorage.getItem('AccessToken');
      if (token) {
        ws.current = new WebSocket(
          'ws://43.201.118.41:8081/chat/room',
          undefined,
          {
            headers: {
              'x-access-token': token,
            },
          },
        );
        console.log(auth);
        console.log(ws.current);
        ws.current.onopen = () => {
          // connection opened
          console.log('connected');
          // send a message
        };

        ws.current.onmessage = e => {
          // a message was received
          console.log(e.data);
        };

        ws.current.onerror = e => {
          // an error occurred
          console.log(e.message);
        };

        ws.current.onclose = e => {
          // connection closed
          // console.log(e.code, e.reason);
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
