/**
 * Screen displaying post details and comments
 */

import React, {useState} from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useQuery } from '@apollo/client';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Post from '../components/Post';
import Comment from '../components/Comment';
import CreateModal from '../components/CreateModal';
import {COMMENTS} from '../queries';
import Const from '../const';


const PostDetails = (props) => {
  const {post, user} = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);
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
      <Post postId={post.id} user={user} />
      <View style={styles.buttonView}>
        <Button
          title="Add comment"
          buttonStyle={styles.commentButton}
          titleStyle={styles.commentButtonText}
          onPress={() => setModalVisible(true)}
        />
      </View>
      {data.comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          user={user}
        />
      ))}
      <CreateModal
        user={user}
        postId={post.id}
        entityType='comment'
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
  buttonView: {
    marginRight: 15,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  commentButton: {
    backgroundColor: Const.colors.primary,
    height: 36,
    width: 120,
    marginTop: 10
  },
  commentButtonText: {
    fontSize: 14,
    color: 'white',
  } 
});

export default PostDetails;
