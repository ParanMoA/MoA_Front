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
    // backgroundColor: 'pink',
    flexDirection: 'row',
  },
  imageContainer: {
    margin: 25,
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
  },
  textContainer: {
    paddingHorizontal: 60,
    paddingVertical: 30,
    margin: 10,
    // backgroundColor: 'teal',
    flexDirection: 'column',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  ingContainer: {
    width: 300,
    height: 300,
    marginTop: 83,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
  },
});
