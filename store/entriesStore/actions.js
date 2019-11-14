import { compareDateDesc } from '../../utils';
import { syncWithDB, getAllDays } from '../../database';

export const SET_ENTRY = 'SET_ENTRY';

export const GET_ENTRIES_REQUEST = 'GET_ENTRIES_REQUEST';
export const GET_ENTRIES_REQUEST_SUCCESS = 'GET_ENTRIES_REQUEST_SUCCESS';
export const GET_ENTRIES_REQUEST_FAIL = 'GET_ENTRIES_REQUEST_FAIL';

export const SYNC_REQUEST = 'SYNC_REQUEST';
export const SYNC_REQUEST_SUCCESS = 'SYNC_REQUEST_SUCCESS';
export const SYNC_REQUEST_FAIL = 'SYNC_REQUEST_FAIL';

export const syncRequest = () => ({
  type: SYNC_REQUEST
});

export const syncRequestSuccess = () => ({
  type: SYNC_REQUEST_SUCCESS
});

export const syncRequestFail = backup => ({
  type: SYNC_REQUEST_FAIL,
  backup
});

const syncWithDbDecorator = actionForSync => (...payload) => async (
  dispatch,
  getState
) => {
  await dispatch(actionForSync(...payload));

  dispatch(syncRequest());

  try {
    const { days, tags } = getState().entriesStore;

    syncWithDB(days, tags);

    dispatch(syncRequestSuccess());
  } catch (e) {
    console.log('fuck');
  }
};

export const setEntry = syncWithDbDecorator((entry, dateTitle, id) => ({
  type: SET_ENTRY,
  entry,
  dateTitle,
  id
}));

export const getEntriesRequest = dates => ({
  type: GET_ENTRIES_REQUEST,
  dates
});

export const getEntriesRequestSuccess = ({ days, tags }) => ({
  type: GET_ENTRIES_REQUEST_SUCCESS,
  days,
  tags
});

export const getEntriesRequestFail = error => ({
  type: GET_ENTRIES_REQUEST_FAIL,
  error
});

export const getEntries = () => async dispatch => {
  try {
    const { keys, days, tags } = await getAllDays();

    await dispatch(getEntriesRequest(keys.slice().sort(compareDateDesc)));

    dispatch(getEntriesRequestSuccess({ days, tags }));
  } catch (e) {
    console.log('request fail', e);
    dispatch(getEntriesRequestFail(e));
  }
};
