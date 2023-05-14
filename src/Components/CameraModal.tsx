import React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Pressable,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../Styles/Component/CameraModalStyle';

interface Props {
  visible: boolean;
  onClose: () => void;
  onLaunchCamera: () => void;
  onLaunchImageLibrary: () => void;
}

const UploadModeModal: React.FC<Props> = ({
  visible,
  onClose,
  onLaunchCamera,
  onLaunchImageLibrary,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchCamera();
              onClose();
            }}>
            <Icon
              name="camera-alt"
              color="#757575"
              size={24}
              style={styles.icon}
            />
            <Text>카메라로 촬영하기</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchImageLibrary();
              onClose();
            }}>
            <Icon name="photo" color="#757575" size={24} style={styles.icon} />
            <Text>사진 선택하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default UploadModeModal;