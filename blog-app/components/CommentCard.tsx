import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Colors from "../constants/Colors";
import { Comment } from "../types";
import { Bold, Regular } from "./StyledText";
import moment from "moment";
import LikeButton from "./LikeButton";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST, LOCALUSER } from "../apollo/query";
import { EDIT_COMMENT } from "../apollo/mutations";
import { AntDesign } from "@expo/vector-icons";
import EditContext from "../editContext";

interface CommentCardProps {
  comment: Comment;
  id: string;
  flatlist: any;
  index: number;
  subscribeToMore: () => void;
}

const CommentCard: React.FC<CommentCardProps> = (props) => {
  const { comment, flatlist, id, index, subscribeToMore } = props;

  useEffect(() => {
    subscribeToMore();
  }, []);

  const { data: { User = {} } = {} } = useQuery(LOCALUSER);
  const context = useContext(EditContext);
  const [editComment, { data, loading }] = useMutation(EDIT_COMMENT, {
    refetchQueries: [{ query: GET_POST, variables: { id } }],
  });

  const isEdit = context.edit + "" == comment.id + "";
  const [editValue, setEditValue] = useState("");

  const editTextInputRef = useRef(null);

  useEffect(() => {
    console.log("child", flatlist.current);
  }, [flatlist]);

  useEffect(() => {
    if (isEdit) {
      editTextInputRef.current.focus();
      console.log(flatlist.current.scrollToIndex({ index }));
    }
  }, [context.edit]);

  const startEdit = () => {
    setEditValue(comment.content);
    context.setEdit(comment.id);
  };

  const onCommentEdit = () => {
    editComment({
      variables: { id: comment.id, content: editValue },
    });
    context.setEdit(null);
  };

  if (loading) return <ActivityIndicator />;
  return (
    <View style={[styles.container, { zIndex: 2 }]}>
      <View style={styles.row}>
        <Text>
          <Bold style={styles.small}>{comment.author.username} </Bold>
          <Bold style={styles.smallGrey}>
            {moment(comment.createdAt).fromNow()}
          </Bold>
        </Text>
        {comment.author.id === User.id && !isEdit && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
            }}
            onPress={() => startEdit()}
          >
            <AntDesign name="edit" size={18} color={Colors.BLUE} />
            <Bold style={styles.editText}>Edit</Bold>
          </TouchableOpacity>
        )}
      </View>
      {!isEdit ? (
        <>
          <Regular>{comment.content}</Regular>
          <View style={{ height: 10 }} />
          <LikeButton
            postId={id}
            commentId={comment.id}
            likes={comment.likes}
            style={{ color: Colors.BLUE }}
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.textInput}
            value={editValue}
            onChangeText={(t) => setEditValue(t)}
            ref={editTextInputRef}
          />
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <TouchableOpacity
              onPress={onCommentEdit}
              style={styles.confirmButton}
            >
              <Bold style={styles.confirmText}>CONFERMA</Bold>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                context.setEdit(null);
              }}
              style={styles.cancelButton}
            >
              <Bold
                style={{
                  color: Colors.WHITE,
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                ANNULLA
              </Bold>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    minHeight: 10,
    zIndex: 100,
  },
  small: {
    fontSize: 14,
  },
  smallGrey: {
    fontSize: 14,
    color: Colors.BLUE_66,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textInput: {
    borderColor: Colors.BLUE,
    borderWidth: 1,
    padding: 5,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 5,
  },
  editText: {
    marginLeft: 5,
    color: Colors.BLUE,
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: Colors.PEACH,
    padding: 5,
    width: 100,
    borderRadius: 5,
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: Colors.GRAY_TXT,
    padding: 5,
    width: 100,
    borderRadius: 5,
    justifyContent: "center",
    marginLeft: 15,
  },
  confirmText: {
    fontSize: 12,
    color: Colors.BLUE,
    textAlign: "center",
  },
});

export default CommentCard;
