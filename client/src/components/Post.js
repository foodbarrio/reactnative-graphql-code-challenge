import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { DateTime } from 'luxon';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import FooterElement from './FooterElement';
import Const from '../const';
import Form from './Form';
import {POSTS, EDIT_POST, DELETE_POST, LIKE, UNLIKE} from '../queries';

DateTime.local();


/**
 * Get post from client query.
 * We cannot use a post passed as prop from above since
 * that param is immutable (thanks to react navigation),
 * so we must read from local client cache instead.
 * 
 * @param {*} client              The Apollo client
 * @param {string|undefined} id   The id post
 */
const getPost = (client, id) => {
  const { posts } = client.readQuery({query: POSTS});
  return posts.find((post) => post.id == id);
} 

const Post = ({postId, inDetail, navigation, user}) => {
  const client = useApolloClient();
  const [editing, setEditing] = useState(false);
  const [post, setPost] = useState(getPost(client, postId));
  const mutationDefaultParams = {
    awaitRefetchQueries: true,
    onCompleted: () => {
      setPost(getPost(client, postId));
    }
  }

  const [editPost, {loading: updateLoading, error: updateError}] = useMutation(EDIT_POST, {
    refetchQueries: [{query: POSTS}],
    ...mutationDefaultParams
  });
  const [deletePost, {loading: deleteLoading, error: deleteError}] = useMutation(DELETE_POST, {
    refetchQueries: [{query: POSTS}],
    onCompleted: () => {
      if (inDetail) {
        navigation.goBack();
      }
    }
  });
  const [like] = useMutation(LIKE, {
    refetchQueries: [{query: POSTS}],
    ...mutationDefaultParams,
  });
  const [unlike] = useMutation(UNLIKE, {
    refetchQueries: [{query: POSTS}],
    ...mutationDefaultParams,
  });

  const liked = post.likes.some(el => el.user.id === user.id);

  // Close form after edit completion
  useEffect(() => {
    if (!updateLoading) {
      setEditing(false);
    }
  }, [updateLoading]);

  if (updateError) {
    Alert.alert('Something went wrong: Error while editing post');
  }
  if (deleteError) {
    Alert.alert('Something went wrong: Error while deleting post');
  }

  if (!post) {
    return null;
  }

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.mainText}>
        <Text style={styles.header}>
          {post.user.name}
        </Text>
        {user.id === post.user.id && (
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
          parent={post}
          loading={updateLoading || deleteLoading}
          onCancel={() => setEditing(false)}
          onDelete={deletePost}
          onSubmit={(content, title) => {
            editPost({
              variables: {
                userId: post.user.id,
                id: post.id,
                content,
                title,
              }
            });
          }}
        />
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={inDetail ? 1 : 0.5}
            onPress={() => {
              if (!inDetail) {
                navigation?.navigate('Post details', {post, user});
              }
            }}
          >
          <Card.Divider style={styles.divider} />
            {!!post.title && (
              <Card.Title style={styles.mainTitle}>
                {post.title}
              </Card.Title>
            )}
            <View style={styles.mainText}>
              <Text>
                {post.content}
              </Text>
            </View>
            <Card.Divider style={styles.divider} />
          </TouchableOpacity>
          <View style={styles.footer}>
            <FooterElement
              icon="md-clock"
              text={DateTime
                .fromMillis(+post.createdAt)
                .setLocale('it')
                .toLocaleString(DateTime.DATETIME_SHORT)
              }
            />
            <FooterElement
              icon="md-text"
              text={post.comments.length}
            />
            <FooterElement
              icon="md-thumbs-up"
              text={post.likes.length}
              highlighted={liked}
              onPress={() => {
                if (liked) {
                  unlike({
                    variables: {
                      userId: user.id,
                      postId: post.id,
                    }
                  })
                } else {
                  like({
                    variables: {
                      userId: user.id,
                      postId: post.id,
                    }
                  })
                }
              }}
            />
          </View>
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    borderColor: Const.colors.primary,
    backgroundColor: Const.colors.primaryLight,
  },
  mainText: {
    marginBottom: 15,    
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTitle: {
    color: Const.colors.primary,
  },
  header: {
    color: Const.colors.darkGrey,
    fontStyle: 'italic',
  },
  divider: {
    backgroundColor: Const.colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })),
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })),
  }),
  navigation: PropTypes.shape({}),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  inDetail: PropTypes.bool,
};

Post.defaultProps = {
  navigation: undefined,
  inDetail: false,
};

export default Post;
