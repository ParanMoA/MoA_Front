import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Platform,
  ActionSheetIOS,
  Pressable,
  Dimensions,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainParamList} from '../../NavigationType';
type IngredientScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Ingredient'>;
};
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  launchImageLibrary,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import UploadModeModal from './CameraModal';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const IngredientScreen = ({navigation}: IngredientScreenProps) => {
  const [response, setResponse] = useState<ImagePickerResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    console.log(res);
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

  return (
    <View style={styles.container}>
      <Pressable onPress={modalOpen}>
        <Icon name="plus" color="black" size={60} />
      </Pressable>
      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
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
});
export default IngredientScreen;
