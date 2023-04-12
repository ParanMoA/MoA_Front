import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainParamList} from '../../NavigationType';

import {styles} from './Style';

type RecruitScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Recruit'>;
};

type ListUp = {
  id: string;
  title: string;
  completed: boolean;
};

const initialData: ListUp[] = [
  {id: '1', title: 'First', completed: false},
  {id: '2', title: 'Second', completed: false},
  {id: '3', title: 'Third', completed: false},
  {id: '4', title: 'Fourth', completed: false},
  {id: '5', title: 'Fifth', completed: false},
  {id: '6', title: 'Sixth', completed: false},
];

const RecruitScreen = ({navigation}: RecruitScreenProps) => {
  const [data, setData] = useState<ListUp[]>(initialData);

  const renderItem = ({item}: {item: ListUp}) => (
    <View>
      <TouchableOpacity
        style={[styles.item, item.completed && styles.completed]}
        onPress={() => {
          setData(
            data.map(ListUp =>
              ListUp.id === item.id
                ? {...ListUp, completed: !ListUp.completed}
                : ListUp,
            ),
          );
        }}>
        <Text style={styles.title}>{item.title} </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.text}> filter </Text>
      <FlatList
        style={styles.itemContainer}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}></FlatList>
    </View>
  );
};

export default RecruitScreen;