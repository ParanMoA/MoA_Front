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
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Calendar} from 'react-native-calendars';
import {styles} from '../Styles/Screen/StyleComponent';
import {ChatParamList} from '../Navigation/NavigationType';
import {request} from '../Components/AxiosComponent';

type ChatItem = {
  id: string;
  user: string;
  message: string;
};

type ChatListProps = {
  chats: ChatItem[];
  onPress: (item: ChatItem) => void;
};
type ChatRoomScreenProps = {
  navigation: NativeStackNavigationProp<ChatParamList, 'ChatRoomScreen'>;
};

const ChatRoomScreen = ({navigation}: ChatRoomScreenProps) => {
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [selectedChat, setSelectedChat] = useState<Object>({});

  const getChatList = async () => {
    const res = await request('recruit/chat/');
    if (res?.ok) {
      console.log(res);
    }
  };

  // useEffect(() => {
  //   setChatList(testChatData);
  // }, []);
  const renderItem = ({item}: {item: ChatItem}) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatScreen', {chatRoomId: item.id});
        }}>
        <View
          style={{
            height: 100,
            backgroundColor: '#FFF',
            marginTop: 100,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20}}>{item.message}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.chatcontainer}>
          <Text style={{color: '#6B7684'}}> 나의 채팅방 목록 </Text>
          <FlatList
            data={chatList}
            renderItem={renderItem}
            style={{
              padding: 20,
              marginVertical: 8,
              marginHorizontal: 16,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatRoomScreen;
