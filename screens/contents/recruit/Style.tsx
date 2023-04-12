import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
    flex: 1,
  },
  // scrollViewContainer: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   padding: '40%',
  //   margin: '5%',
  // },
  text: {
    marginTop: '5%',
    textAlign: 'center',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },

  button: {
    marginHorizontal: '5%',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 5,
  },

  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: '15%',
    paddingVertical: '5%',
  },

  itemContainer: {
    flex: 1,
    // backgroundColor: 'black',
    paddingHorizontal: '30%',
    paddingVertical: '5%',
    paddingBottom: '5%',
  },
  item: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFF7F4',
    alignItems: 'center',
    marginVertical: '5%',
    marginHorizontal: '5%',
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
  },
  completed: {
    backgroundColor: 'skyblue',
  },
});
