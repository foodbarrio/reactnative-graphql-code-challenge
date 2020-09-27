import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Subnavigators (navigation nodes)
import AppNavigator from "./appNavigator";
import AuthNavigator from "./authNavigator";

import { useQuery } from "@apollo/client";

import { CURRENT_USER } from "../gqlApi";

import SplashView from "../components/splashView";

import { Text } from "react-native";

export default function Navigation() {
  const { data, loading, error } = useQuery(CURRENT_USER);

  if (loading) return null;

  if (error) return <Text>Something went wrong</Text>;

  return (
    <NavigationContainer>
      <RootNavigator isUserLoggedIn={!!data?.currentUser?.id} />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator({ isUserLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isUserLoggedIn ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
