import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <Text> Chat Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyPageScreen;
