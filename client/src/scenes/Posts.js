/**
 * Screen listing all posts
 */

import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useQuery, gql } from '@apollo/client';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Const from '../const';
import Post from '../components/Post';


const POSTS = gql`
  query {
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
`;

const Posts = () => {
  const { loading, error, data } = useQuery(POSTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.posts.map((post) => <Post key={post.id} {...post} />)}
      </ScrollView>
      <View style={styles.addPost}>
        <Icon
          name='md-add'
          color={Const.colors.primary}
          type='ionicon'
          reverse
          onPress={() => {/* Create post */}}
        />
      </View>
    </View>
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

export default Posts;
