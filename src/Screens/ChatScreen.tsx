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
import {styles} from '../Styles/Screen/StyleComponent';
import ReservationScreen from './ReservationScreen';

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

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (socketData !== undefined) {
      const tempData = chatt.concat(socketData);
      console.log(tempData);
      setChatt(tempData);
    }
  }, [socketData]);
  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket(
      'ws://43.201.118.41:8081/chat/room/' + route.params.chatRoomId,
    );
    console.log(ws.current);
  }, []);

  const send = useCallback(() => {
    if (!chkLog) {
      if (name === '') {
        Alert.alert('이름을 입력하세요.');
        return;
      }
      webSocketLogin();
      setChkLog(true);
    }

    if (msg !== '') {
      const data = {
        name,
        msg,
        date: new Date().toLocaleString(),
      }; //전송 데이터(JSON)

      const temp = JSON.stringify(data);

      if (ws.current) {
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(temp);
        } else {
          Alert.alert('WebSocket 연결이 아직 준비되지 않았습니다.');
        }
      }
    } else {
      Alert.alert('메세지를 입력하세요.');
    }

    setMsg('');
  }, [chkLog, name, msg, webSocketLogin]);

  // var ws = useRef<WebSocket | null>(null);
  // useEffect(() => {
  //   console.log(typeof route.params.chatRoomId);
  //   ws.current = new WebSocket(
  //     'ws://43.201.118.41:8081/chat/room/' + route.params.chatRoomId,
  //   );
  //   console.log(ws.current);
  //   ws.current.onopen = () => {
  //     // connection opened
  //     ws.send('something');
  //     console.log('connected');
  //     // send a message
  //   };

  //   ws.current.onmessage = e => {
  //     // a message was received
  //     console.log(e.data);
  //   };

  //   ws.current.onerror = e => {
  //     // an error occurred
  //     console.log(e.message);
  //   };

  //   ws.current.onclose = e => {
  //     // connection closed
  //     console.log(e.code, e.reason);
  //   };

  //   return () => {
  //     if (ws.current) {
  //       ws.current.close();
  //     }
  //   };
  // }, []);
  // const connect = () => {
  //   client.current = new StompJs.Client({
  //     brokerURL: '43.201.118.41:8081/' + 'chat',
  //     onConnect: () => {
  //       console.log('success');
  //       subscribe();
  //     },
  //     onStompError: frame => {
  //       console.log('Broker reported error: ' + frame.headers['message']);
  //       console.log('Additional details: ' + frame.body);
  //     },
  //   });
  //   client.current.activate();
  // };

  // const subscribe = () => {
  //   if (client.current) {
  //     console.log('/sub/list/');
  //     client.current.subscribe('/sub/list/1', body => {
  //       console.log(JSON.parse(body.body));
  //       const json_body = JSON.parse(body.body);
  //       setChatList(prevChatList => [
  //         ...prevChatList,
  //         {
  //           user: json_body.user,
  //           message: json_body.message,
  //         },
  //       ]);
  //     });

  //     console.log(chatList);
  //   }
  // };

  // const disconnect = () => {
  //   if (client.current) client.current.deactivate();
  // };

  // useEffect(() => {
  //   connect();

  //   return () => disconnect();
  // }, []);
  // WebSocket 연결을 생성합니다.
  // const socket = new WebSocket('ws://localhost:8080/chat');
  // const stompClient = Stomp.over(socket);

  // // 서버와 WebSocket 연결을 수립합니다.
  // stompClient.connect(
  //   {},
  //   () => {
  //     // 연결이 성공하면, 필요한 동작을 수행합니다.
  //     console.log('WebSocket 연결 성공');

  //     // 특정 채팅방에 구독합니다.
  //     const roomId = 'your-room-id';
  //     stompClient.subscribe(`/topic/room/${roomId}`, message => {
  //       // 채팅 메시지를 수신하면 처리합니다.
  //       const chatMessage = JSON.parse(message.body);
  //       console.log('수신된 채팅 메시지:', chatMessage);
  //       // 필요한 로직을 수행하여 채팅 메시지를 UI에 표시합니다.
  //     });

  //     // 채팅 메시지를 전송합니다.
  //     const message = 'Hello, World!';
  //     stompClient.send(
  //       '/app/chat.sendMessage',
  //       {},
  //       JSON.stringify({content: message}),
  //     );
  //   },
  //   error => {
  //     // 연결이 실패하면, 필요한 에러 처리를 수행합니다.
  //     console.error('WebSocket 연결 실패:', error);
  //   },
  // );

  // return (
  // <View style={styles.container}>
  //   <Text
  //     style={{
  //       fontSize: 100,
  //     }}>
  //     {route.params.chatRoomId}
  //   </Text>
  //   <TouchableOpacity
  //     onPress={() => {
  //       setModalVisible(!modalVisible);
  //     }}>
  //     <Icon name="plus" color="black" size={60} />
  //   </TouchableOpacity>
  //   <Modal
  //     visible={modalVisible}
  //     transparent={true}
  //     animationType="slide"
  //     onRequestClose={() => {
  //       setModalVisible(!modalVisible);
  //     }}>
  //     <TouchableOpacity
  //       onPress={() => {
  //         setModalVisible(!modalVisible);
  //       }}>
  //       <Icon name="backward" color="black" size={60}></Icon>
  //     </TouchableOpacity>
  //     <Calendar
  //       onDayPress={day => {
  //         console.log('selected day', day);
  //         SetSeleted(day.dateString);
  //       }}
  //     />
  //   </Modal>
  //   <TouchableOpacity
  //     onPress={() => {
  //       ReservationScreen(route.params.chatRoomId);
  //     }}>
  //     <Text
  //       style={{
  //         fontSize: 100,
  //       }}>
  //       예약
  //     </Text>
  //   </TouchableOpacity>
  // </View>
  return (
    <View style={styles.container}>
      <TextInput value={name} placeholder="이름" onChangeText={setName} />
      <TextInput value={msg} placeholder="메시지" onChangeText={setMsg} />
      <Button title="전송" onPress={send} />
    </View>
  );
};

export default ChatScreen;
