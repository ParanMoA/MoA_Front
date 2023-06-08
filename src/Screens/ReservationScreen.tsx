import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Modal, Button, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChatParamList} from '../Navigation/NavigationType';
type ReservationScreenProps = {
  navigation: NativeStackNavigationProp<ChatParamList, 'ReservationScreen'>;
};
import {request} from '../Components/AxiosComponent';
import {styles} from '../Styles/Screen/ReservationStyle';
import {Calendar, Agenda} from 'react-native-calendars';
import {useRecoilValue} from 'recoil';
import chatRoomState from '../Recoil/ChatRoomState';

const ReservationScreen = ({navigation}: ReservationScreenProps) => {
  // 예약 관련 변수`
  const [reservationList, setReservationList] = useState([]);
  const [isTimeListModalVisible, setIstimeListModalVisible] =
    useState<boolean>(false);
  const [timeList, setTimeList] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const chatRoomId = useRecoilValue(chatRoomState);

  const handleReservation = async () => {
    const res = await request('reservation/list');
    if (res?.ok) {
      const response = await res.json();
      setReservationList(response);
    }
  };
  useEffect(() => {
    handleReservation();
  }, []);

  const handleReservationTime = async (place: string) => {
    setSelectedPlace(place);
    const res = await request('reservation/status/' + place);
    if (res?.ok) {
      const response = await res.json();
      const timeMap: {[key: string]: string[]} = {};
      response.forEach((reservation: any) => {
        const {reservationDate, reservationTime} = reservation;
        if (!timeMap[reservationDate]) {
          timeMap[reservationDate] = [];
        }
        if (!timeMap[reservationDate].includes(reservationTime)) {
          timeMap[reservationDate].push(reservationTime);
        }
      });
      console.log(timeMap);
      setTimeList(timeMap);
      setIstimeListModalVisible(true);
    }
  };
  const handleTimeListModalClose = () => {
    setIstimeListModalVisible(false);
  };
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
  };
  const handleTimeSelection = async (time: string) => {
    setSelectedTime(time);
  };

  const ConfirmReservation = async () => {
    let data = {
      chatRoomId: chatRoomId.chatRoomId,
      reservationDate: selectedDate,
      reservationTime: selectedTime,
      reservationLocation: selectedPlace,
    };
    console.log(data);
    const res = await request('reservation/confirm', data, 'POST');
    if (res?.ok) {
      console.log(res);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.title}>
          <Text style={styles.titletext}> 커뮤니티 키친 목록 </Text>
        </View>
        {reservationList.map(place => (
          <View key={place} style={styles.placecontainer}>
            <TouchableOpacity
              onPress={() => {
                handleReservationTime(place);
              }}>
              <Text style={{color: '#6B7684', fontSize: 16}}>{place}</Text>
            </TouchableOpacity>
            <Modal
              visible={isTimeListModalVisible}
              onRequestClose={handleTimeListModalClose}>
              <View style={styles.datecontainer}>
                <View style={styles.datesubcontainer}>
                  <View style={styles.timecontainer}>
                    {Object.keys(timeList).map(date => (
                      <TouchableOpacity
                        key={date}
                        onPress={() => handleDateSelection(date)}
                        style={[
                          styles.timeButton,
                          date === selectedDate && styles.selectedTimeButton,
                        ]}>
                        <Text>{date}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.line} />
                  <View style={styles.timecontainer}>
                    {Object.entries(timeList).map(
                      ([date, times]: [string, any]) => {
                        if (date === selectedDate) {
                          return times.map((time: any, index: any) => (
                            <TouchableOpacity
                              key={index}
                              onPress={async () => {
                                handleTimeSelection(time);
                              }}
                              style={[
                                styles.timeButton,
                                time === selectedTime &&
                                  styles.selectedTimeButton,
                              ]}>
                              <Text>{time}</Text>
                            </TouchableOpacity>
                          ));
                        }
                        return null;
                      },
                    )}
                  </View>
                  <View style={styles.line} />
                  <View style={styles.timecontainer}>
                    <Button
                      title="선택하기"
                      onPress={ConfirmReservation}
                      color="black"
                    />
                    <Button
                      title="뒤로가기"
                      onPress={handleTimeListModalClose}
                      color="black"
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        ))}
      </View>
    </View>
  );
};
export default ReservationScreen;
