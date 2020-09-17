import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import FooterElement from './FooterElement';
import Const from '../const';


DateTime.local();

const Comment = ({comment}) => (
  <Card containerStyle={styles.card}>
    <View style={styles.mainText}>
      <Text style={styles.header}>
        {comment.user.name}
        &nbsp;wrote:&nbsp;
        {comment.title}
      </Text>
    </View>
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
  </Card>
);


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: .5,
    borderColor: Const.colors.lightGrey,
  },
  mainText: {
    marginBottom: 15,
    flexDirection: 'row',
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

Comment.propTypes = {
  comment: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })),
  })
}

export default Comment;
