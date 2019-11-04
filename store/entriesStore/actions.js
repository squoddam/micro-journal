import { AsyncStorage } from 'react-native';
import { compareDateDesc } from '../../utils';

export const SET_ENTRY = 'SET_ENTRY';

export const GET_ENTRIES_REQUEST = 'GET_ENTRIES_REQUEST';
export const GET_ENTRIES_REQUEST_SUCCESS = 'GET_ENTRIES_REQUEST_SUCCESS';
export const GET_ENTRIES_REQUEST_FAIL = 'GET_ENTRIES_REQUEST_FAIL';

export const SYNC_REQUEST = 'SYNC_REQUEST';
export const SYNC_REQUEST_SUCCESS = 'SYNC_REQUEST_SUCCESS';
export const SYNC_REQUEST_FAIL = 'SYNC_REQUEST_FAIL';

const getAllDays = async () => {
  // await AsyncStorage.clear();
  const keys = await AsyncStorage.getAllKeys();

  const days = Object.fromEntries(
    (await AsyncStorage.multiGet(keys)).map(([title, data]) => [
      title,
      JSON.parse(data)
    ])
  );

  return {
    keys,
    days
  };
};

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

const syncWithDb = actionForSync => (...payload) => async (dispatch, getState) => {
  await dispatch(actionForSync(...payload));

  dispatch(syncRequest());

  try {
    const days = getState().entriesStore.data;

    await Promise.all(
      Object.keys(days).map(
        async dayTitle =>
          await AsyncStorage.setItem(dayTitle, JSON.stringify(days[dayTitle]))
      )
    );

    dispatch(syncRequestSuccess());
  } catch (e) {
    console.log('fuck');
  }
};

export const setEntry = syncWithDb((entry, dateTitle, id) => ({
  type: SET_ENTRY,
  entry,
  dateTitle,
  id
}));

export const getEntriesRequest = dates => ({
  type: GET_ENTRIES_REQUEST,
  dates
});

export const getEntriesRequestSuccess = entries => ({
  type: GET_ENTRIES_REQUEST_SUCCESS,
  entries
});

export const getEntriesRequestFail = error => ({
  type: GET_ENTRIES_REQUEST_FAIL,
  error
});

export const getEntries = () => async dispatch => {
  try {
    const { keys, days } = await getAllDays();

    await dispatch(getEntriesRequest(keys.slice().sort(compareDateDesc)));

    dispatch(getEntriesRequestSuccess(days || {}));
  } catch (e) {
    console.log('request fail', e);
    dispatch(getEntriesRequestFail(e));
  }
};
