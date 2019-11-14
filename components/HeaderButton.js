import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet } from 'react-native';
import Button from './Button';

const HeaderButton = ({ title, onPress }) => {
  return (
    <Button
      inverted
      containerStyle={styles.btn}
      buttonStyle={styles.btnStyle}
      title={title}
      onPress={onPress}
    />
  );
};

HeaderButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    marginHorizontal: 10
  },
  btnStyle: { padding: 5 }
});

export default HeaderButton;
