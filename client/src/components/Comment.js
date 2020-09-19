/**
 * Display a single comment
 */

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import FooterElement from './FooterElement';
import Form from './Form';
import Const from '../const';


DateTime.local();

const Comment = ({comment, user}) => {
  const [editing, setEditing] = useState(false);


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
          onCancel={() => setEditing(false)}
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
