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
import {MainParamList} from '../Navigation/NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from '../Styles/Screen/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'HomeScreen'>;
};

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const initialData: Todo[] = [
  {id: '1', title: '레스토랑 1', completed: false},
  {id: '2', title: '레스토랑 2', completed: false},
  {id: '3', title: '레스토랑 3', completed: false},
];

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const handleIngredientPress = () => {
    navigation.navigate('IngredientScreen');
  };
  const handleRecruitPress = () => {
    navigation.navigate('RecruitScreen');
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
        source={require('../../public/images/MoA.png')}
        style={styles.logo}
      />
      <Image
        source={require('../../public/images/MoA_2.png')}
        style={{...styles.logo, marginTop: '5%'}}
      />
      <View
        style={{
          backgroundColor: '#F9FAFB',
          width: 374,
          borderRadius: 24,
          marginTop: 20,
        }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleIngredientPress}>
            <Icon name="plus" color="#EB5500" size={24} />
            <Text style={styles.btnText}> 식재료 등록 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRecruitPress}>
            <Icon name="plus" color="#EB5500" size={24} />
            <Text style={styles.btnText}> 모집글 보기 </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}></FlatList>
      </View>
    </View>
  );
};

export default HomeScreen;
