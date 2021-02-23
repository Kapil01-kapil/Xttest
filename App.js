import React, {Component} from 'react';

import StackNavigation from './src/navigation/navigation';
import {Provider} from 'react-redux';
import configureStore from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Platform} from 'react-native';

const store = configureStore();
let persistor = persistStore(store);
export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StackNavigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
