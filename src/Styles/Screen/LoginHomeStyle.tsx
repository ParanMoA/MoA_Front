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
  btnContainer: {
    marginTop: '3%',
    // backgroundColor: 'white',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  button: {
    alignItems: 'center',
    marginVertical: '1%',
    paddingHorizontal: '20%',
    paddingVertical: '2%',
    backgroundColor: '#FFF7F4',
    borderColor: '#000000',
    borderRadius: 15,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: '25%',
    paddingVertical: '0.5%',
  },
});
