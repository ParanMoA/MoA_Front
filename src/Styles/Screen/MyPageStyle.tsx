import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },
  subContainer: {
    width: 375,
    height: 584,
    marginTop: 83,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    alignItems: 'center',
  },
  thirdContainer: {
    width: 300,
    height: 150,
    marginTop: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
  },
  imageContainer: {
    marginTop: 25,
    marginLeft: 15,
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
  },
  textContainer: {
    paddingHorizontal: 60,
    paddingVertical: 30,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ingContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
  },
  line: {
    width: 1,
    height: '70%',
    backgroundColor: 'black',
    marginHorizontal: '15%',
  },
});
