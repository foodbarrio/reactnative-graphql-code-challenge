import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import apolloClient from "../apolloClient";
import { gql } from "@apollo/client";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`;

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf")
        });

        // Load and validate the authorization token (if exists)
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const { data } = await apolloClient.query({
            query: CURRENT_USER
          });
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
