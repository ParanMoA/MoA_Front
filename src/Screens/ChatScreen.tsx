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
import {FlatList} from 'react-native-gesture-handler';

interface Message {
  user: string;
  message: string;
  date: string;
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
  const [serverState, setServerState] = useState('Loading...');
  const [messageText, setMessageText] = useState('');
  const [serverMessages, setServerMessages] = useState<Message[]>([]);
  const auth = useRecoilValue(authState);
  const serverMessagesList: Message[] = [];

  var ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = async () => {
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
        setServerState('Connected to the server');
      };
      ws.current.onmessage = e => {
        console.log(e.data);
        let parse = JSON.parse(e.data);
        serverMessagesList.push(parse);
        setServerMessages([...serverMessagesList]);
      };
      ws.current.onerror = e => {
        // an error occurred
        console.log(e.message);
        setServerState(e.message);
      };

      ws.current.onclose = e => {
        // connection closed
        console.log(e.code, e.reason);
        setServerState('Disconnected. Check internet or server.');
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  const sendMessage = () => {
    if (ws.current) {
      let str = JSON.stringify({user: auth[0].email, message: messageText});
      ws.current.send(str);
      setMessageText('');
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          style={{marginTop: 40}}
          data={serverMessages}
          keyExtractor={(item, index) => `message_${index}`}
          renderItem={({item}) =>
            item.user == auth[0].email ? (
              <View style={styles.mychatContainer}>
                <Text style={styles.myChat}>{item.message}</Text>
              </View>
            ) : (
              <View style={styles.otherchatContainer}>
                <Text style={styles.otherChat}>{item.message}</Text>
              </View>
            )
          }
        />
        <View style={styles.bottomContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Add Message'}
            onChangeText={text => {
              setMessageText(text);
            }}
            value={messageText}></TextInput>
          <TouchableOpacity
            style={styles.sendbox}
            onPress={sendMessage}
            disabled={messageText == ''}>
            <Text style={styles.send}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
