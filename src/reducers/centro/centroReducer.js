import * as actionTypes from '../../config/types';

import moment from 'moment';

const INITIAL_STATE = {
  isTyping: false,
  messages: [
    {
      _id: Math.round(Math.random() * 1000000),
      text: 'or you can type \'send AMOUNT eth\' to buy CEN tokens. What do you want to do?',
      createdAt: moment().toDate(),
      user: {
          _id: 2,
          name: 'Centro'
      }
    },
    {
      _id: Math.round(Math.random() * 1000000),
      text: 'Type \'import KEY\' to import your private key, \'balance\' to check your Ether balance or \'token\' to check your CEN token balance.',
      createdAt: moment().toDate(),
      user: {
          _id: 2,
          name: 'Centro'
      }
    },
    {
      _id: Math.round(Math.random() * 1000000),
      text: 'I am your wallet bot. Let\'s get started!',
      createdAt: moment().toDate(),
      user: {
          _id: 2,
          name: 'Centro'
      }
    }
  ],
};

const centroReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.BOT_MESSAGE_RECEIVED:
      return { ...state, isTyping: true };
    case actionTypes.BOT_MESSAGE_SENT:
      return { ...state, isTyping: false, messages: [action.payload, ...state.messages] };
    case actionTypes.BOT_ERROR:
      return { ...state, isTyping: false };

    case actionTypes.USER_MESSAGE_RECEIVED:
      return { ...state, isTyping: false };
    case actionTypes.USER_MESSAGE_SAVED:
      return { ...state, isTyping: false, messages: [action.payload, ...state.messages] };
    case actionTypes.USER_MESSAGE_ERROR:
      return { ...state, isTyping: false };

    default:
      return state;
  }
};

export default centroReducer;
