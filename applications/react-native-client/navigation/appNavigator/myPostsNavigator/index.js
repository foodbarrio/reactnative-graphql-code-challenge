import * as React from "react";
import { useFocusEffect, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens (navigation leafs)
import MyPostsScreen from "../../../screens/myPosts";
import EditPostScreen from "../../../screens/editPost";

const Stack = createStackNavigator();

const MyPostsNavigator = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // On exit reset initialRoute to MyPosts
        navigation.dispatch(StackActions.replace("MyPosts"));
      };
    }, [])
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MyPosts" component={MyPostsScreen} />
      <Stack.Screen name="EditPost" component={EditPostScreen} />
    </Stack.Navigator>
  );
};

export default MyPostsNavigator;
