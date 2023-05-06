import {StyleSheet, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },
  subcontainer: {
    backgroundColor: '#F9FAFB',
    width: 390,
    height: 600,
    marginTop: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  piccontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    marginTop: 44,
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 16,
  },
  btn_2: {
    width: 342,
    height: 53,
    backgroundColor: 'red', //#FFF7F4
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center',
    borderRadius: 16,
  },
  addbox: {
    backgroundColor: 'black',
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  imgopt: {
    marginTop: 10,
    width: 100,
    height: 100,
  },
  addcompo: {
    width: 30,
    height: 30,
    backgroundColor: '#FFD6BF',
    borderColor: '#000000',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbox: {
    width: 250,
    height: 30,
    backgroundColor: '#FFD6BF',
    borderColor: '#000000',
    borderWidth: 1,
    fontSize: 15,
    textAlign: 'center',
    borderRadius: 10,
  },
  column: {
    flexDirection: 'column',
  },
  inputText: {
    margin: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: '1%',
    backgroundColor: 'yellow',
    width: 342,
    height: 53,
    borderRadius: 16,
  },
  text: {
    color: '#6B7684',
  },
});
