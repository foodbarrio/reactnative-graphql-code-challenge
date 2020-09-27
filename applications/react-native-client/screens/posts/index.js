import * as React from "react";
import { Text, ScrollView } from "react-native";
import {
  useScrollToTop,
  useTheme,
  useNavigation
} from "@react-navigation/native";
import HamburgerHeader from "../../components/hamburgerHeader";
import PostPreview from "../../components/postPreview";
import SplashView from "../../components/splashView";
import { useQuery, gql } from "@apollo/client";
import styles from "./styles";

import { GET_ALL_POSTS } from "../../gqlApi";

const PostsScreen = props => {
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const { colors } = useTheme();

  const { loading, error, data } = useQuery(GET_ALL_POSTS, {
    pollInterval: 1000
  });

  if (loading) return <SplashView />;

  if (error) return <Text>Error :(</Text>;

  return (
    <>
      <HamburgerHeader title="All posts" />
      <ScrollView ref={ref} {...props}>
        {data.posts.map((post, index) => (
          <PostPreview
            {...{
              ...post,
              username: post.author.username,
              onPress: () => {
                props.navigation.navigate("PostDetails", {
                  postId: post.id
                });
              }
            }}
            key={index}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default PostsScreen;
