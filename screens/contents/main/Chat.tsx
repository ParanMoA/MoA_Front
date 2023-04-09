import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../public/images/MoA.png')}
        style={styles.logo}
      />
      <Image
        source={require('../../../public/images/MoA_2.png')}
        style={styles.logo}
      />
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Header</Text>
          <View style={styles.separator} />
          <Text style={styles.body}>Body</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ChatScreen;
