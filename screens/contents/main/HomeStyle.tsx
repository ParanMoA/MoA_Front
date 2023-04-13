import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },

  logo: {
    marginTop: '5%',
    width: '50%',
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
    alignItems: 'center',
    paddingHorizontal: '8%',
    paddingVertical: '4%',
    marginHorizontal: '3%',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
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
