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
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    // backgroundColor: 'white',
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
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 5,
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
