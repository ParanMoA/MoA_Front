import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },

  logo: {
    marginTop: '20%',
    width: '65%',
    height: '15%',
  },

  buttonContainer: {
    marginTop: '2%',
    flexDirection: 'row',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    // backgroundColor: 'white',
  },
  button: {
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 16,
  },

  btnText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },

  item: {
    paddingHorizontal: '30%',
    paddingVertical: '10%',
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  completed: {
    backgroundColor: '#ccc',
  },
});
