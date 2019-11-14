import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, SectionList, StyleSheet } from 'react-native';
import Entry from '../components/Entry';
import Button from '../components/Button';
import { getEntries } from '../store/entriesStore/actions';
import HeaderButton from '../components/HeaderButton';

const EntriesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const entriesStore = useSelector(store => store.entriesStore);

  useEffect(() => {
    if (!entriesStore.loaded) dispatch(getEntries());
  }, []);

  const sections = useMemo(() =>
    entriesStore.dates.map(title => ({
      title,
      data: entriesStore.days[title] || []
    }))
  );

  return (
    <View style={styles.container}>
      <SectionList
        inverted
        style={{
          width: '100%',
          flex: 1,
          paddingHorizontal: 30,
          marginBottom: 30
        }}
        sections={sections}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Entry entry={item} />}
        renderSectionFooter={({ section: { title } }) => (
          <View
            style={{
              padding: 10,
              backgroundColor: 'white',
              elevation: 5,
              borderRadius: 10,
              marginVertical: 30,
              width: 100,
              alignSelf: 'center'
            }}
          >
            <Text style={{ textAlign: 'center' }}>{title}</Text>
          </View>
        )}
      />
      <Button
        title="ADD ENTRY"
        onPress={() => navigation.navigate('SetEntryScreen')}
      />
    </View>
  );
};


const FilterHeaderButton = navigation => () => (
  <HeaderButton
    title="FILTER"
    onPress={() => navigation.navigate('FilterScreen')}
  />
);

EntriesScreen.navigationOptions = ({ navigation }) => ({
  headerRight: FilterHeaderButton(navigation)
});

EntriesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  }
});

export default EntriesScreen;
