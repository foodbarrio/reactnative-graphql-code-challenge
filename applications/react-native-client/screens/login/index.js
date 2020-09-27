import * as React from "react";

import AsyncStorage from "@react-native-community/async-storage";

import { useMutation, gql, useApolloClient } from "@apollo/client";

import SingleInputForm from "../../components/singleInputForm";
import SplashView from "../../components/splashView";

import styles from "./styles";

import { LOG_IN, CURRENT_USER } from "../../gqlApi";

export default () => {
  const client = useApolloClient();
  const [signIn, { loading, error, data }] = useMutation(LOG_IN);

  React.useEffect(() => {
    const setup = async () => {
      await AsyncStorage.setItem("token", data.login);
      await client.resetStore();
    };
    data && setup();
  }, [data]);

  if (loading) return <SplashView />;

  if (error) alert(error.message);

  return (
    <SingleInputForm
      inputPlaceholder="username"
      buttonValue="LOGIN"
      onSubmit={value => {
        signIn({
          variables: { username: value }
        });
      }}
      disabled={loading}
    />
  );
};
