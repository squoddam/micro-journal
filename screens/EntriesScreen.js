import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, SectionList, StyleSheet } from 'react-native';
import Entry from '../components/Entry';
import Button from '../components/Button';
import { getEntries } from '../store/entriesStore/actions';
import HeaderButton from '../components/HeaderButton';
import TagInput from '../components/TagInput';

const EntriesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const entriesStore = useSelector(store => store.entriesStore);
  const [showFilter, setShowFilter] = useState(false);
  const [filterTags, setFilterTags] = useState([]);

  useEffect(() => {
    if (!entriesStore.loaded) dispatch(getEntries());

    navigation.setParams({
      toggleShowFilter: () => setShowFilter(state => !state)
    });
  }, []);

  const sections = useMemo(
    () =>
      entriesStore.dates
        .map(title => {
          if (showFilter && filterTags.length > 0) {
            const filteredDays = (entriesStore.days[title] || []).filter(day =>
              filterTags.some(fTag => entriesStore.tags[fTag].includes(day.id))
            );

            return {
              title,
              data: filteredDays
            };
          }

          return {
            title,
            data: entriesStore.days[title] || []
          };
        })
        .filter(section => section.data.length > 0),
    [entriesStore.dates, entriesStore.days, entriesStore.tags, filterTags]
  );

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        showFilter ? { paddingTop: 0 } : {}
      ])}
    >
      {showFilter && (
        <View style={styles.filterContainer}>
          <TagInput
            tags={filterTags}
            onChangeState={({ tags }) => setFilterTags(tags)}
          />
        </View>
      )}
      <SectionList
        inverted
        style={styles.sectionList}
        sections={sections}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Entry entry={item} />}
        renderSectionFooter={({ section: { title } }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
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
    onPress={navigation.getParam('toggleShowFilter')}
  />
);

EntriesScreen.navigationOptions = ({ navigation }) => ({
  headerRight: FilterHeaderButton(navigation)
});

EntriesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  },
  filterContainer: {
    flex: 0,
    flexShrink: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  sectionList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 30
  },
  section: {
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    marginVertical: 30,
    width: 100,
    alignSelf: 'center'
  },
  sectionTitle: { textAlign: 'center' }
});

export default EntriesScreen;
