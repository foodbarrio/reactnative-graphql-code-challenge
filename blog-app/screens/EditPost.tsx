import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { DELETE_POST, EDIT_POST } from "../apollo/mutations";
import { GET_POST, POSTS_QUERY } from "../apollo/query";
import { ArrowButton } from "../components/ArrowButton";
import { StyledTextInput } from "../components/StyledTextInput";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const EditPost: React.FC<any> = ({ navigation, route }) => {
  const { id } = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ padding: 5 }} onPress={() => onDelete()}>
          <AntDesign name="delete" size={24} color={Colors.BLUE} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const [editPost] = useMutation(EDIT_POST, {
    onCompleted: (data) => {
      navigation.goBack();
    },
    refetchQueries: [
      { query: POSTS_QUERY },
      { query: GET_POST, variables: { id } },
    ],
    onError: (error) => {
      console.log(error.extraInfo);
    },
  });

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: (data) => {
      navigation.navigate("Home");
    },
    refetchQueries: [{ query: POSTS_QUERY }],
    onError: (error) => {
      console.log(error);
    },
  });

  const [title, setTitle] = useState(route.params.title);
  const [content, setContent] = useState(route.params.content);

  const onDelete = () => {
    Alert.alert("WARNING", "Are you sure you want to delete the post?", [
      {
        text: "OK",
        onPress: () => deletePost({ variables: { id } }),
      },
      {
        text: "No",
      },
    ]);
  };

  const onEdit = () => {
    if (!title || !content) alert("all fields mandatory");
    else if (title === route.params.title && content === route.params.content)
      navigation.goBack();
    else editPost({ variables: { content, title, id } });
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
          onPress={() => onEdit()}
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

export default EditPost;
