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
} from 'react-native';
import axios from 'axios';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainParamList} from '../../NavigationType';
import {styles} from './Style';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

type dataList = {
  menu: string;
  cost: number;
};

const InitialData: dataList[] = [
  {menu: 'pasta', cost: 20000},
  {menu: 'pizza', cost: 21000},
];

type RecruitScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Recruit'>;
};

const RecruitScreen = ({navigation}: RecruitScreenProps) => {
  const [data, setData] = useState(InitialData);
  const [visible, setVisible] = useState(true);

  const onPress = () => {
    setVisible(!true);
  };

  useEffect(() => {
    // axios
    //   .get('http://jsonplaceholder.typicode.com/posts')
    //   .then(response => setData(response.data))
    //   .catch(error => console.error(error));
  }, []);

  const renderItem = ({item}: {item: dataList}) => (
    <TouchableOpacity style={styles.textContainer}>
      <Button title="JOIN" onPress={onPress} />
      {visible ? <Text>aaa</Text> : <Text>NO!!</Text>}
      <Text style={styles.title}>menu : {item.menu}</Text>
      <Text style={styles.title}>cost : {item.cost}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.menu}
      />
    </View>
  );
};

export default RecruitScreen;
