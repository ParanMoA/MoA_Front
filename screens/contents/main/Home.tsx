import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {MainParamList} from '../../NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './HomeStyle';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Home'>;
};

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const initialData: Todo[] = [
  {id: '1', title: 'First', completed: false},
  {id: '2', title: 'Second', completed: false},
  {id: '3', title: 'Third', completed: false},
];

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const handleIngredientPress = () => {
    navigation.navigate('Ingredient');
  };
  const handleRecruitPress = () => {
    navigation.navigate('Recruit');
  };

  const [data, setData] = useState<Todo[]>(initialData);

  const renderItem = ({item}: {item: Todo}) => (
    <TouchableOpacity
      style={[styles.item, item.completed && styles.completed]}
      onPress={() => {
        setData(
          data.map(todo =>
            todo.id === item.id ? {...todo, completed: !todo.completed} : todo,
          ),
        );
      }}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../public/images/MoA.png')}
        style={styles.logo}
      />
      <Image
        source={require('../../../public/images/MoA_2.png')}
        style={styles.logo}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleIngredientPress}>
          <Text style={styles.btnText}> 식재료 등록 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRecruitPress}>
          <Text style={styles.btnText}> 모집글 보기 </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}></FlatList>
    </View>
  );
};

export default HomeScreen;
