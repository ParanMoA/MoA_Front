import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  chatroomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },
  list: {
    marginTop: 40,
  },
  chatcontainer: {
    marginTop: 24,
    marginLeft: 24,
  },
  subcontainer: {
    width: 374,
    height: 584,
    marginTop: 83,
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
  },
  mychatContainer: {
    backgroundColor: '#E2E2E2',
    width: '50%',
    borderRadius: 16,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  otherchatContainer: {
    backgroundColor: '#FFD6BF',
    width: '50%',
    borderRadius: 16,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myChat: {
    color: 'black',
    fontSize: 20,
  },
  otherChat: {
    color: 'white',
    fontSize: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    width: 280,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderColor: 'grey',
    borderRadius: 4,
    borderWidth: 0.5,
  },
  sendbox: {
    width: 50,
    height: 50,
    backgroundColor: '#FFD6BF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  send: {},
});
