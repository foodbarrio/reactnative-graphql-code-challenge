/**
 * Element found in post/comment footer composed by an icon and some text
 */

import React from 'react';
import PropTypes from 'prop-types';
import Const from '../const';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';


const FooterElement = ({icon, text, onPress, highlighted}) =>  (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={onPress ? 0.5 : 1}
  >
    <Icon
      name={icon}
      size={20}
      color={highlighted ? Const.colors.primary : Const.colors.grey}
      type="ionicon"
    />
    <Text style={styles.text}>
      {text}
    </Text>
</TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    color: Const.colors.darkGrey,
  },
});

FooterElement.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onPress: PropTypes.func,
  highlighted: PropTypes.bool,
}

FooterElement.defaultProps = {
  onPress: undefined,
  highlighted: false,
}

export default FooterElement;
