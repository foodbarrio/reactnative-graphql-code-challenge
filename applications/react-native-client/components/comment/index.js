import * as React from "react";
import { View } from "react-native";
import {
  Card,
  Text,
  Avatar,
  Subheading,
  Divider,
  Button
} from "react-native-paper";
import styles from "./styles";

const Author = ({ username }) => (
  <View style={[styles.row, styles.attribution]}>
    <Avatar.Image source={require("../../assets/avatar-1.png")} size={32} />
    <Subheading style={styles.author}>{username}</Subheading>
  </View>
);

const Footer = ({ liked, likesCount, onLikePress }) => (
  <View style={styles.row}>
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

const Comment = ({
  parentComment,
  username,
  content,
  likesCount,
  liked,
  createdAt,
  onLikePress
}) => {
  return (
    <Card style={styles.card}>
      <Author username={username} />
      <Card.Content style={styles.content}>
        <Text>{content}</Text>
      </Card.Content>
      <Divider />
      <Footer {...{ liked, likesCount, onLikePress }} />
    </Card>
  );
};

export default Comment;
