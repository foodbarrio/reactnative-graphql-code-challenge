import * as React from "react";
import { Appbar } from "react-native-paper";
import { useTheme, useNavigation } from "@react-navigation/native";
import useIsLargeScreen from "../../hooks/useIsLargeScreen";
import { CURRENT_USER } from "../../gqlApi";
import { useApolloClient } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

const HamburgerHeader = ({ title }) => {
  const { colors } = useTheme();
  const isLargeScreen = useIsLargeScreen();
  const navigation = useNavigation();
  const apolloClient = useApolloClient();

  return (
    <Appbar.Header style={{ backgroundColor: colors.card, elevation: 1 }}>
      {isLargeScreen ? null : (
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      )}
      <Appbar.Content title={title} />
      <Appbar.Action
        icon="logout"
        onPress={async () => {
          await AsyncStorage.clear();
          apolloClient.writeQuery({
            query: CURRENT_USER,
            data: { currentUser: null }
          });
        }}
      />
    </Appbar.Header>
  );
};

export default HamburgerHeader;
