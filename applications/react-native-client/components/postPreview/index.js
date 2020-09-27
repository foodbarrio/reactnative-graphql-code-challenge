import * as React from "react";
import { View } from "react-native";
import {
  Card,
  Text,
  Avatar,
  Subheading,
  Button,
  Divider
} from "react-native-paper";
import styles from "./styles";

const Author = ({ username }) => {
  return (
    <View style={[styles.row, styles.attribution]}>
      <Avatar.Image source={require("../../assets/avatar-1.png")} size={32} />
      <Subheading style={styles.author}>{username}</Subheading>
    </View>
  );
};

const Footer = ({ likesCount, commentsCount }) => {
  return (
    <View style={styles.row}>
      <Button style={styles.icon} size={16} icon="heart-outline">
        {likesCount}
      </Button>
      <Button style={styles.icon} size={16} icon="comment-outline">
        {commentsCount}
      </Button>
    </View>
  );
};

const PostPreview = ({
  id,
  username,
  title,
  createdAt,
  onPress,
  likesCount,
  commentsCount
}) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Author username={username} />
      <Card.Content style={styles.content}>
        <Text>{title}</Text>
      </Card.Content>
      <Divider />
      <Footer {...{ likesCount, commentsCount }} />
    </Card>
  );
};

export default PostPreview;
