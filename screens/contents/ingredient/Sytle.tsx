import {StyleSheet, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  subcontainer: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    width: 390,
    height: 797,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  piccontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
    flexDirection: 'row',
  },
  btn: {
    width: 165,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7F4',
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 5,
  },
  inputText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: '1%',
  },
});
