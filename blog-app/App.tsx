import { ApolloProvider, gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import client from "./apollo/client";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import LoginScreen from "./screens/LoginScreen";

import LoginContext from "./context";

export default function App() {
  const isLoadingComplete = useCachedResources();

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("TOKEN").then((token) => {
      !!token ? setLogged(true) : null;
    });
  }, []);

  const login = (token: string) => {
    AsyncStorage.setItem("TOKEN", token).then(() => setLogged(true));
  };

  const logout = () => {
    AsyncStorage.removeItem("TOKEN").then(() => setLogged(false));
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <LoginContext.Provider value={{ login, logout }}>
        <ApolloProvider client={client}>
          <SafeAreaProvider>
            {logged ? <Navigation /> : <LoginScreen />}
            <StatusBar />
          </SafeAreaProvider>
        </ApolloProvider>
      </LoginContext.Provider>
    );
  }
}
