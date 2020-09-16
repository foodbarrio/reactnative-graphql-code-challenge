/**
 * Generic loading screen
 */

import React from 'react';
import Const from '../const';
import { ActivityIndicator, View, StyleSheet } from 'react-native';


const Loading = () =>  (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Const.colors.primary} />
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
