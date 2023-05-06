import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const BASE_URL = 'http://localhost:8080/';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Options = {
  headers?: any;
  method?: HTTPMethod;
  body?: any;
};

export const request = async (
  url: string,
  data = {},
  method: HTTPMethod = 'GET',
) => {
  const options: Options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  };
  if (method === 'GET') {
    url += '?' + new URLSearchParams(data).toString();
  } else {
    options.body = JSON.stringify(data);
  }
  //   console.log(options);
  const token = await AsyncStorage.getItem('AccessToken');
  if (token) {
    options.headers['x-access-token'] = token;
  }
  //   console.log(`${BASE_URL}` + url);
  try {
    const res = await fetch(`${BASE_URL}` + url, options);
    if (!res.ok) {
      Alert.alert('서버와의 통신이 실패하였습니다.');
    }
    return res;
  } catch (error: unknown) {
    // console.log(error);
    Alert.alert('서버와의 통신이 실패하였습니다.');
  }
};
