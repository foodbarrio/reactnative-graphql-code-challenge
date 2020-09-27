import React from "react";
import apolloClient from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) return null;

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
