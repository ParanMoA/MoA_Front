import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  ActionSheetIOS,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';

import {MainParamList} from '../../NavigationType';
import UploadModeModal from './CameraModal';
import {DateAutoFormat} from '../../utils/index';
import {styles} from './Sytle';

type IngredientScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Ingredient'>;
};

const IngredientScreen = ({navigation}: IngredientScreenProps) => {
  const [uri, setUri] = useState(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [purchasedDate, setPurchasedDate] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');

  const handlePress = () => {
    console.log(uri, purchasedDate, expirationDate);
  };
  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }

    const uri = res.assets?.[0]?.uri;
    if (uri) {
      setUri(uri);
    }
  };

  const onLaunchCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        includeBase64: Platform.OS === 'android',
        saveToPhotos: true,
      },
      onPickImage,
    );
  };
  const onLaunchImageLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 768,
        maxHeight: 768,
        includeBase64: Platform.OS === 'android',
      },
      onPickImage,
    );
  };

  const handleAxios = async () => {
    await axios
      .post('http://localhost:8080/user/ingredient/image', {
        Headers: {
          'X-CSRF-TOKEN':
            'rkg0NPh5xREUu8o_AZvvwBTYdlRYi2pL7WNjYVHGFGO8WhM-mHBWB8AaoCk5ifsKMbbb9Se6WzVu6Vpm3QVSB2T_cgGMaXBa',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnaGR0YWNrQGFqb3UuYWMua3IiLCJrZXkiOiJ2YWx1ZSIsImVtYWlsIjoiZ2hkdGFja0Bham91LmFjLmtyIiwidXNlcm5hbWUiOiLtmY3shLHtmZQifQ.TDrKP5-_2hzmkEdnNF4rhBEI5rwhx_tnNCdePDMXQ_8',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const modalOpen = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            onLaunchCamera();
          } else if (buttonIndex === 1) {
            onLaunchImageLibrary();
            handleAxios();
          }
        },
      );
    }
  };

  const onChangePurchasedDate = (date: string) => {
    const targetDate = DateAutoFormat(date);
    setPurchasedDate(targetDate);
  };
  const onChangeExpirationDate = (date: string) => {
    const targetDate = DateAutoFormat(date);
    setExpirationDate(targetDate);
  };
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.piccontainer}>
          <TouchableOpacity style={styles.btn} onPress={modalOpen}>
            <Icon name="plus" color="#EB5500" size={24} />
            <Text>사진 등록</Text>
          </TouchableOpacity>
          <UploadModeModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onLaunchCamera={onLaunchCamera}
            onLaunchImageLibrary={onLaunchImageLibrary}
          />
          <TouchableOpacity style={styles.btn} onPress={modalOpen}>
            <Icon name="plus" color="#EB5500" size={24} />
            <Text>영수증 사진 등록</Text>
          </TouchableOpacity>
          <UploadModeModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onLaunchCamera={onLaunchCamera}
            onLaunchImageLibrary={onLaunchImageLibrary}
          />
        </View>
        <View>
          {uri === undefined ? (
            <Text></Text>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <Image source={{uri: uri}} style={{width: 150, height: 150}} />
              <Text>Hello</Text>
            </View>
          )}
        </View>
        <View>
          <Text style={styles.text}>구매 일자</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangePurchasedDate}
            value={purchasedDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="black"
            keyboardType="numeric"
            maxLength={10}></TextInput>
          <Text style={styles.text}>유통 기한</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangeExpirationDate}
            value={expirationDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="black"
            keyboardType="numeric"
            maxLength={10}></TextInput>
        </View>
        <TouchableOpacity style={styles.btn_2} onPress={handlePress}>
          <Text> 등록 </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IngredientScreen;
