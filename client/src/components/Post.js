import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import FooterElement from './FooterElement';
import Const from '../const';


DateTime.local();

const Post = ({post, navigation}) => (
  <Card containerStyle={styles.card}>
    <TouchableOpacity
      activeOpacity={navigation ? 0.5 : 1}
      onPress={() => navigation?.navigate('Post detail', {post})}
    >
      <View style={styles.mainText}>
        <Text style={styles.header}>
          {post.user.name} wrote:
        </Text>
      </View>
      <Card.Divider style={styles.divider} />
      {post.title && (
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
    </TouchableOpacity>

  </Card>
);


const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    borderColor: Const.colors.primary,
    backgroundColor: Const.colors.primaryLight,
  },
  mainText: {
    marginBottom: 15,    
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
};

Post.defaultProps = {
  navigation: undefined,
};

export default Post;
