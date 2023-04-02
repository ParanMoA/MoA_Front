import React from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView} from 'react-native';

const MyPageScreen = () => {
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
});

export default MyPageScreen;
