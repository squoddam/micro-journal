import React from 'react';
import PropTypes from 'prop-types';

import { View, StyleSheet } from 'react-native';
import Tag from './Tag';

const TagsContainer = ({ tags, onPress, handleOpenModal }) => (
  <View style={styles.container}>
    {tags.map((tag, i) => (
      <Tag key={`${tag}-${i}`} tag={tag} onPress={onPress} />
    ))}
    {handleOpenModal && <Tag isAdd onPress={handleOpenModal} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
});

TagsContainer.propTypes = {
  tags: PropTypes.array,
  onPress: PropTypes.func,
  handleOpenModal: PropTypes.func
};

export default TagsContainer;
