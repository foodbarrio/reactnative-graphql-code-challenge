import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CREATE_POST } from "../apollo/mutations";
import { POSTS_QUERY } from "../apollo/query";
import { ArrowButton } from "../components/ArrowButton";
import { StyledTextInput } from "../components/StyledTextInput";
import Colors from "../constants/Colors";

const CreatePost: React.FC<any> = ({ navigation }) => {
  const [createPost, { data }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      navigation.goBack();
    },
    refetchQueries: [{ query: POSTS_QUERY }],
    onError: (error) => {
      console.log(error);
    },
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onCreate = () => {
    if (!title || !content) alert("all fields mandatory");
    else createPost({ variables: { content, title } });
  };

  return (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
      <View style={styles.body}>
        <StyledTextInput
          style={{
            backgroundColor: Colors.GRAY_BG,
            margin: 15,
            color: Colors.BLUE,
            fontFamily: "quicksand-bold",
          }}
          placeholder={"Post Title"}
          placeholderTextColor={Colors.GRAY_TXT}
          value={title}
          onChangeText={(v) => setTitle(v)}
        />
        <StyledTextInput
          multiline
          style={{
            backgroundColor: Colors.GRAY_BG,
            margin: 15,
            minHeight: 150,
            color: Colors.BLUE,
            fontFamily: "quicksand-bold",
          }}
          placeholder={"Post Body"}
          placeholderTextColor={Colors.GRAY_TXT}
          value={content}
          onChangeText={(v) => setContent(v)}
        />
      </View>
      <View style={styles.footer}>
        <ArrowButton
          onPress={() => onCreate()}
          style={{ top: -30, marginRight: 20 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    backgroundColor: Colors.SEMI_WHITE,
  },
  footer: {
    flex: 0.1,
    backgroundColor: Colors.WHITE,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default CreatePost;
