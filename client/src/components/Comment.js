/**
 * Display a single comment
 */

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { DateTime } from 'luxon';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import FooterElement from './FooterElement';
import Form from './Form';
import Const from '../const';
import {COMMENTS} from '../queries';


DateTime.local();

const EDIT_COMMENT = gql`
  mutation editComment($userId: ID!, $id: ID!, $content: String!, $title: String) {
    editComment(userId: $userId, id: $id, content: $content, title: $title) {
      id
      content
      title
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($userId: ID!, $id: ID!) {
    deleteComment(userId: $userId, id: $id) {
      id
    }
  }
`;


const Comment = ({comment, user}) => {
  const [editing, setEditing] = useState(false);
  const [editComment, {loading: updateLoading, error: updateError}] = useMutation(EDIT_COMMENT, {
    refetchQueries: [{query: COMMENTS, variables: { parentId: comment.post.id } }],
  });
  const [deleteComment, {loading: deleteLoading, error: deleteError}] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{query: COMMENTS, variables: { parentId: comment.post.id } }],
  });

  if (updateError || deleteError) {
    Alert.alert('Something went wrong: Error while editing post');
  }

  useEffect(() => {
    if (!updateLoading) {
      setEditing(false);
    }
  }, [updateLoading]);

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {comment.user.name}
          &nbsp;commented:&nbsp;
          {comment.title}
        </Text>
        {user.id === comment.user.id && (
          <Icon
            name="md-settings"
            size={20}
            color={Const.colors.grey}
            type="ionicon"
            onPress={() => setEditing(!editing)}
          />
        )}
      </View>
      {editing ? (
        <Form
          parent={comment}
          loading={updateLoading || deleteLoading}
          onCancel={() => setEditing(false)}
          onDelete={deleteComment}
          onSubmit={(content, title) => {
            editComment({
              variables: {
                userId: comment.user.id,
                id: comment.id,
                content,
                title,
              }
            });
          }}
        />
      ) : (
        <>
          <View style={styles.mainText}>
            <Text>
              {comment.content}
            </Text>
          </View>
          <Card.Divider/>
          <View style={styles.footer}>
            <FooterElement
              icon="md-clock"
              text={DateTime
                .fromMillis(+comment.createdAt)
                .setLocale('it')
                .toLocaleString(DateTime.DATETIME_SHORT)
              }
            />
            <FooterElement
              icon="md-thumbs-up"
              text={comment.likes.length}
            />
          </View>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Const.colors.whiteGrey,
    borderRadius: 10,
    borderWidth: .5,
    borderColor: Const.colors.lightGrey,
  },
  mainText: {
    marginBottom: 15,
    marginTop: 15,    
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: Const.colors.darkGrey,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

Comment.propTypes = {
  comment: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })),
  }),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default Comment;
