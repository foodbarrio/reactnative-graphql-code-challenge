/**
 * Main app entry point.
 * Setup for navigation and server connection are found here.
 */

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from './src/scenes/Login';
import Posts from './src/scenes/Posts';


// Set default localhost depending on emulation platform
const localhost = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
const client = new ApolloClient({
  uri: `http://${localhost}:4000/`,
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

const App = () => (
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
                name="md-log-out"
                size={24}
                onPress={navigation.popToTop}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);


const styles = StyleSheet.create({
  logout: {
    marginRight: 15,
  }
});

export default App;
