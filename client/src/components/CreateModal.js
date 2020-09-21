/**
 * Modal allowing to create a new post/comment
 */

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { Card } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import Error from './Error';
import Form from './Form';
import {POSTS, COMMENTS} from '../gql/queries';
import {CREATE_POST, CREATE_COMMENT} from '../gql/mutations';
import Const from '../const';
import {updatePosts} from '../utils';


const CreateModal = ({user, postId, visible, onClose, entityType}) => {
  const [createPost, {loading: postLoading, error: postError}] = useMutation(CREATE_POST, {
    refetchQueries: [{query: POSTS}],
  });
  const [createComment, {loading: commentLoading, error: commentError}] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{query: POSTS}, {query: COMMENTS, variables: { parentId: postId } }],
    awaitRefetchQueries: true,
    update: updatePosts,
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

CreateModal.propTypes = {
  postId: PropTypes.string, 
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  entityType: PropTypes.string.isRequired,
};

CreateModal.defaultProps = {
  navigation: undefined,
  inDetail: false,
  visible: false,
};

export default CreateModal;
