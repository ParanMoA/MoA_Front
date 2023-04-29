// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {MainParamList} from '../../NavigationType';
// import {styles} from './Style';

// const windowDimensions = Dimensions.get('window');
// const screenDimensions = Dimensions.get('screen');

// // const MyComponent = () => {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     // fetch('url').then.then~~.
// //   }, []);
// // };

// type RecruitScreenProps = {
//   navigation: NativeStackNavigationProp<MainParamList, 'Recruit'>;
// };

// type ListUp = {
//   id: string;
//   title: string;
//   completed: boolean;
// };

// const initialData: ListUp[] = [
//   {id: '1', title: 'First', completed: false},
//   {id: '2', title: 'Second', completed: false},
//   {id: '3', title: 'Third', completed: false},
//   {id: '4', title: 'Fourth', completed: false},
//   {id: '5', title: 'Fifth', completed: false},
//   {id: '6', title: 'Sixth', completed: false},
// ];

// const RecruitScreen = ({navigation}: RecruitScreenProps) => {
//   const [data, setData] = useState<ListUp[]>(initialData);

//   const renderItem = ({item}: {item: ListUp}) => (
//     <View>
//       <TouchableOpacity
//         style={[styles.item, item.completed && styles.completed]}
//         onPress={() => {
//           setData(
//             data.map(ListUp =>
//               ListUp.id === item.id
//                 ? {...ListUp, completed: !ListUp.completed}
//                 : ListUp,
//             ),
//           );
//         }}>
//         <Text style={styles.title}>{item.title} </Text>
//       </TouchableOpacity>
//     </View>
//   );
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}> filter </Text>
//       <FlatList
//         style={styles.itemContainer}
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}></FlatList>
//     </View>
//   );
// };

// export default RecruitScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainParamList} from '../../NavigationType';
import {styles} from './Style';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

type dataList = {
  id: number;
  menu: string;
  cost: number;
  completed: boolean;
};

const InitialData: dataList[] = [
  {id: 1, menu: 'pasta', cost: 20000, completed: false},
  {id: 2, menu: 'pizza', cost: 21000, completed: false},
  {id: 3, menu: 'chicken', cost: 25000, completed: false},
  {id: 4, menu: 'cola', cost: 2000, completed: false},
  {id: 5, menu: 'water', cost: 1000, completed: false},
  {id: 6, menu: 'shrimp', cost: 5000, completed: false},
  {id: 7, menu: 'cheese', cost: 3000, completed: false},
];

type RecruitScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Recruit'>;
};

const RecruitScreen = ({navigation}: RecruitScreenProps) => {
  const [foodname, setFoodname] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [maxpeople, setMaxpeople] = useState('');
  const [recruitdate, setRecruitdate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const [data, setData] = useState<dataList[]>(InitialData);

  const renderItem = ({item}: {item: dataList}) => (
    <TouchableOpacity
      style={[styles.item, item.completed && styles.completed]}
      onPress={() => {
        setData(
          data.map(dataList =>
            dataList.id === item.id
              ? {...dataList, completed: !dataList.completed}
              : dataList,
          ),
        );
      }}>
      <Text style={styles.text}>
        {item.menu}
        {item.cost}
      </Text>
    </TouchableOpacity>
  );
  const handleRecruit = async () => {
    // await axios
    //   .post('http://localhost:8080/recruit/create', {
    //     foodName: foodName,
    //     ingredients: ingredients,
    //     maxPeople: maxPeople,
    //     recruitDate : recruitDate,
    //     title : title,
    //     content: content,
    //     withCredentials: true,
    //     responsetype: 'json',
    //     header: {
    //       'content-type': 'application/json',
    //     },
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //     AsyncStorage.setItem('AccessToken', JSON.stringify(response.data));
    navigation.navigate('Recruit');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     Alert.alert('Recruit Failed', 'Please Check your Recruit Options');
    //   });
  };

  useEffect(() => {
    // axios
    //   .get('http://jsonplaceholder.typicode.com/posts')
    //   .then(response => setData(response.data))
    //   .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {
        <View>
          {/* <TextInput
            style={styles.textContainer}
            placeholder="foodname"
            keyboardType="email-address"
            autoCapitalize="none"
            value={foodname}
            onChangeText={setFoodname}></TextInput>
          <TextInput
            style={styles.textContainer}
            placeholder="ingredients"
            secureTextEntry
            value={ingredients}
            onChangeText={setIngredients}></TextInput> */}

          <FlatList data={data} renderItem={renderItem}></FlatList>
        </View>
      }
    </View>
  );
};

export default RecruitScreen;
