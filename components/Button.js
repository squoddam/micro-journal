import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewPropTypes
} from 'react-native';

const Button = ({
  title,
  onPress,
  containerStyle = {},
  buttonStyle = {},
  titleStyle = {}
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <TouchableOpacity
        onPress={onPress}
        style={StyleSheet.flatten([styles.button, buttonStyle])}
      >
        <Text style={StyleSheet.flatten([styles.title, titleStyle])}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  buttonStyle: ViewPropTypes.style,
  titleStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  button: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#512da8',
    borderWidth: 1
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Button;
