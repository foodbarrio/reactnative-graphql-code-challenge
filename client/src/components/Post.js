import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { DateTime } from 'luxon';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import FooterElement from './FooterElement';
import Const from '../const';
import Form from './Form';

DateTime.local();

const EDIT_POST = gql`
  mutation editPost($userId: ID!, $id: ID!, $content: String!, $title: String) {
    editPost(userId: $userId, id: $id, content: $content, title: $title) {
      id
      content
      title
    }
  }
`;

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
  const { posts } = client.readQuery({
    query: gql`
      query posts {
        posts {
          id
          title
          content
          createdAt
          comments {
            id
          }
          likes {
            id
          }
          user {
            id
            name
          }
        }
      }
    `,
  });
  return posts.find((post) => post.id == id);
} 


const Post = ({postId, navigation, user}) => {
  const [editing, setEditing] = useState(false);
  const client = useApolloClient();
  const post = getPost(client, postId);
  const [editPost, {loading, error}] = useMutation(EDIT_POST);

  useEffect(() => {
    if (!loading) {
      setEditing(false);
    }
  }, [loading]);

  if (error) {
    Alert.alert('Something went wrong: Error while editing post');
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
          onCancel={() => setEditing(false)}
          onUpdate={editPost}
          loading={loading}
        />
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={navigation ? 0.5 : 1}
            onPress={() => navigation?.navigate('Post details', {post, user})}
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
};

Post.defaultProps = {
  navigation: undefined,
};

export default Post;
