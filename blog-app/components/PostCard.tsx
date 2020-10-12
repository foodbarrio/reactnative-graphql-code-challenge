import moment from "moment";
import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { Post } from "../types";
import { Bold, Medium, Regular } from "./StyledText";

interface PostCardProps {
  post: Post;
  onPress: any;
}

export function PostCard(props: PostCardProps) {
  const { post, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>
        <Medium style={styles.name}>{post.author.username} </Medium>
        <Medium style={styles.when}>{moment(post.createdAt).fromNow()}</Medium>
      </Text>
      <Bold style={{ fontSize: 25, color: Colors.BLUE, marginTop: 10 }}>
        {post.title}
      </Bold>
      <Regular style={{ fontSize: 20, paddingBottom: 10 }}>
        {post.content.substring(0, 40)}
      </Regular>
      <View style={styles.footer}>
        <Medium>{post.likes.length} Likes</Medium>
        <Medium>{post.comments.length} Comments</Medium>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  name: {
    color: Colors.BLUE,
  },
  when: {
    color: Colors.BLUE_66,
  },
  footer: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
});
