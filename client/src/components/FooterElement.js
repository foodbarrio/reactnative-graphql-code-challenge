/**
 * Element in footer composed by an icon and some text
 */

import React from 'react';
import PropTypes from 'prop-types';
import Const from '../const';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';


const FooterElement = ({icon, text}) =>  (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
  }}>
    <Icon
      name={icon}
      size={20}
      color={Const.colors.grey}
      type="ionicon"
    />
    <Text style={styles.text}>
      {text}
    </Text>
</View>
);


const styles = StyleSheet.create({
  text: {
    marginLeft: 10
  },
});

FooterElement.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default FooterElement;
