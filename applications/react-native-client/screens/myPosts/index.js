import * as React from "react";
import { View, TextInput, Image, ScrollView, StyleSheet } from "react-native";
import {
  useScrollToTop,
  useTheme,
  useNavigation
} from "@react-navigation/native";
import {
  Card,
  Text,
  Avatar,
  Subheading,
  IconButton,
  Divider
} from "react-native-paper";
import Color from "color";
import HamburgerHeader from "../../components/hamburgerHeader";
import SplashView from "../../components/splashView";
import PostPreview from "../../components/postPreview";

import { useQuery, gql } from "@apollo/client";

import { GET_MY_POSTS } from "../../gqlApi";

const MyPostsScreen = props => {
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const { colors } = useTheme();

  // TODO: subscriptions instead of polling!
  const query = useQuery(GET_MY_POSTS, { pollInterval: 5000 });

  const renderContent = ({ loading, error, data }) => {
    if (loading) return <SplashView />;
    if (error) return <Text>Error :(</Text>;
    return (
      <ScrollView ref={ref} {...props}>
        {data.myPosts.map((post, index) => (
          <PostPreview
            {...{
              ...post,
              username: post.author.username,
              onPress: () => {
                props.navigation.navigate("EditPost", {
                  postId: post.id
                });
              }
            }}
            key={index}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <>
      <HamburgerHeader title="My posts" />
      {renderContent(query)}
    </>
  );
};

export default MyPostsScreen;

const styles = StyleSheet.create({
  input: {
    padding: 16,
    backgroundColor: "transparent",
    margin: 0
  },
  card: {
    marginVertical: 8,
    borderRadius: 0
  },
  cover: {
    height: 160,
    borderRadius: 0
  },
  content: {
    marginBottom: 12
  },
  attribution: {
    margin: 12
  },
  author: {
    marginHorizontal: 8
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    flex: 1
  }
});
