import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { POSTS_QUERY } from "../apollo/query";
import AddButton from "../components/AddButton";
import { PostCard } from "../components/PostCard";
import { Bold } from "../components/StyledText";
import { StyledTextInput } from "../components/StyledTextInput";
import Colors from "../constants/Colors";
import Navigation from "../navigation";
import { Post } from "../types";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { data, loading, refetch } = useQuery(POSTS_QUERY);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Bold style={{ letterSpacing: 5 }}>Posts</Bold>
      <StyledTextInput
        style={{ marginTop: 10 }}
        placeholderTextColor={Colors.WHITE}
        placeholder={"Cerca post"}
      />
      <FlatList
        data={data.posts || []}
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
