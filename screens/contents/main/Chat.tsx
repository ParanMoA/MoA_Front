import axios from 'axios';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Calendar} from 'react-native-calendars';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },
  logo: {
    width: 200,
    height: 100,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatScreen;
