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
  input: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: '1%',
    paddingHorizontal: '30%',
    paddingVertical: '1%',
    backgroundColor: '#FFF7F4',
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 5,
  },
  inputText: {},
  buttonContainer: {
    flexDirection: 'row',
    // backgroundColor: 'teal',
    justifyContent: 'space-between',
    paddingHorizontal: '20%',
    paddingVertical: '1%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '2%',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#FFF7F4',
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: '2%',
    paddingVertical: '0.5%',
  },
});
