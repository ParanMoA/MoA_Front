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
    // backgroundColor: 'white',
    marginTop: '3%',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  inputText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: '1%',
    paddingHorizontal: '30%',
    paddingVertical: '2%',
    backgroundColor: '#FFF7F4',
    borderWidth: 0,
    borderRadius: 15,
  },

  buttonContainer: {
    // backgroundColor: 'teal',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '20%',
    paddingVertical: '1%',
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '2%',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#FFF7F4',
    borderRadius: 15,
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: '2%',
    paddingVertical: '0.5%',
  },
});
