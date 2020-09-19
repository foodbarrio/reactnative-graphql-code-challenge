/**
 * Small form to set title and content of post/comment
 */

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Const from '../const';


const Form = ({
  parent,
  loading,
  onCancel,
  onSubmit,
  onDelete,
}) => {
  const [title, setTitle] = useState(parent?.title);
  const [content, setContent] = useState(parent?.content);
  console.log(content)
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.title}
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <TextInput
        placeholder="Content"
        style={styles.content}
        multiline={true}
        onChangeText={(text) => setContent(text)}
        value={content}
      />
      <View>
        <Text style={styles.error}>
          {content !== '' ? '' : 'The content cannot be empty'}
        </Text>
      </View>
      <View style={styles.buttonRow}>
        {onDelete
        ? (<Button
            disabled={loading}
            type="outline"
            buttonStyle={styles.deleteButton}
            icon={
              <Icon
                name="md-trash"
                size={18}
                color={Const.colors.red}
                type="ionicon"
              />
            }
            onPress={() => {
              Alert.alert(
                "Confirm deletion",
                "Are you sure you want to delete this message?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                      onDelete({
                        variables: {
                          userId: parent.user.id,
                          id: parent.id,
                        }
                      });
                    },
                  }
                ],
                { cancelable: false }
              );
            }}
          />
        )
        : (<View />)}
        <View style={styles.rightButtonGroup}>
          <Button
            disabled={loading}
            type="outline"
            title="Cancel"
            buttonStyle={styles.cancelButton}
            titleStyle={styles.cancelButtonText}
            onPress={onCancel}
          />
          <Button
            disabled={!content || loading}
            title="Publish"
            buttonStyle={styles.updateButton}
            titleStyle={styles.updateButtonText}
            onPress={() => onSubmit(content, title)}
          />
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    padding: 3,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Const.colors.lightGrey,
    borderRadius: 3,
    marginBottom: 5,
  },
  content: {
    padding: 3,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Const.colors.lightGrey,
    borderRadius: 3,
    height: 75,
  },
  error: {
    color: Const.colors.red,
    fontSize: 12
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  deleteButton: {
    borderColor: Const.colors.red,
    backgroundColor: 'white',
    height: 36,
    width: 36,
  },
  rightButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  cancelButton: {
    borderColor: Const.colors.primary,
    backgroundColor: 'white',
    marginRight: 8,
    height: 36,
  },
  cancelButtonText: {
    color: Const.colors.primary,
    fontSize: 14,
  },
  updateButton: {
    backgroundColor: Const.colors.primary,
    height: 36,
  },
  updateButtonText: {
    fontSize: 14,
    color: 'white',
  } 
});

Form.propTypes = {
  parent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
}

Form.defaultProps = {
  loading: false,
  parent: undefined,
  onDelete: undefined,
}

export default Form;
