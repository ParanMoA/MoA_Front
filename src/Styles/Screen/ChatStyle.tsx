import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },
  subcontainer: {
    width: 374,
    height: 584,
    marginTop: 83,
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
  },
  logo: {
    width: 200,
    height: 100,
  },
  chatcontainer: {
    marginTop: 24,
    marginLeft: 24,
  },
  list: {
    marginTop: 300,
    paddingHorizontal: '23%',
    // paddingVertical: '4%',
    backgroundColor: '#FFFFFF',
    marginVertical: '4%',
    marginHorizontal: '4%',
    // borderWidth: 1.5,
    color: 'black',
    fontWeight: 'bold',
    borderColor: '#000000',
    borderRadius: 10,
  },
  myChat: {backgroundColor: '#123456'},
  otherChat: {backgroundColor: '#111222'},
  bottomContainer: {
    flexDirection: 'row',
    marginBottom: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {width: 100, height: 100, backgroundColor: '#FFFFFF'},
  send: {width: 100, height: 100, backgroundColor: '#000000'},
});
