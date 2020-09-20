/**
 * Screen listing all posts
 */

import React, {useState} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useQuery } from '@apollo/client';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Const from '../const';
import Post from '../components/Post';
import CreateModal from '../components/CreateModal';
import { POSTS } from '../gql/queries';


const Posts = ({navigation, route}) => {
  const { user } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const { loading, error, data } = useQuery(POSTS, {notifyOnNetworkStatusChange: true});

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
        {data.posts.map((post) => (
          <Post
            navigation={navigation}
            key={post.id}
            postId={post.id}
            user={user}
          />
        ))}
        </View>
      </ScrollView>
      <View style={styles.addPost}>
        <Icon
          name='md-add'
          color={Const.colors.primary}
          type='ionicon'
          reverse
          onPress={() => setModalVisible(true)}
        />
      </View>
      <CreateModal
        user={user}
        entityType='post'
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
  innerContainer: {
    marginBottom: 100,
  }
});

export default Posts;
