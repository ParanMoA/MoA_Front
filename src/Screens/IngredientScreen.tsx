import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  ActionSheetIOS,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';

import {MainParamList} from '../Navigation/NavigationType';
import UploadModeModal from '../Components/CameraModal';
import {DateAutoFormat} from '../utils/DateFormatter';
// import {styles} from '../Styles/Screen/StyleComponent';
import {styles} from '../Styles/Screen/IngredientStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request} from '../Components/AxiosComponent';
import {BASE_URL} from '../constants';

type IngredientScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'IngredientScreen'>;
};

const IngredientScreen = ({navigation}: IngredientScreenProps) => {
  const [isIngredient, setIsIngredient] = useState(true);
  const [ingredientUri, setIngredientUri] = useState(undefined);
  const [ingredientName, setIngredientName] = useState(undefined);
  const [receiptUri, setReceiptUri] = useState(undefined);
  const [receiptName, setReceiptName] = useState(undefined);
  const [ingredients, setIngredients] = useState(['']);
  const [isAdding, setIsAdding] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [selected, setSelected] = useState<string>('');
  const [ingredientModalVisible, setIngredientModalVisible] =
    useState<boolean>(false);
  const [receiptModalVisible, setReceiptModalVisible] =
    useState<boolean>(false);
  const [purchasedDate, setPurchasedDate] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [ingredientImage, setIngredientImage] = useState<string>('');
  const [receiptImage, setReceiptImage] = useState<string>('');
  const [addCount, setAddCount] = useState<number>(0);

  const handleRegister = async () => {
    const data = {
      name: selected,
      purchasedDate: purchasedDate,
      expirationDate: expirationDate,
      ingredientImage: ingredientImage,
      receiptImage: receiptImage,
    };
    console.log(data);
    const res = await request('user/ingredient/register', data, 'POST');
    if (res?.ok) {
      console.log(res);
      Alert.alert('식재료 등록', '식재료 등록에 성공하였습니다.');
    }
  };

  const onPickImage = (res: any, isIngredient: boolean) => {
    if (res.didCancel || !res) {
      return;
    }

    const uri = res.assets?.[0]?.uri;
    const name = res.assets?.[0]?.fileName;
    if (isIngredient) {
      console.log('isIngredient : ', isIngredient);
      setIngredientUri(uri);
      setIngredientName(name);

      handleUploadAxios(
        uri,
        name,
        BASE_URL + 'user/ingredient/image',
        isIngredient,
      );
    } else {
      console.log('else isIngredient : ', isIngredient);
      setReceiptUri(uri);
      setReceiptName(name);
      handleUploadAxios(
        uri,
        name,
        BASE_URL + 'user/ingredient/receiptImage',
        isIngredient,
      );
    }
  };
  const handleUploadAxios = async (
    uri: string,
    name: string,
    url: string,
    isIngredient: boolean,
  ) => {
    const token = await AsyncStorage.getItem('AccessToken');
    const reqHeader = {
      'x-access-token': token || '',
      'content-type': 'multipart/form-data',
    };
    const formData = new FormData();
    var file = {
      uri: uri,
      type: 'multipart/form-data',
      name: name,
    };
    formData.append('file', file);
    await axios
      .post(url, formData, {
        headers: reqHeader,
      })
      .then(response => {
        if (isIngredient) {
          const result = response.data.result.slice(0, 5);
          console.log(result);
          setIngredientImage(response.data.ingredientImage);
          setIngredients(result);
        } else {
          setReceiptImage(response.data.receiptImage);
        }
      })
      .catch(error => {
        console.log(error.request);
      });
  };

  const onLaunchCamera = (isIngredient: boolean) => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        includeBase64: Platform.OS === 'android',
        saveToPhotos: true,
      },
      res => onPickImage(res, isIngredient),
    );
  };
  const onLaunchImageLibrary = (isIngredient: boolean) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 768,
        maxHeight: 768,
        includeBase64: Platform.OS === 'android',
      },
      res => onPickImage(res, isIngredient),
    );
  };

  const handleIngredient = (selectedIngredient: any) => {
    console.log(selectedIngredient);
    setSelected(selectedIngredient);
  };

  const handleAddIngredient = () => {
    setIsAdding(true);
  };

  const handleSaveIngredient = () => {
    if (newIngredient.trim() !== '') {
      const exists = ingredients.includes(newIngredient);
      if (!exists) {
        setIngredients([...ingredients, newIngredient]);
      }
      setAddCount(prevCount => prevCount + 1);
      setIsAdding(false);
      setNewIngredient('');
    }
  };

  const handleCancelAddIngredient = () => {
    setIsAdding(false);
    setNewIngredient('');
  };

  const handleUpload = (isIngredient: any) => {
    if (Platform.OS === 'android') {
      if (isIngredient) {
        setIngredientModalVisible(true);
      } else {
        setReceiptModalVisible(true);
      }
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            onLaunchCamera(isIngredient);
          } else if (buttonIndex === 1) {
            onLaunchImageLibrary(isIngredient);
          }
        },
      );
    }
  };

  const IngredientmodalOpen = () => {
    setIsIngredient(true);
    handleUpload(true);
  };

  const ReceiptModalOpen = () => {
    setIsIngredient(false);
    handleUpload(false);
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
      <ScrollView
        style={[
          styles.subcontainer,
          {borderTopLeftRadius: 24, borderTopRightRadius: 24},
        ]}>
        <View style={styles.piccontainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              IngredientmodalOpen();
            }}>
            <Icon name="plus" color="#EB5500" size={24} />
            <Text>식재료 사진 등록</Text>
          </TouchableOpacity>
          <UploadModeModal
            visible={ingredientModalVisible}
            onClose={() => setIngredientModalVisible(false)}
            onLaunchCamera={() => onLaunchCamera(true)}
            onLaunchImageLibrary={() => onLaunchImageLibrary(true)}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              ReceiptModalOpen();
            }}>
            <Icon name="plus" color="#EB5500" size={24} />
            <Text>영수증 사진 등록</Text>
          </TouchableOpacity>
          <UploadModeModal
            visible={receiptModalVisible}
            onClose={() => setReceiptModalVisible(false)}
            onLaunchCamera={() => onLaunchCamera(false)}
            onLaunchImageLibrary={() => onLaunchImageLibrary(false)}
          />
        </View>
        {ingredientUri === undefined && ingredientName === undefined ? (
          <View style={{marginTop: 10}} />
        ) : (
          <View style={[styles.piccontainer, {marginTop: 20}]}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>등록한 식재료 사진</Text>
              <Image source={{uri: ingredientUri}} style={styles.imgopt} />
              <View>
                <Text style={styles.text}>등록한 영수증 사진</Text>
                <Image source={{uri: receiptUri}} style={styles.imgopt} />
              </View>
            </View>
            <View>
              <Text style={styles.text}> 식재료 이름 </Text>
              <View style={[styles.imgopt, {flex: 1}]}>
                {ingredients.map(ingredient => (
                  <View
                    style={{
                      marginTop: 10,
                      height: 23,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 10,
                      }}>
                      <Text>{ingredient}</Text>
                      <TouchableOpacity
                        style={{
                          ...styles.save_cancel_btn,
                          width: 30,
                        }}
                        onPress={() => handleIngredient(ingredient)}>
                        <Text
                          style={{
                            fontSize: 10,
                          }}>
                          선택
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                {isAdding ? (
                  <View>
                    <TextInput
                      style={{
                        borderColor: '#FFFFFF',
                        borderWidth: 1.5,
                        textAlign: 'center',
                      }}
                      value={newIngredient}
                      placeholder="추가할 식재료 이름"
                      onChangeText={text => setNewIngredient(text)}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        style={styles.save_cancel_btn}
                        onPress={handleSaveIngredient}>
                        <Text> 추가 </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.save_cancel_btn}
                        onPress={handleCancelAddIngredient}>
                        <Text> 취소 </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{...styles.save_cancel_btn, width: 100}}
                      onPress={() => {
                        if (addCount > 1) {
                          Alert.alert('더이상 추가할 수 없습니다.');
                        } else {
                          handleAddIngredient();
                        }
                      }}>
                      <Text style={{fontSize: 13}}>식재료 추가</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
        <View>
          <Text style={[styles.text, {marginLeft: 30}]}>구매 일자</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangePurchasedDate}
            value={purchasedDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="black"
            keyboardType="numeric"
            maxLength={10}></TextInput>
        </View>
        <View>
          <Text style={[styles.text, {marginLeft: 30}]}>유통 기한</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangeExpirationDate}
            value={expirationDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="black"
            keyboardType="numeric"
            maxLength={10}></TextInput>
        </View>
        <View
          style={{
            marginTop: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.register_btn}
            onPress={handleRegister}>
            <Text> 등록 </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default IngredientScreen;
