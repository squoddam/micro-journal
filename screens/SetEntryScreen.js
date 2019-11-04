import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { View, TextInput, StyleSheet } from 'react-native';
import Button from '../components/Button';

import { setEntry as setEntryAction } from '../store/entriesStore/actions';

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

  return (
    <View
      style={{
        flex: 1,
        height: 40,
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
