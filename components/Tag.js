import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Tag = ({ tag, onPress, isBlock, isAdd }) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.touchable,
        blockStyle(isBlock),
        isAddStyle(isAdd)
      ])}
      onPress={() => onPress(tag)}
    >
      <Text style={StyleSheet.flatten([styles.text, isAddStyle(isAdd, true)])}>
        {isAdd ? 'Add +' : tag}
      </Text>
    </TouchableOpacity>
  );
};

Tag.propTypes = {
  tag: PropTypes.string,
  onPress: PropTypes.func,
  isBlock: PropTypes.bool,
  isAdd: PropTypes.bool
};

const blockStyle = isBlock =>
  isBlock
    ? {
        flex: 1,
        height: 48
      }
    : { flex: 0 };

const isAddStyle = (isAdd, isForText = false) => {
  if (isAdd) {
    if (isForText) {
      return {
        color: '#512da8'
      };
    }

    return {
      backgroundColor: 'white',
      borderColor: '#512da8',
      borderWidth: 2
    };
  }

  return {};
};

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
