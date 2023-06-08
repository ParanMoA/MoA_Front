import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },

  subcontainer: {
    backgroundColor: '#F9FAFB',
    width: '90%',
    borderRadius: 24,
    marginTop: '3%',
  },
  logo: {
    marginTop: '10%',
    width: '50%',
    height: '15%',
  },

  buttonContainer: {
    marginTop: '2%',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    // backgroundColor: 'white',
  },
  button: {
    width: 150,
    height: 90,
    marginHorizontal: '3%',
    justifyContent: 'space-evenly',
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
    // paddingHorizontal: '30%',
    paddingVertical: '8%',
    // alignContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
    // borderWidth: 1.5,
    // borderColor: 'black',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  time: {
    fontSize: 13,
    color: '#EB5500',
  },
  listcontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  completed: {
    backgroundColor: '#ccc',
  },
  text: {
    color: '#6B7684',
    marginLeft: 15,
    marginBottom: 5,
  },
  flatlist: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: '3%',
  },
});
