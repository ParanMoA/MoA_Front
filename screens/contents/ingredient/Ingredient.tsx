import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

type IngredientScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Ingredient'>;
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
  const handleRegister = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    const reqHeader = {
      'x-access-token': token || '',
    };
    const data = {
      name: selected,
      purchasedDate: purchasedDate,
      expirationDate: expirationDate,
      ingredientImage: ingredientImage,
      receiptImage: receiptImage,
    };
    console.log(data);
    await axios({
      method: 'POST',
      url: 'http://localhost:8080/user/ingredient/register',
      data,
      headers: reqHeader,
    })
      .then(response => console.log(response))
      .catch(error => console.log(error.request));
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
        'http://10.0.2.2:8080/user/ingredient/image',
        isIngredient,
      );
    } else {
      console.log('else isIngredient : ', isIngredient);
      setReceiptUri(uri);
      setReceiptName(name);
      handleUploadAxios(
        uri,
        name,
        'http://10.0.2.2:8080/user/ingredient/receiptImage',
        isIngredient,
      );
    }
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
      setIsAdding(false);
      setNewIngredient('');
    }
  };

  const handleCancelAddIngredient = () => {
    setIsAdding(false);
    setNewIngredient('');
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
    console.log(formData.getParts());
    await axios
      .post(url, formData, {
        headers: reqHeader,
      })
      .then(response => {
        if (isIngredient) {
          const result = response.data.result.slice(0, 5);
          setIngredientImage(response.data.ingredientImage);
          setIngredients(result);
        } else {
          setReceiptImage(response.data.receiptImage);
          // console.log('response =', response.data);
        }
      })
      .catch(error => {
        console.log(error.request);
      });
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

  const IngredientModalOpen = () => {
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
      <View style={styles.subcontainer}>
        <View style={styles.piccontainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              IngredientModalOpen();
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
        <View>
          {ingredientUri === undefined && ingredientName === undefined ? (
            <Text></Text>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image
                  source={{uri: ingredientUri}}
                  style={{width: 100, height: 100}}
                />
                <Text> 내가 ingredientUri</Text>
              </View>
              <View style={{flexDirection: 'column', flex: 1}}>
                {ingredients.map(ingredient => (
                  <TouchableOpacity
                    key={ingredient}
                    style={{flexDirection: 'column'}}
                    onPress={() => handleIngredient(ingredient)}>
                    <Text
                      style={{
                        width: 250,
                        height: 15,
                        backgroundColor: '#FFD6BF',
                        borderColor: '#000000',
                        borderWidth: 1,
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      {ingredient}
                    </Text>
                  </TouchableOpacity>
                ))}
                {isAdding ? (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                      style={{
                        flex: 1,
                        height: 30,
                        backgroundColor: '#FFF',
                        borderColor: '#000000',
                        borderWidth: 1,
                        fontSize: 20,
                        paddingLeft: 10,
                      }}
                      value={newIngredient}
                      onChangeText={text => setNewIngredient(text)}
                    />
                    <TouchableOpacity
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: '#FFD6BF',
                        borderColor: '#000000',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={handleSaveIngredient}>
                      <Icon name="check" color="#EB5500" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: '#FFD6BF',
                        borderColor: '#000000',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={handleCancelAddIngredient}>
                      <Icon name="times" color="#EB5500" size={20} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      width: 250,
                      height: 30,
                      backgroundColor: '#FFD6BF',
                      borderColor: '#000000',
                      borderWidth: 1,
                      alignItems: 'center',
                    }}
                    onPress={handleAddIngredient}>
                    <Icon name="plus" color="#EB5500" size={24} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
        <View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Image
              source={{uri: receiptUri}}
              style={{width: 100, height: 100}}
            />
            <Text> 내가 receiptUri</Text>
          </View>
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
        <TouchableOpacity style={styles.btn_2} onPress={handleRegister}>
          <Text> 등록 </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IngredientScreen;
