import { useQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { POSTS_QUERY } from "../apollo/query";
import { POSTS_SUBSCRIPTION } from "../apollo/subscriptions";
import AddButton from "../components/AddButton";
import { PostCard } from "../components/PostCard";
import { Bold } from "../components/StyledText";
import { StyledTextInput } from "../components/StyledTextInput";
import Colors from "../constants/Colors";

import { Post } from "../types";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    data: { posts = [] } = {},
    loading,
    refetch,
    subscribeToMore,
  } = useQuery(POSTS_QUERY);
  const [search, setSearch] = useState("");
  const [filteredPosts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(
      posts.filter((post: any) => {
        return (
          post.content.toLowerCase().includes(search.toLowerCase()) ||
          post.title.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, posts]);

  useEffect(() => {
    subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.postAdded;
        return Object.assign({}, prev, {
          posts: [newFeedItem, ...prev.posts],
        });
      },
    });
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Bold style={{ letterSpacing: 5 }}>Posts</Bold>
      <StyledTextInput
        value={search}
        onChangeText={(t) => setSearch(t)}
        style={{ marginTop: 10 }}
        placeholderTextColor={Colors.WHITE}
        placeholder={"Cerca post"}
      />
      <FlatList
        data={filteredPosts}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
        }
        keyExtractor={(item: Post) => item.id}
        renderItem={({ item }) => (
          <PostCard
            onPress={() => navigation.navigate("Post", { id: item.id })}
            post={item}
          />
        )}
      />
      <AddButton onPress={() => navigation.navigate("CreatePost")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SEMI_WHITE,
    padding: 10,
    paddingTop: 40,
  },
});

export default HomeScreen;
