import * as React from "react";
import { Appbar } from "react-native-paper";
import { useTheme, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";

// Subnavigators (navigation nodes)
import PostsNavigator from "./postsNavigator";
import MyPostsNavigator from "./myPostsNavigator";

// Screens (navigation leafs)
import CreatePostScreen from "../../screens/createPost";

import useIsLargeScreen from "../../hooks/useIsLargeScreen";

const CustomDrawerContent = props => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.card, elevation: 1 }}>
        <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Menu" />
      </Appbar.Header>
      <DrawerContent {...props} />
    </>
  );
};

const Drawer = createDrawerNavigator();

export default function DrawerScreen({ navigation, ...rest }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false
    });
  }, [navigation]);

  const isLargeScreen = useIsLargeScreen();

  return (
    <Drawer.Navigator
      openByDefault={isLargeScreen}
      drawerType={isLargeScreen ? "permanent" : "back"}
      drawerStyle={isLargeScreen ? null : { width: "100%" }}
      overlayColor="transparent"
      drawerContent={props => <CustomDrawerContent {...props} />}
      edgeWidth={0}
      {...rest}
    >
      <Drawer.Screen name="Posts" component={PostsNavigator} />
      <Drawer.Screen name="MyPosts" component={MyPostsNavigator} />
      <Drawer.Screen name="Create" component={CreatePostScreen} />
    </Drawer.Navigator>
  );
}
