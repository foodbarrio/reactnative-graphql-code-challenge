/**
 * Generic error screen
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Error = () =>  (
  <View style={styles.container}>
    <Text>
      Something went wrong while fetching data :(
    </Text>
</View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Error;
