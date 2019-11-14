import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Tag = ({ tag, onPress, block }) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.touchable, blockStyle(block)])}
      onPress={() => onPress(tag)}
    >
      <Text style={styles.text}>{tag}</Text>
    </TouchableOpacity>
  );
};

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  block: PropTypes.bool
};

const blockStyle = isBlock => ({
  flex: isBlock ? 1 : 0
});

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#512da8',
    borderRadius: 10,
    padding: 12,
    height: 32,
    margin: 4,
    zIndex: 10
  },
  text: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Tag;
