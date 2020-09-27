import * as React from "react";
import { View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import styles from "./styles";

const ContentTextInput = props => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={400}
    />
  );
};

const PostEditor = ({
  onSubmit,
  disabled,
  initialTitle = "",
  initialContent = ""
}) => {
  const [title, onChangeTitle] = React.useState(initialTitle);
  const [content, onChangeContent] = React.useState(initialContent);

  const { colors } = useTheme();

  return (
    <View style={styles.content}>
      <View
        style={{
          backgroundColor: "transparent",
          fontWeight: "bold",
          fontSize: "22px",
          margin: 8
        }}
      >
        <TextInput
          placeholder="Your Post Title Here..."
          style={[{ fontWeight: "bold" }]}
          onChangeText={onChangeTitle}
          value={title}
        />
      </View>

      <View
        style={{
          backgroundColor: "transparent",
          margin: 8
        }}
      >
        <ContentTextInput
          placeholder="Your Post Content Here..."
          multiline
          numberOfLines={10}
          onChangeText={text => onChangeContent(text)}
          value={content}
        />
      </View>
      <Button
        mode="contained"
        onPress={async () => {
          onSubmit(title, content);
          onChangeTitle("");
          onChangeContent("");
        }}
        style={styles.button}
        disabled={disabled || !title || !content}
      >
        Publish
      </Button>
    </View>
  );
};

export default PostEditor;
