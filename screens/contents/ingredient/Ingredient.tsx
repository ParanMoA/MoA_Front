import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  ActionSheetIOS,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainParamList} from '../../NavigationType';
type IngredientScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Ingredient'>;
};
import Icon from 'react-native-vector-icons/FontAwesome';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import UploadModeModal from './CameraModal';
import {DateAutoFormat} from '../../utils/index';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const IngredientScreen = ({navigation}: IngredientScreenProps) => {
  const [uri, setUri] = useState();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [purchasedDate, setPurchasedDate] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');

  const handlePress = () => {
    // 등록 버튼을 눌렀을 때, 이미지 uri, purchasedDate, expirationDate 넘겨주기
    // axios.post('')
    console.log(uri, purchasedDate, expirationDate);
  };
  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    setUri(res.assets[0].uri);
  };

  const onLaunchCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 768,
        maxHeight: 768,
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
      <View style={styles.piccontainer}>
        <TouchableOpacity style={styles.inputText} onPress={modalOpen}>
          <Icon name="plus" color="black" size={60} />
          <Text>사진 등록</Text>
        </TouchableOpacity>
        <UploadModeModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onLaunchCamera={onLaunchCamera}
          onLaunchImageLibrary={onLaunchImageLibrary}
        />
        {uri === undefined ? (
          <Text> No Image </Text>
        ) : (
          <Image
            source={{uri: uri}}
            style={{width: 100, height: 100, marginLeft: '5%'}}
          />
        )}
      </View>
      <View>
        <Text>구매 일자</Text>
        <TextInput
          onChangeText={onChangePurchasedDate}
          value={purchasedDate}
          placeholder="YYYY-MM-DD"
          keyboardType="numeric"
          maxLength={10}></TextInput>
        <Text>유통 기한</Text>
        <TextInput
          onChangeText={onChangeExpirationDate}
          value={expirationDate}
          placeholder="YYYY-MM-DD"
          keyboardType="numeric"
          maxLength={10}></TextInput>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text> 등록 </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
    flex: 1,
  },
  piccontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
    flexDirection: 'row',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  inputText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: '1%',
    paddingHorizontal: '20%',
    paddingVertical: '2%',
    backgroundColor: '#FFF7F4',
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 5,
  },
});
export default IngredientScreen;
