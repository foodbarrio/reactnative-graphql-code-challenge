/**
 * Main app entry point.
 * Setup for navigation and server connection are found here.
 */

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Const from './src/const';
import Login from './src/scenes/Login';
import Posts from './src/scenes/Posts';
import PostDetails from './src/scenes/PostDetails';


// Set default localhost depending on emulation platform
const localhost = Platform.OS === 'android' ? Const.androidLocalhost : Const.defaultLocalhost;
const client = new ApolloClient({
  uri: `http://${localhost}:4000/`,
  cache: new InMemoryCache(),
});

// React Navigation custom theme color
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Const.colors.primary,
  },
};

const Stack = createStackNavigator();

const App = () => (
  <ApolloProvider client={client}>
    <NavigationContainer theme={MyTheme}>
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
        <Stack.Screen
          name="Post details"
          component={PostDetails}
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
    color: Const.colors.primary,
  }
});

export default App;
