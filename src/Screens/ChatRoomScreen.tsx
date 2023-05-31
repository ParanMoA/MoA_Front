import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Calendar} from 'react-native-calendars';
import {styles} from '../Styles/Screen/ChatStyle';
import {ChatParamList} from '../Navigation/NavigationType';
import {request} from '../Components/AxiosComponent';

type ChatItem = {
  id: string;
  name: string;
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
    const res = await request('chat/list');
    if (res?.ok) {
      res.json().then(response => {
        setChatList(response);
        // console.log(response);
      });
    }
  };
  useEffect(() => {
    const result = navigation.addListener('focus', () => {
      getChatList();
    });
    return result;
  }, [navigation]);
  const renderItem = ({item}: {item: ChatItem}) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatScreen', {chatRoomId: item.id});
        }}>
        <View
          style={{
            height: 49,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#191F28'}}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.chatroomContainer}>
      <View style={styles.subcontainer}>
        <View style={styles.chatcontainer}>
          <Text style={{color: '#6B7684'}}> 나의 채팅방 목록 </Text>
          <FlatList
            data={chatList}
            renderItem={renderItem}
            style={{
              padding: 20,
              marginVertical: 12,
              marginRight: 24,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              height: 465,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatRoomScreen;
