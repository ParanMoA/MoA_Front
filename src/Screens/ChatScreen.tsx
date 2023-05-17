import {useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import StompJs from '@stomp/stompjs';
import {useRoute} from '@react-navigation/native';
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
  const [chatList, setChatList] = useState<Message[]>([]);
  const client = useRef<StompJs.Client | null>(null);

  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL: 'ws://34.64.137.61:8787/ws',
      brokerURL: BASE_URL + 'chat',
      onConnect: () => {
        console.log('success');
        subscribe();
      },
      onStompError: frame => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
    });
    client.current.activate();
  };

  const subscribe = () => {
    if (client.current) {
      console.log('/sub/list/');
      client.current.subscribe('/sub/list/1', body => {
        console.log(JSON.parse(body.body));
        const json_body = JSON.parse(body.body);
        setChatList(prevChatList => [
          ...prevChatList,
          {
            user: json_body.user,
            message: json_body.message,
          },
        ]);
      });

      console.log(chatList);
    }
  };

  const disconnect = () => {
    if (client.current) {
      client.current.deactivate();
    }
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  useEffect(() => {
    // fetchChat();
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
    </View>
  );
};

export default ChatScreen;
