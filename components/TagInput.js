import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { View, TextInput, FlatList, Modal, StyleSheet } from 'react-native';
import Tag from './Tag';
import Button from './Button';
import TagsContainer from './TagsContainer';
import useSuggestions from '../hooks/useSuggestions';

const noop = () => {};
const DELIMETERS = [' ', ',', '.'];

const TagInput = ({
  suggestionsOnly,
  tags: propsTags = [],
  text: propsText = '',
  onChangeState = noop
}) => {
  const [state, setState] = useState({
    tags: propsTags,
    text: propsText
  });

  const suggestions = useSuggestions(state.tags, state.text);

  const [showModal, setShowModal] = useState(false);

  const handleChangeState = (text = state.text, tags = state.tags) => {
    setState({ text, tags });
    onChangeState({ text, tags });
  };

  const handleTextChange = inputText => {
    if (
      !suggestionsOnly &&
      inputText.length > 1 &&
      DELIMETERS.includes(inputText.slice(-1)) &&
      !state.tags.includes(inputText.slice(0, -1).trim())
    ) {
      handleChangeState('', [...state.tags, inputText.slice(0, -1).trim()]);
    } else {
      handleChangeState(inputText);
    }
  };

  const handleAddSuggestion = tag =>
    handleChangeState(state.text, [...state.tags, tag]);

  const handleRemoveTag = tag =>
    handleChangeState(
      state.text,
      state.tags.filter(t => t !== tag)
    );

  const handleToggleModal = useCallback(() => {
    setState(prevState => ({ text: '', tags: prevState.tags }));
    setShowModal(state => !state);
  }, [setShowModal]);

  return (
    <View style={styles.container}>
      {state.tags && (
        <TagsContainer
          tags={state.tags}
          onPress={handleRemoveTag}
          handleOpenModal={handleToggleModal}
        />
      )}

      <Modal animationType="slide" transparent visible={showModal}>
        <View style={styles.modalBack}>
          <View style={styles.modalContainer}>
            {state.tags && (
              <TagsContainer tags={state.tags} onPress={handleRemoveTag} />
            )}
            <TextInput
              autoFocus
              style={styles.input}
              value={state.text}
              onChangeText={handleTextChange}
              placeholder="Add tag here..."
            />
            <FlatList
              keyboardShouldPersistTaps="always"
              style={styles.suggestions}
              data={suggestions}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Tag tag={item} isBlock onPress={handleAddSuggestion} />
              )}
              getItemLayout={(data, index) => ({
                length: 64,
                offset: 64 * index,
                index
              })}
            />
            <Button
              containerStyle={styles.btnContainerStyle}
              buttonStyle={styles.btnStyle}
              inverted
              title="Done"
              onPress={handleToggleModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  modalBack: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    padding: 10
  },
  modalContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },
  input: {
    margin: 0,
    padding: 0,
    paddingHorizontal: 10,
    height: 32,
    fontSize: 12,
    borderBottomWidth: 1,
    marginVertical: 10
  },
  suggestions: {
    width: '100%',
    flex: 1,
    padding: 10,
    position: 'relative'
  },
  btnContainerStyle: {
    alignSelf: 'flex-end',
    width: '100%'
  },
  btnStyle: {
    padding: 5,
    height: 32
  }
});

TagInput.propTypes = {
  suggestionsOnly: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  onChangeState: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string)
};

export default TagInput;
