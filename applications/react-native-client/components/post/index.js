import * as React from "react";
import { View, Image } from "react-native";
import { Text, Button, Divider } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import styles from "./styles";

const Footer = ({ liked, likesCount = 0, onLikePress }) => (
  <View style={styles.row}>
    <Text style={styles.reactions}>Post reactions</Text>
    <Button
      style={styles.icon}
      size={16}
      icon={liked ? "heart" : "heart-outline"}
      onPress={onLikePress}
    >
      {likesCount}
    </Button>
  </View>
);

const Post = ({
  username,
  createdAt,
  title,
  content,
  liked,
  likesCount,
  onLikePress
}) => {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.author}>
        <Image
          style={styles.avatar}
          source={require("../../assets/avatar-1.png")}
        />
        <View style={styles.meta}>
          <Text style={[styles.name, { color: colors.text }]}>{username}</Text>
          <Text style={[styles.timestamp, { color: colors.text }]}>
            {createdAt}
          </Text>
        </View>
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.paragraph, { color: colors.text }]}>{content}</Text>
      <Divider />
      <Footer {...{ liked, likesCount, onLikePress }} />
    </>
  );
};

export default Post;
