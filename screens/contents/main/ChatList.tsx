import {Method} from 'axios';
import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type ChatItem = {
  id: string;
  user: string;
  message: string;
};

type ChatListProps = {
  chats: ChatItem[];
  onPress: any;
};

const ChatList: React.FC<ChatListProps> = ({chats, onPress}) => {
  const renderItem = ({item}: {item: ChatItem}) => (
    <View
      style={{
        height: 100,
        backgroundColor: '#FFF',
        marginTop: 100,
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <Text style={{fontSize: 20}}>{item.message}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={chats}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  message: {
    fontSize: 18,
  },
});

export default ChatList;
