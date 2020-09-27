import * as React from "react";

import { useMutation } from "@apollo/client";
import { CREATE_POST, GET_ALL_POSTS, GET_MY_POSTS } from "../../gqlApi";

import { useNavigation } from "@react-navigation/native";

import HamburgerHeader from "../../components/hamburgerHeader";
import PostEditor from "../../components/postEditor";

const CreatePostScreen = () => {
  const navigation = useNavigation();

  const [createPost, { loading, error, data }] = useMutation(CREATE_POST, {
    refetchQueries: [
      { query: GET_ALL_POSTS, variables: {} },
      { query: GET_MY_POSTS, variables: {} }
    ],
    awaitRefetchQueries: true
  });

  React.useEffect(() => {
    if (data?.createPost) navigation.navigate("MyPosts");
  }, [data]);

  if (error) alert(error.message);

  return (
    <>
      <HamburgerHeader title="Editor" />
      <PostEditor
        onSubmit={(title, content) => {
          createPost({ variables: { title, content } });
        }}
        disabled={loading}
      />
    </>
  );
};

export default CreatePostScreen;
