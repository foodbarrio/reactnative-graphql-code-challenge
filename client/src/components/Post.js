import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import FooterElement from './FooterElement';
import Const from '../const';


DateTime.local();

const Post = (post) => (
  <Card>
    <View style={styles.mainText}>
      <Text style={styles.header}>
        {post.user.name} wrote:
      </Text>
    </View>
    <Card.Divider/>
    {post.title &&
    <>
      <Card.Title>
        {post.title}
      </Card.Title>
    </>
    }
    <View style={styles.mainText}>
      <Text>
        {post.content}
      </Text>
    </View>
    <Card.Divider/>
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
        icon="md-thumbs-up"
        text={post.likes.length}
      />
      <FooterElement
        icon="md-text"
        text={post.comments.length}
      />
    </View>
  </Card>
);


const styles = StyleSheet.create({
  mainText: {
    marginBottom: 15
  },
  header: {
    color: Const.colors.darkGrey,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

Post.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
}

export default Post;
