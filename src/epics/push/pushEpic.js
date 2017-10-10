import { Observable } from 'rxjs/Observable';
import * as actionTypes from '../../config/types';

const pushEpic = (action$, store, { pushMessage, botMessage }) => (
  action$
  .ofType(actionTypes.USER_MESSAGE_RECEIVED)
  .mergeMap( (action) => {
    return pushMessage(action.payload).map( (response) => {
      return {
        type: actionTypes.USER_MESSAGE_SAVED,
        payload: response
      };
    }).catch(() => {
      return Observable.of({
        type: actionTypes.USER_MESSAGE_ERROR,
      });
    });
  })
);

export default pushEpic;
