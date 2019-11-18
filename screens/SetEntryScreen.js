import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text, TextInput, StyleSheet } from 'react-native';

import { setEntry as setEntryAction } from '../store/entriesStore/actions';
import { getDateDetails } from '../utils';
import TagInput from '../components/TagInput';
import HeaderButton from '../components/HeaderButton';

const SetEntryScreen = ({ navigation }) => {
  const entryId = navigation.getParam('entryId');
  const dateTitle = navigation.getParam('dateTitle');

  const dispatch = useDispatch();
  const entriesStore = useSelector(store => store.entriesStore);

  const initialEntry =
    entriesStore.days[dateTitle] &&
    entriesStore.days[dateTitle].find(day => day.id === entryId);

  const [entry, setEntry] = useState(initialEntry ? initialEntry.content : '');
  const [tagsState, setTagsState] = useState(
    initialEntry
      ? { tags: initialEntry.tags, text: '' }
      : { tags: [], text: '' }
  );

  useEffect(() => {
    navigation.setParams({
      handleAddEntry: () => {
        dispatch(
          setEntryAction(
            { content: entry, tags: tagsState.tags },
            dateTitle,
            entryId
          )
        );
        setEntry('');
        navigation.navigate('EntriesScreen');
      }
    });
  }, [entry, tagsState.tags]);

  const createdDate = useMemo(
    () => (dateTitle ? getDateDetails(initialEntry.created) : null),
    [dateTitle]
  );
  const updatedDate = useMemo(
    () => (dateTitle ? getDateDetails(initialEntry.updated) : null),
    [dateTitle]
  );

  return (
    <View style={styles.container}>
      <View style={styles.tagInputContainer}>
        <TagInput
          onChangeState={tagsState => setTagsState(tagsState)}
          tags={tagsState.tags}
        />
      </View>
      <View style={styles.contentContainer}>
        {createdDate && (
          <Text
            style={StyleSheet.flatten([styles.date, styles.dateLeft])}
          >{`Created: ${createdDate.hours}:${createdDate.minutes}`}</Text>
        )}
        {updatedDate && (
          <Text
            style={StyleSheet.flatten([styles.date, styles.dateRight])}
          >{`Last updated: ${updatedDate.hours}:${updatedDate.minutes}`}</Text>
        )}
        <TextInput
          multiline
          style={styles.contentInput}
          onChangeText={text => setEntry(text)}
          placeholder="Enter your log here..."
          value={entry}
        />
      </View>
    </View>
  );
};

SetEntryScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f6',
    padding: 10,
    position: 'relative'
  },
  tagInputContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%'
  },
  contentContainer: {
    flex: 2,
    backgroundColor: 'white',
    padding: 10,
    paddingBottom: 30,
    borderRadius: 10,
    marginTop: 10,
    position: 'relative'
  },
  date: { position: 'absolute', bottom: 10, fontSize: 10 },
  dateLeft: { left: 10 },
  dateRight: { right: 10 },
  contentInput: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16
  }
});

const CancelHeaderButton = navigation => () => (
  <HeaderButton
    title="CANCEL"
    onPress={() => navigation.navigate('EntriesScreen')}
  />
);

const SaveHeaderButton = navigation => () => (
  <HeaderButton title="SAVE" onPress={navigation.getParam('handleAddEntry')} />
);

SetEntryScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: CancelHeaderButton(navigation),
  headerRight: SaveHeaderButton(navigation)
});

export default SetEntryScreen;
