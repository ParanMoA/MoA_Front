import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },
  subcontainer: {
    width: 374,
    height: 400,
    marginTop: 83,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  placecontainer: {
    marginTop: 50,
  },
  datecontainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },
  datesubcontainer: {
    width: 374,
    height: 400,
    marginTop: 83,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timecontainer: {
    flexDirection: 'column',
  },
  title: {
    marginTop: 25,
    marginBottom: 20,
  },
  titletext: {
    fontSize: 25,
  },
  line: {
    width: 1, // 선의 너비
    height: '50%', // 선의 높이 (컨테이너의 높이와 동일하게 설정하면 컨테이너 전체에 선을 그립니다)
    backgroundColor: 'black', // 선의 색상
    marginHorizontal: '5%',
  },
  timeButton: {
    marginVertical: '5%',
    backgroundColor: 'white',
  },
  selectedTimeButton: {
    backgroundColor: '#FFD6BF',
  },
});
