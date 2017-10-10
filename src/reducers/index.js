import { combineReducers } from 'redux';

import centroReducer from './centro/centroReducer';

const rootReducer = combineReducers({
  centroReducer,
});

export default rootReducer;
