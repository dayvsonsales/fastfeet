import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';

import './config/Reactotron';

import Routes from './routes';

import { store, persistor } from '~/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
