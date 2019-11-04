import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../components/Button';

import { setEntry as setEntryAction } from '../store/entriesStore/actions';
import { getDateDetails } from '../utils';

const SetEntryScreen = ({ navigation }) => {
  const entryId = navigation.getParam('entryId');
  const dateTitle = navigation.getParam('dateTitle');

  const dispatch = useDispatch();
  const entriesStore = useSelector(store => store.entriesStore);

  const initialEntry =
    entriesStore.data[dateTitle] &&
    entriesStore.data[dateTitle].find(day => day.id === entryId);

  const [entry, setEntry] = useState(initialEntry ? initialEntry.content : '');

  const handleAddEntry = useCallback(() => {
    dispatch(setEntryAction(entry, dateTitle, entryId));
    setEntry('');
    navigation.navigate('EntriesScreen');
  });

  const createdDate = useMemo(
    () => (dateTitle ? getDateDetails(initialEntry.created) : null),
    [dateTitle]
  );
  const updatedDate = useMemo(
    () => (dateTitle ? getDateDetails(initialEntry.updated) : null),
    [dateTitle]
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ede7f6',
        paddingHorizontal: 30
      }}
    >
      <View
        style={{
          flex: 2,
          backgroundColor: 'white',
          padding: 30,
          borderRadius: 10,
          marginVertical: 15
        }}
      >
        {createdDate && (
          <Text
            style={{ position: 'absolute', top: 10, left: 20, fontSize: 10 }}
          >{`Created: ${createdDate.hours}:${createdDate.minutes}`}</Text>
        )}
        {updatedDate && (
          <Text
            style={{ position: 'absolute', top: 10, right: 20, fontSize: 10 }}
          >{`Last updated: ${updatedDate.hours}:${updatedDate.minutes}`}</Text>
        )}
        <TextInput
          multiline
          style={{ flex: 1, textAlignVertical: 'top', fontSize: 16 }}
          onChangeText={text => setEntry(text)}
          placeholder="Enter your log here..."
          value={entry}
        />
      </View>
      <View style={styles.btnsContainer}>
        <Button
          containerStyle={styles.btn}
          title="CANCEL"
          onPress={() => navigation.navigate('EntriesScreen')}
        />
        <Button
          containerStyle={styles.btn}
          title="SAVE"
          onPress={handleAddEntry}
        />
      </View>
    </View>
  );
};

SetEntryScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    marginHorizontal: 10
  },
  btnsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default SetEntryScreen;
