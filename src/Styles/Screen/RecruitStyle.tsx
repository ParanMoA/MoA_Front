import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
    flex: 1,
  },

  textContainer: {
    backgroundColor: 'white',
    paddingHorizontal: '30%',
    marginTop: '5%',
    paddingVertical: '2%',
    borderRadius: 5,
  },
  text: {
    marginTop: '5%',
    textAlign: 'center',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },

  button: {
    //모집글 등록하기 버튼
    marginTop: '40%',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
    paddingHorizontal: '20%',
    paddingVertical: '2%',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 5,
  },

  btnText: {
    //모집글 등록하기 버튼 텍스트
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
  ShowboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: 'black',
  },
  completed: {
    backgroundColor: '#FFC1B3',
  },

  joinbtncontainer: {
    justifyContent: 'center',
    borderRadius: 5,
    // padding: 5,
    borderColor: 'white',
  },
  joinbtn: {
    justifyContent: 'space-between',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
