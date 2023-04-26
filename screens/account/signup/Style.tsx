import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
    flex: 1,
  },

  logo: {
    width: 250,
    height: 120,
  },
  emailContainer: {
    marginTop: '3%',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
    flexDirection: 'row',
  },
  emailBtn: {
    alignItems: 'center',
    marginHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#FFF7F4',
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 16,
  },
  inputContainer: {
    // backgroundColor: 'white',
    marginTop: '3%',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
    // alignItems: 'center',
  },
  inputText: {
    height: 53,
    width: 342,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: '1%',
    paddingHorizontal: '30%',
    paddingVertical: '1%',
    backgroundColor: '#FFF7F4',
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    // backgroundColor: 'teal',
    justifyContent: 'space-between',
    paddingHorizontal: '20%',
    paddingVertical: '1%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#FFF7F4',
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 16,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: '2%',
    paddingVertical: '0.5%',
  },

  // checked: {
  //   color: 'orange',
  // },
});
