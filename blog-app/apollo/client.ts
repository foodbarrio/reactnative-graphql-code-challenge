import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
  split,
} from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { setContext } from "apollo-link-context";
import { typeDefs, resolvers } from "./resolvers";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const getLocalHostName = () => {
  // assumes you are running on LAN mode and running the server locally on port 5000
  const expoUrl = Constants.manifest.bundleUrl;

  const hostnameStartIndex = expoUrl.indexOf("//") + 2;
  const hostname = expoUrl.substring(
    hostnameStartIndex,
    expoUrl.indexOf(":", hostnameStartIndex)
  );

  return hostname;
};

const uri =
  Platform.OS === "web"
    ? "://localhost:4000/graphql"
    : "://localhost:4000/graphql".replace("localhost", getLocalHostName());

const wsLink = new WebSocketLink({
  uri: `ws${uri}`,
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: `http${uri}`,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem("TOKEN");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache,
  typeDefs,
  resolvers,
});

export default client;
