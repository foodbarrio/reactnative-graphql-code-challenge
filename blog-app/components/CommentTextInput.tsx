import React, { KeyboardEvent, useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { DeviceWidth } from "../constants/Layout";

import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../apollo/mutations";
import { GET_POST, POSTS_QUERY } from "../apollo/query";

const CommentTextInput = ({ id }: { id: string }) => {
  const [comment, setComment] = useState("");
  const [offset, setOffset] = useState(0);
  const [createComment, { data }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      { query: GET_POST, variables: { id } },
      { query: POSTS_QUERY },
    ],
    onCompleted: () => {
      setComment("");
      Keyboard.dismiss();
      setOffset(0);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (Platform.OS === "ios") {
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

      return () => {
        Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      };
    }
  }, []);

  const _keyboardDidShow = (e: any) => {
    setOffset(e.endCoordinates.height);
  };

  const _keyboardDidHide = () => {
    setOffset(0);
  };

  return (
    <View style={[styles.container, { bottom: offset }]}>
      <View
        style={{
          backgroundColor: Colors.GRAY_BG,
          flex: 1,
          margin: 15,
          marginBottom: 10,
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{
            flex: 6,
            color: Colors.BLUE,
            fontFamily: "quicksand-light",
            fontSize: 16,
            padding: 10,
            paddingTop: 12.5,
            paddingBottom: 12.5,
          }}
          placeholder={"Leave a comment"}
          placeholderTextColor={Colors.BLUE}
          value={comment}
          onChangeText={(v) => setComment(v)}
        />
        <TouchableOpacity
          style={{
            flex: 2,
            padding: 15,
            alignContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            comment.length &&
            createComment({ variables: { content: comment, postId: id } })
          }
        >
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DeviceWidth,
    backgroundColor: Colors.BLUE_33,
    position: "absolute",
    bottom: 0,
    paddingBottom: 10,
    zIndex: 100,
  },
});

export default CommentTextInput;
