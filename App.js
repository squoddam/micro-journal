import React from 'react';

import { Provider } from 'react-redux';
import store from './store';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EntriesScreen from './screens/EntriesScreen';
import SetEntryScreen from './screens/SetEntryScreen';

const RootStack = createStackNavigator(
  {
    EntriesScreen: { screen: EntriesScreen },
    SetEntryScreen: { screen: SetEntryScreen }
  },
  {
    initialRouteName: 'EntriesScreen'
  }
);

const Navigation = createAppContainer(RootStack);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
