import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { View, Text, TextInput } from "react-native";

import { setEntry as setEntryAction } from "../store/entriesStore/actions";
import { getDateDetails } from "../utils";
import TagInput from "../components/TagInput";
import HeaderButton from "../components/HeaderButton";
import useSuggestions from "../hooks/useSuggestions";

const SetEntryScreen = ({ navigation }) => {
  const entryId = navigation.getParam("entryId");
  const dateTitle = navigation.getParam("dateTitle");

  const dispatch = useDispatch();
  const entriesStore = useSelector(store => store.entriesStore);

  const initialEntry =
    entriesStore.days[dateTitle] &&
    entriesStore.days[dateTitle].find(day => day.id === entryId);

  const [entry, setEntry] = useState(initialEntry ? initialEntry.content : "");
  const [tagsState, setTagsState] = useState(
    initialEntry
      ? { tags: initialEntry.tags, text: "" }
      : { tags: [], text: "" }
  );

  const suggestions = useSuggestions(tagsState.tags, tagsState.text);

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
        setEntry("");
        navigation.navigate("EntriesScreen");
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#ede7f6",
        paddingHorizontal: 30,
        position: "relative"
      }}
    >
      <View
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: "white",
          // padding: 30,
          borderRadius: 10,
          marginVertical: 15,
          zIndex: 10,
          width: "100%"
        }}
      >
        <TagInput
          onChangeState={tagsState => setTagsState(tagsState)}
          tags={tagsState.tags}
          suggestions={suggestions}
        />
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: "white",
          padding: 30,
          borderRadius: 10,
          marginVertical: 15,
          position: "relative",
          zIndex: -1
        }}
      >
        {createdDate && (
          <Text
            style={{ position: "absolute", top: 10, left: 20, fontSize: 10 }}
          >{`Created: ${createdDate.hours}:${createdDate.minutes}`}</Text>
        )}
        {updatedDate && (
          <Text
            style={{ position: "absolute", top: 10, right: 20, fontSize: 10 }}
          >{`Last updated: ${updatedDate.hours}:${updatedDate.minutes}`}</Text>
        )}
        <TextInput
          multiline
          style={{
            flex: 1,
            textAlignVertical: "top",
            fontSize: 16,
            zIndex: -10
          }}
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

const CancelHeaderButton = navigation => () => (
  <HeaderButton
    title="CANCEL"
    onPress={() => navigation.navigate("EntriesScreen")}
  />
);

const SaveHeaderButton = navigation => () => (
  <HeaderButton title="SAVE" onPress={navigation.getParam("handleAddEntry")} />
);

SetEntryScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: CancelHeaderButton(navigation),
  headerRight: SaveHeaderButton(navigation)
});

export default SetEntryScreen;
