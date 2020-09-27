import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
import { Text } from "react-native";
import HamburgerHeader from "../../components/hamburgerHeader";
import PostEditor from "../../components/postEditor";
import SplashView from "../../components/splashView";

import {
  UPDATE_POST,
  GET_POST_BY_ID,
  GET_ALL_POSTS,
  GET_MY_POSTS
} from "../../gqlApi";

export default ({ route }) => {
  const { postId } = route.params;

  const navigation = useNavigation();

  const getPostResults = useQuery(GET_POST_BY_ID, {
    variables: { id: postId }
  });

  const [updatePost, updatePostResults] = useMutation(UPDATE_POST, {
    refetchQueries: [
      { query: GET_ALL_POSTS, variables: {} },
      { query: GET_MY_POSTS, variables: {} }
    ],
    awaitRefetchQueries: true
  });

  React.useEffect(() => {
    if (updatePostResults.data?.updatePost) navigation.navigate("MyPosts");
  }, [updatePostResults.data]);

  const renderContent = ({ loading, error, data }) => {
    if (loading) return <SplashView />;
    if (error) return <Text>Error :(</Text>;
    return (
      <PostEditor
        initialTitle={data.post.title}
        initialContent={data.post.content}
        onSubmit={(title, content) => {
          updatePost({ variables: { id: postId, title, content } });
        }}
        disabled={updatePostResults.loading}
      />
    );
  };

  return (
    <>
      <HamburgerHeader title="Editor" />
      {renderContent(getPostResults)}
    </>
  );
};
