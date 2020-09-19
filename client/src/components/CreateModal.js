/**
 * Screen displaying post details and comments
 */

import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { Card } from 'react-native-elements';
import { useMutation, gql } from '@apollo/client';
import Error from './Error';
import Form from './Form';
import {POSTS, COMMENTS} from '../queries';
import Const from '../const';

const CREATE_POST = gql`
  mutation createPost($userId: ID!, $content: String!, $title: String) {
    createPost(userId: $userId, content: $content, title: $title) {
      id
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($userId: ID!, $postId: ID!, $content: String!, $title: String) {
    createComment(userId: $userId, postId: $postId, content: $content, title: $title) {
      id
    }
  }
`;


const CreateModal = ({user, postId, visible, onClose, entityType}) => {
  const [createPost, {loading: postLoading, error: postError}] = useMutation(CREATE_POST, {
    refetchQueries: [{query: POSTS}],
  });
  const [createComment, {loading: commentLoading, error: commentError}] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{query: COMMENTS, variables: { parentId: postId } }],
  });

  useEffect(() => {
    if (!(postLoading || commentLoading)) {
      onClose();
    }
  }, [postLoading, commentLoading]);

  if (postError || commentError) {
    return <Error />;
  }

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onPress={onClose}
    >
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.title}>
            Add a new {entityType}
          </Card.Title>
          <Text style={styles.subtitle}>
            as {user.name}
          </Text>
          <Form
            onCancel={onClose}
            onSubmit={(content, title) => {
              if (entityType === 'post') {
                createPost({
                  variables: {
                    userId: user.id,
                    content,
                    title,
                  }
                });
              } else {
                createComment({
                  variables: {
                    userId: user.id,
                    postId,
                    content,
                    title,
                  }
                });
              }
            }}
            loading={postLoading || commentLoading}
          />
        </Card>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
  card: {
    borderRadius: 4,
    borderColor: Const.colors.grey,
    backgroundColor: Const.colors.whiteGrey,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
  },
  subtitle: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default CreateModal;
