import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { View, TextInput, FlatList } from 'react-native';
import Tag from './Tag';
import { log } from '../utils';
const noop = () => {};
const DELIMETERS = [' ', ',', '.'];

const TagInput = ({
  suggestionsOnly,
  tags: propsTags = [],
  text: propsText = ' ',
  onChangeState = noop,
  suggestions = []
}) => {
  const [state, setState] = useState({
    tags: propsTags,
    text: propsText
  });

  useEffect(() => console.log(propsTags), [propsTags]);

  const handleChangeState = (text = state.text, tags = state.tags) => {
    setState({ text, tags });
    onChangeState({ text, tags });
  };

  const handleTextChange = inputText => {
    if (inputText.length === 0) {
      handleChangeState(' ', state.tags.slice(0, -1));
    } else if (
      !suggestionsOnly &&
      inputText.length > 1 &&
      DELIMETERS.includes(inputText.slice(-1)) &&
      !state.tags.includes(inputText.slice(0, -1).trim())
    ) {
      handleChangeState(' ', [...state.tags, inputText.slice(0, -1).trim()]);
    } else {
      handleChangeState(inputText);
    }
  };

  const handleAddSuggestion = tag =>
    handleChangeState(' ', [...state.tags, log(tag)]);

  return (
    <View
      style={{
        flex: 1,
        margin: 10
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          minHeight: 32,
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        {state.tags &&
          state.tags.map((tag, i) => <Tag key={`${tag}-${i}`} tag={tag} />)}

        <View
          style={{
            flex: 1,
            minWidth: 100,
            height: 32,
            margin: 4
          }}
        >
          <TextInput
            style={{
              margin: 0,
              padding: 0,
              paddingHorizontal: 12,
              flex: 1,
              height: 32,
              fontSize: 12,
              borderWidth: 1
            }}
            value={state.text}
            onChangeText={handleTextChange}
            placeholder="Your tags here..."
          />
        </View>
      </View>
      {state.text.length > 1 && suggestions.length > 0 && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            width: '100%',
            maxHeight: 160,
            zIndex: 10
          }}
        >
          <FlatList
            style={{
              width: '100%',
              flex: 1,
              padding: 10,
              zIndex: 10,
              position: 'relative'
            }}
            data={suggestions}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Tag tag={item} block onPress={handleAddSuggestion} />
            )}
            getItemLayout={(data, index) => ({
              length: 48,
              offset: 48 * index,
              index
            })}
          />
        </View>
      )}
    </View>
  );
};

TagInput.propTypes = {
  suggestionsOnly: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  onChangeState: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string)
};

export default TagInput;
