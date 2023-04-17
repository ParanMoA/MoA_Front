import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
  },
  logo: {
    width: 200,
    height: 100,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
