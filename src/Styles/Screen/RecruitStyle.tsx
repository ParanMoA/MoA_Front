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
    marginTop: '4%',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
    paddingHorizontal: '20%',
    paddingVertical: '2%',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 16,
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
    // flex: 1,
    // backgroundColor: 'black',
    // paddingHorizontal: '20%',
    paddingVertical: '5%',
    paddingBottom: '5%',
  },
  ShowboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },

  item: {
    paddingHorizontal: '23%',
    // paddingVertical: '4%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginVertical: '4%',
    marginHorizontal: '4%',
    // borderWidth: 1.5,
    color: 'black',
    fontWeight: 'bold',
    borderColor: '#000000',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },

  completed: {
    // backgroundColor: '#FFD6BF',
    paddingHorizontal: '2%',
    paddingVertical: '2.5%',
    marginHorizontal: '2%',
  },

  joinbtncontainer: {
    justifyContent: 'center',
    borderRadius: 5,
    // padding: 5,
    borderColor: '#FFFFFF',
  },
  joinbtn: {
    // margin: '2%',
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
    fontSize: 15,
    fontWeight: 'bold',
  },
  joinDetail: {
    backgroundColor: '#FFBB99', //#FFE8C2
    width: '80%',
    height: '60%',
    marginBottom: '5%',
    // paddingLeft: '20%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  joinDetailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  joinAndcancelBtn: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  empty: {
    marginVertical: 3,
    marginHorizontal: 3,
  },
});
