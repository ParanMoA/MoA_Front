import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {MainParamList} from '../../NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
      <Text style={styles.title}>{item.title} </Text>
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
          <Text> 식재료 등록 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRecruitPress}>
          <Text> 모집글 보기 </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  logo: {
    width: 200,
    height: 100,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
  },
  completed: {
    backgroundColor: '#ccc',
  },
});

export default HomeScreen;
