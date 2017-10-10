import { combineEpics } from 'redux-observable';

import pushEpic from './push/pushEpic';
import messageEpic from './message/messageEpic';

const epics = [
  pushEpic,
  messageEpic
];

const rootEpic = combineEpics(...epics);

export default rootEpic;