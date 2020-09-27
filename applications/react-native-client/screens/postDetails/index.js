import * as React from "react";
import { View, Image, ScrollView, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useScrollToTop, useTheme } from "@react-navigation/native";
import BackHeader from "../../components/backHeader";
import SplashView from "../../components/splashView";
import {
  Card,
  Text,
  Avatar,
  Subheading,
  IconButton,
  Divider
} from "react-native-paper";

import Post from "../../components/post";
import Comment from "../../components/comment";
import SingleInputForm from "../../components/singleInputForm";

import { useQuery, useMutation } from "@apollo/client";
import {
  GET_POST_BY_ID,
  CREATE_COMMENT,
  CREATE_LIKE,
  DELETE_LIKE,
  CURRENT_USER
} from "../../gqlApi";

const PostDetailsScreen = ({ route, ...rest }) => {
  const { postId } = route.params;

  const ref = React.useRef(null);

  const [comment, setComment] = React.useState("");

  useScrollToTop(ref);

  const { colors } = useTheme();

  // TODO: subscriptions instead of polling!
  const query = useQuery(GET_POST_BY_ID, {
    variables: { id: postId },
    pollInterval: 2000
  });

  const [createComment, createCommentResponse] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      {
        query: GET_POST_BY_ID,
        variables: { id: postId }
      }
    ],
    awaitRefetchQueries: true
  });

  const [createLike] = useMutation(CREATE_LIKE, {
    refetchQueries: [
      {
        query: GET_POST_BY_ID,
        variables: { id: postId }
      }
    ],
    awaitRefetchQueries: true
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    refetchQueries: [
      {
        query: GET_POST_BY_ID,
        variables: { id: postId }
      }
    ],
    awaitRefetchQueries: true
  });

  const renderContent = ({ loading, error, data }) => {
    if (loading) return <SplashView />;
    if (error) return <Text>Error :(</Text>;

    return (
      <ScrollView
        ref={ref}
        style={{ backgroundColor: colors.card }}
        contentContainerStyle={styles.content}
        {...rest}
      >
        <Post
          {...{
            ...data.post,
            username: data.post.author.username,
            onLikePress: () => {
              if (data.post.liked?.id) {
                deleteLike({
                  variables: { id: data.post.liked.id }
                });
              } else {
                createLike({
                  variables: { parentPost: data.post.id }
                });
              }
            }
          }}
        />
        <Divider />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            Comments ({data.post.commentsCount})
          </Text>
        </View>
        <Divider />
        {data.post.comments?.map((comment, index) => (
          <Comment
            {...{
              ...comment,
              username: comment.author.username,
              onLikePress: () => {
                if (comment.liked?.id) {
                  deleteLike({
                    variables: { id: comment.liked.id }
                  });
                } else {
                  createLike({
                    variables: { parentComment: comment.id }
                  });
                }
              }
            }}
            key={index}
          />
        ))}
        <SingleInputForm
          inputPlaceholder="Your comment here..."
          buttonValue="Send"
          onSubmit={value =>
            createComment({
              variables: { parentPost: postId, content: value }
            })
          }
          disabled={createCommentResponse.loading}
        />
      </ScrollView>
    );
  };

  return (
    <>
      <BackHeader title="Post" />
      {renderContent(query)}
    </>
  );
};

export default PostDetailsScreen;

const styles = StyleSheet.create({
  content: {
    paddingVertical: 12
  },
  author: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16
  },
  meta: {
    marginHorizontal: 8,
    justifyContent: "center"
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24
  },
  timestamp: {
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 21
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 8,
    marginHorizontal: 16
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
    marginHorizontal: 16
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginVertical: 8
  },
  commentView: {
    flex: 1,
    padding: 16,
    justifyContent: "center"
  },
  input: {
    margin: 8,
    padding: 10,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.08)"
  },
  button: {
    margin: 8
  },
  text: {
    textAlign: "center",
    margin: 8
  },
  card: {
    marginVertical: 8,
    borderRadius: 0
  },
  cover: {
    height: 160,
    borderRadius: 0
  },
  contentCard: {
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
