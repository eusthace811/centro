import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { pushMessage, botMessage } from './services/bot';
import 'rxjs';

import rootEpic from './epics';
import rootReducer from './reducers';

import CentroContainer from './components/centro/centroContainer';

const logger = createLogger({ predicate: () => __DEV__ });
const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: { pushMessage: pushMessage, botMessage: botMessage }
});

const middleware = applyMiddleware(logger, epicMiddleware);
const store = createStore(rootReducer, {}, compose(middleware));

const App = () => (
  <Provider store={store}>
    <CentroContainer />
  </Provider>
);

export default App;