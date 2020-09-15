import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title="Go to Posts"
        onPress={() => navigation.navigate('Posts')}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Login;