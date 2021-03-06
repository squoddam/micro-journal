import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

const Entry = ({
  entry: { id, dateTitle, content },
  navigation: { navigate }
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() =>
          navigate('SetEntryScreen', {
            entryId: id,
            dateTitle
          })
        }
      >
        <View style={styles.content}>
          <Text>{content}</Text>
        </View>
      </TouchableOpacity>
    </View>
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
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5
  },
  touchable: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default withNavigation(Entry);
