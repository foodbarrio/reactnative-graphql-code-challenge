/**
 * Screen displaying post details and comments
 */

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Post from '../components/Post';
import Comment from '../components/Comment';


const COMMENTS = gql`
  query comments($parentId: ID!) {
    comments(parentId: $parentId) {
      id
      title
      content
      createdAt
      likes {
        id
      }
      user {
        id
        name
      }
    }
  }
`;

const PostDetail = (props) => {
  const {post} = props.route.params;
  console.log(post);
  const { loading, error, data } = useQuery(COMMENTS, {
    variables: { parentId: post.id },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <ScrollView style={styles.container}>
      <Post post={post} />
      {data.comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment} 
        />
      ))}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  
  addPost: {
    position: 'absolute',
    bottom: 20,
    right: 10, 
    zIndex: 1,
  },
  container: {
    flexGrow: 1,
  },
});

export default PostDetail;
