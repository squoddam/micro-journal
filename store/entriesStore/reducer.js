import {
  GET_ENTRIES_REQUEST,
  GET_ENTRIES_REQUEST_SUCCESS,
  GET_ENTRIES_REQUEST_FAIL,
  SYNC_REQUEST_SUCCESS,
  SET_ENTRY
} from './actions';
import { getDateDetails, compareDateDesc } from '../../utils';
import produce from 'immer';

const initialState = {
  isLoading: false,
  dates: [],
  data: {}
};

const actionHandlers = {
  [GET_ENTRIES_REQUEST]: produce((draft, action) => {
    draft.dates = action.dates;
    draft.isLoading = true;
  }),
  [GET_ENTRIES_REQUEST_FAIL]: produce(draft => {
    draft.isLoading = false;
  }),
  [GET_ENTRIES_REQUEST_SUCCESS]: produce((draft, action) => {
    draft.isLoading = false;
    draft.data = action.entries;
  }),
  [SET_ENTRY]: produce((draft, action) => {
    const { year, month, day, time } = getDateDetails();

    if (!action.dateTitle) {
      const dateTitle = `${year}/${month}/${day}`;

      if (!draft.data[dateTitle]) draft.data[dateTitle] = [];

      draft.data[dateTitle].unshift({
        id: String(time),
        created: time,
        updated: null,
        dateTitle,
        content: action.entry
      });
    } else {
      const entryToEdit = draft.data[action.dateTitle].find(
        day => day.id === action.id
      );

      if (!entryToEdit) {
        throw new Error('ERROR! Unable to find entry to edit');
      }

      entryToEdit.content = action.entry;
      entryToEdit.updated = time;
    }
  }),
  [SYNC_REQUEST_SUCCESS]: produce(draft => {
    draft.dates = Object.keys(draft.data).sort(compareDateDesc);
  })
};

const reducer = (state = initialState, action) => {
  const actionHandler = actionHandlers[action.type];

  if (!actionHandler) return state;

  return actionHandler(state, action);
};

export default reducer;
