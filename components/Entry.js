import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

const Entry = ({
  entry: { id, dateTitle, content },
  navigation: { navigate }
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('SetEntryScreen', {
          entryId: id,
          dateTitle
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>{content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Entry.propTypes = {
  entry: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string,
    dateTitle: PropTypes.string
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginVertical: 15,
    width: '100%',
    flex: 1,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default withNavigation(Entry);
