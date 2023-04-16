import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Calendar} from 'react-native-calendars';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');
import {styles} from './ChatStyle';

const ChatScreen = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);

  const onDateChange = (date: Date) => {
    setSelectedStartDate(date);
  };

  const startDate = selectedStartDate ? setSelectedStartDate.toString() : '';

  const handlePress = () => {
    axios
      .get(
        'https://new-api.spacecloud.kr/products/60569/prices?reservation_type_id=110488&year=2023&month=04',
      )
      .then(response => {
        // setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Icon name="backward" color="black" size={60}></Icon>
        </TouchableOpacity>
        <Calendar
          onDayPress={day => {
            console.log('selected day', day);
          }}
        />
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
          handlePress();
        }}>
        {/* <CalendarPicker onDateChange={onDateChange} />; */}
        <Icon name="calendar" color="black" size={60}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;
