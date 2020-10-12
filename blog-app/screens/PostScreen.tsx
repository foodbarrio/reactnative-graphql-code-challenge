import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { GET_POST } from "../apollo/query";
import { Bold, Regular } from "../components/StyledText";
import Colors from "../constants/Colors";

import { EvilIcons } from "@expo/vector-icons";
import { Comment } from "../types";
import CommentCard from "../components/CommentCard";
import CommentTextInput from "../components/CommentTextInput";

import { Feather } from "@expo/vector-icons";
import LikeButton from "../components/LikeButton";

import EditContext from "../editContext";
import {
  COMMENTS_SUBSCRIPTION,
  LIKES_SUBSCRIPTION,
} from "../apollo/subscriptions";

const PostScreen: React.FC<any> = (props) => {
  const { id } = props.route.params;

  const [edit, setEdit] = useState(false);
  const {
    data: { getPost = {}, User = {} } = {},
    refetch,
    loading,
    subscribeToMore,
  } = useQuery(GET_POST, {
    variables: { id },
  });
  let flatlistRef = useRef(null);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      refetch(id);
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    if (loading) return;
    if (getPost.author.id == User.id)
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("EditPost", {
                id,
                content: getPost.content,
                title: getPost.title,
              })
            }
          >
            <Feather
              style={{ padding: 5 }}
              name="edit"
              size={24}
              color={Colors.BLUE}
            />
          </TouchableOpacity>
        ),
      });
  }, [getPost]);

  useEffect(() => {
    subscribeToMore({
      document: COMMENTS_SUBSCRIPTION,
      variables: { postId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.commentAdded;
        const newObj = Object.assign({}, prev, {
          getPost: {
            ...prev.getPost,
            comments: [newFeedItem, ...prev.getPost.comments],
          },
        });
        return newObj;
      },
    });

    subscribeToMore({
      document: LIKES_SUBSCRIPTION,
      variables: { postId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.likeAdded;
        const newObj = Object.assign({}, prev, {
          getPost: {
            ...prev.getPost,
            likes: [newFeedItem, ...prev.getPost.likes],
          },
        });
        return newObj;
      },
    });
  }, []);

  const listHeader = () => {
    return (
      <>
        <View style={styles.mainContainer}>
          <Bold style={{ fontSize: 50 }}>{getPost.title}</Bold>
          <Bold style={styles.small}>by {getPost.author.username}</Bold>
          <Regular style={styles.body}>{getPost.content}</Regular>
        </View>
        <View style={styles.indicatorBar}>
          <View style={styles.indicator}>
            <LikeButton likes={getPost.likes} postId={id} />
          </View>
          <View style={styles.indicator}>
            <EvilIcons name="comment" size={24} color={Colors.PEACH} />
            <Bold style={[styles.small, { color: Colors.WHITE }]}>
              {getPost.comments.length} Comments
            </Bold>
          </View>
        </View>
      </>
    );
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <EditContext.Provider value={{ edit, setEdit: (v) => setEdit(v) }}>
      <View style={styles.container}>
        {!edit && <CommentTextInput id={id} />}
        <View style={{ flex: 1, paddingBottom: 80 }}>
          <FlatList
            ref={flatlistRef}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={listHeader()}
            contentContainerStyle={{
              backgroundColor: Colors.GRAY_BG,
              paddingBottom: edit ? 300 : 100,
            }}
            data={getPost.comments}
            keyExtractor={(item: Comment) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => refetch()}
              />
            }
            renderItem={({ item, index }: { item: Comment; index: number }) => (
              <CommentCard
                subscribeToMore={() => {
                  subscribeToMore({
                    document: LIKES_SUBSCRIPTION,
                    variables: { commentId: item.id },
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      const newFeedItem = subscriptionData.data.likeAdded;
                      const newComments = prev.getPost.comments.map(
                        (comment: any) => {
                          if (comment.id == newFeedItem.comment.id) {
                            return {
                              ...comment,
                              likes: [newFeedItem, ...comment.likes],
                            };
                          }
                          return comment;
                        }
                      );
                      const newObj = Object.assign({}, prev, {
                        getPost: {
                          ...prev.getPost,
                          comments: {
                            ...newComments,
                          },
                        },
                      });
                      return newObj;
                    },
                  });
                }}
                index={index}
                comment={item}
                id={id}
                flatlist={flatlistRef}
              />
            )}
          />
        </View>
      </View>
      {edit && (
        <TouchableOpacity
          onPress={() => setEdit(false)}
          style={styles.overlay}
        />
      )}
    </EditContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.GRAY_BG },
  mainContainer: { padding: 10, backgroundColor: Colors.WHITE },
  small: { fontSize: 12 },
  body: { fontSize: 14, marginTop: 30, marginBottom: 20 },
  indicatorBar: {
    backgroundColor: Colors.BLUE,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.GRAY_BG,
    opacity: 0.3,
    zIndex: 1,
  },
});
export default PostScreen;
