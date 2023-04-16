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
    // 등록 버튼을 눌렀을 때, 이미지 uri, purchasedDate, expirationDate 넘겨주기
    // axios.post('')
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
      <View style={styles.subcontainer}>
        <View>
          <TouchableOpacity style={styles.btn} onPress={modalOpen}>
            <Icon name="plus" color="black" size={60} />
            <Text>사진 등록</Text>
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
            <Image source={{uri: uri}} style={{width: 200, height: 200}} />
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
        <TouchableOpacity
          style={{
            width: 200,
            height: 200,
          }}
          onPress={handlePress}>
          <Text> 등록 </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IngredientScreen;
