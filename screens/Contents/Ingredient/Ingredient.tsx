import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainParamList} from '../../NavigationType';
type IngredientScreenProps = {
  navigation: NativeStackNavigationProp<MainParamList, 'Ingredient'>;
};

// import {
//   Camera,
//   CameraPermissionStatus,
//   useCameraDevices,
// } from 'react-native-vision-camera';

const IngredientScreen = ({navigation}: IngredientScreenProps) => {
  // const [cameraPermission, setCameraPermission] =
  //   useState<CameraPermissionStatus | null>(null);

  // useEffect(() => {
  //   const getCameraPermissionStatus = async () => {
  //     const status = await Camera.getCameraPermissionStatus();
  //     setCameraPermission(status);
  //   };
  //   getCameraPermissionStatus();
  // }, []);
  // const devices = useCameraDevices('wide-angle-camera');
  // const device = devices.back;
  return (
    <View>
      <Text>No camera permission</Text>
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
