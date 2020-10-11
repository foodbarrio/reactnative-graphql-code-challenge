import React from "react";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Bold } from "./StyledText";
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE, UNLIKE } from "../apollo/mutations";
import { GET_POST, LOCALUSER, POSTS_QUERY } from "../apollo/query";
import { Like } from "../types";

interface LikeButtonProps {
  likes: Like[];
  postId?: string | null;
  commentId?: string | null;
  style?: TextStyle;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  commentId,
  likes,
  style,
}) => {
  const { data, loading } = useQuery(LOCALUSER);

  const [like] = useMutation(LIKE, {
    onCompleted: (data) => console.log(data),
    refetchQueries: [
      { query: GET_POST, variables: { id: postId } },
      { query: POSTS_QUERY },
    ],
  });
  const [unLike] = useMutation(UNLIKE, {
    onCompleted: (data) => console.log(data),
    refetchQueries: [
      { query: GET_POST, variables: { id: postId } },
      { query: POSTS_QUERY },
    ],
  });

  if (loading) return <ActivityIndicator />;

  if (likes.find((l: Like) => l.author.id == data.User.id)) {
    return (
      <TouchableOpacity
        onPress={() =>
          unLike({
            variables: { postId: commentId ? null : postId, commentId },
          })
        }
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo name="heart" size={24} color={Colors.PEACH} />
        <Bold
          style={[styles.small, { color: Colors.WHITE, marginLeft: 3 }, style]}
        >
          {likes.length} Likes
        </Bold>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() =>
          like({ variables: { postId: commentId ? null : postId, commentId } })
        }
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo name="heart-outlined" size={24} color={Colors.PEACH} />
        <Bold
          style={[styles.small, { color: Colors.WHITE, marginLeft: 3 }, style]}
        >
          {likes.length} Likes
        </Bold>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  small: { fontSize: 12 },
});

export default LikeButton;
