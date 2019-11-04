import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import entriesStoreReducer from './entriesStore/reducer';

const store = createStore(
  combineReducers({
    entriesStore: entriesStoreReducer
  }),
  applyMiddleware(thunkMiddleware)
);

export default store;
