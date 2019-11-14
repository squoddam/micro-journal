import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewPropTypes
} from 'react-native';

const invert = (variants, propName, isInverted) => ({
  [propName]: variants[Number(isInverted)]
});

const variants = ['white', '#512da8'];

const Button = ({
  title,
  onPress,
  containerStyle = {},
  buttonStyle = {},
  titleStyle = {},
  inverted = false
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <TouchableOpacity
        onPress={onPress}
        style={StyleSheet.flatten([
          styles.button,
          buttonStyle,
          invert(variants, 'backgroundColor', !inverted)
        ])}
      >
        <Text
          style={StyleSheet.flatten([
            styles.title,
            titleStyle,
            invert(variants, 'color', inverted)
          ])}
        >
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
  titleStyle: ViewPropTypes.style,
  inverted: PropTypes.bool
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
    backgroundColor: '#512da8'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Button;
