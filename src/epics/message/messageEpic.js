import { Observable } from 'rxjs/Observable';
import * as actionTypes from '../../config/types';

const messageEpic = (action$, store, { pushMessage, botMessage }) => (
  action$
  .ofType(actionTypes.BOT_MESSAGE_RECEIVED)
  .mergeMap( (action) => {
    return botMessage(action.payload).map( (response) => {
      return {
        type: actionTypes.BOT_MESSAGE_SENT,
        payload: response
      };
    }).catch(() => {
      return Observable.of({
        type: actionTypes.BOT_MESSAGE_ERROR,
      });
    });
  })
);

export default messageEpic;
