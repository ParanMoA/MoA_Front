import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
    flex: 1,
  },

  logo: {
    width: '50%',
    height: '15%',
  },

  inputContainer: {
    // backgroundColor: 'black',
    // marginTop: '2%',
    margin: '0.3%',
    paddingHorizontal: '10%',
    paddingVertical: '1%',
  },
  inputText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: '1%',
    paddingHorizontal: '20%',
    paddingVertical: '2%',
    backgroundColor: '#FFF7F4',
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 16,
    // flex: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor: 'teal',
    margin: '0.3%',
    paddingHorizontal: '10%',
    paddingVertical: '1%',
  },
  button: {
    marginHorizontal: '5%',
    paddingVertical: '2%',
    paddingHorizontal: '10%',
    backgroundColor: '#FFF7F4',
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 15,
  },

  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: '1%',
  },

  BirthBtn: {
    alignContent: 'center',
    // padding: '1%',
    paddingHorizontal: '20%',
    backgroundColor: '#FFF7F4',
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 15,
  },
});
