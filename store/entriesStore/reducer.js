import {
  GET_ENTRIES_REQUEST,
  GET_ENTRIES_REQUEST_SUCCESS,
  GET_ENTRIES_REQUEST_FAIL,
  SYNC_REQUEST_SUCCESS,
  SET_ENTRY
} from './actions';
import { getDateDetails, compareDateDesc, diff } from '../../utils';
import produce from 'immer';
import { createReducer } from '../createReducer';

const initialState = {
  isLoading: false,
  loaded: false,
  dates: [],
  days: {},
  tags: {}
};

const actionHandlers = {
  [GET_ENTRIES_REQUEST]: produce((draft, action) => {
    draft.dates = action.dates;
    draft.isLoading = true;
    draft.loaded = false;
  }),
  [GET_ENTRIES_REQUEST_FAIL]: produce(draft => {
    draft.isLoading = false;
  }),
  [GET_ENTRIES_REQUEST_SUCCESS]: produce((draft, action) => {
    draft.isLoading = false;
    draft.days = action.days || {};
    draft.tags = action.tags || {};
    draft.loaded = true;
  }),
  [SET_ENTRY]: produce((draft, action) => {
    const { year, month, day, time } = getDateDetails();

    if (!action.dateTitle) {
      const dateTitle = `${year}/${month}/${day}`;

      if (!draft.days[dateTitle]) draft.days[dateTitle] = [];

      const id = String(time);

      draft.days[dateTitle].unshift({
        id,
        created: time,
        updated: null,
        dateTitle,
        content: action.entry.content,
        tags: action.entry.tags
      });

      action.entry.tags.forEach(tag => {
        draft.tags[tag] = [...(draft.tags[tag] || []), id];
      });
    } else {
      const entryToEdit = draft.days[action.dateTitle].find(
        day => day.id === action.id
      );

      if (!entryToEdit) {
        throw new Error('ERROR! Unable to find entry to edit');
      }

      entryToEdit.content = action.entry.content;
      entryToEdit.updated = time;

      const { toRemove, toAdd } = diff(
        entryToEdit.tags || [],
        action.entry.tags
      );

      toRemove.forEach(tagIndex => {
        draft.tags[entryToEdit.tags[tagIndex]] = draft.tags[
          entryToEdit.tags[tagIndex]
        ].filter(id => id !== entryToEdit.id);
      });

      toAdd.forEach(tagIndex => {
        draft.tags[action.entry.tags[tagIndex]] = [
          ...(draft.tags[action.entry.tags[tagIndex]] || []),
          entryToEdit.id
        ];
      });

      entryToEdit.tags = action.entry.tags;
    }
  }),
  [SYNC_REQUEST_SUCCESS]: produce(draft => {
    draft.dates = Object.keys(draft.days).sort(compareDateDesc);
  })
};

const reducer = createReducer(actionHandlers, initialState);

export default reducer;
