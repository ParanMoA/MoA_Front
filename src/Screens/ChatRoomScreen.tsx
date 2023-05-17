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

type ChatItem = {
  id: string;
  user: string;
  message: string;
};

type ChatListProps = {
  chats: ChatItem[];
  onPress: (item: ChatItem) => void;
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

type ChatRoomScreenProps = {
  navigation: NativeStackNavigationProp<ChatParamList, 'ChatRoomScreen'>;
};

const ChatRoomScreen = ({navigation}: ChatRoomScreenProps) => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [selectedChat, setSelectedChat] = useState<Object>({});

  useEffect(() => {
    setChats(testChatData);
  }, []);
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
        <Text> 채팅방 목록 </Text>
        <FlatList
          data={testChatData}
          renderItem={renderItem}
          style={{
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
          }}
        />
      </View>
    </View>
  );
};

export default ChatRoomScreen;
