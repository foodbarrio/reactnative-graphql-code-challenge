import * as React from "react";
import { useFocusEffect, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens (navigation leafs)
import PostsScreen from "../../../screens/posts";
import PostDetailsScreen from "../../../screens/postDetails";

const Stack = createStackNavigator();

const PostsNavigator = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // On exit reset initialRoute to Posts
        navigation.dispatch(StackActions.replace("Posts"));
      };
    }, [])
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Posts" component={PostsScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
    </Stack.Navigator>
  );
};

export default PostsNavigator;
