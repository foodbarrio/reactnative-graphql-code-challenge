import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens (navigation leafs)
import LoginScreen from "../../screens/login";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
