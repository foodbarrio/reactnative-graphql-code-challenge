import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql
} from "@apollo/client";

import AsyncStorage from "@react-native-community/async-storage";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_HOST
    ? `http://${process.env.GRAPHQL_HOST}:4000`
    : "http://localhost:4000"
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token;

  try {
    token = await AsyncStorage.getItem("token");
  } catch (e) {
    // Restoring token failed
    // TODO:
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default apolloClient;
