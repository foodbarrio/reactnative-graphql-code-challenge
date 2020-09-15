import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from './src/Login';
import Posts from './src/Posts';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const localhost = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
const client = new ApolloClient({
  uri: `http://${localhost}:4000/`,
  cache: new InMemoryCache()
});

const Stack = createStackNavigator();


export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Posts"
            component={Posts}
            options={({ navigation }) => ({
              ...TransitionPresets.SlideFromRightIOS,
              headerRight: () => (
                <Ionicons
                  style={styles.logout}
                  name="ios-log-out"
                  size={32}
                  onPress={navigation.popToTop}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    margin: 15,
  }
});
