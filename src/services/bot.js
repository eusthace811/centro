import { Observable } from 'rxjs/Observable';
import { web3, privateKeyToAccount, getEthBalance, getTokensBalance, signTransaction } from './wallet';
import moment from 'moment';
import * as constants from '../config/constants';

const config = require('../config/config.json');

const responses = [
    {
        messages: '(hi|hello|hey|hola|howdy)(\\s|!|\\.|$)',
        response: 'Um... hi?'
    },
    {
        messages: '(what[^ ]* up|sup|how are you)',
        response: 'This github thing is pretty cool, huh?'
    },
    {
        messages: '(l(ol)+|(ha)+(h|$)|lmao)',
        response: 'What\'s so funny? :|'
    },
    {
        messages: '^no+(\\s|!|\\.|$)',
        response: 'Don\'t be so negative :('
    },
    {
        messages: '(cya|bye|see ya|ttyl|talk to you later)',
        response: 'Alright, see you around'
    },
    {
        messages: '(dumb|stupid|is that all)',
        response: 'Hey, I\'m just a proof of concept!'
    },
    {
        messages: 'noop',
        response: 'No, no'
    },
    {
        messages: /^import\s([a-z0-9]+)/,
        action: constants.ACTION_IMPORT_KEY,
        response: 'Great! Account successfully imported! Type \'balance\' to check your Ether balance or \'token\' to check your CEN token balance.'
    },
    {
        messages: /^balance/,
        action: constants.ACTION_BALANCE_ETH,
        response: 'Your balance is '
    },
    {
        messages: /^token/,
        action: constants.ACTION_BALANCE_TOKENS,
        response: 'Your CEN balance is '
    },
    {
        messages: /^send\s([0-9]+)\seth/,
        action: constants.ACTION_BUY_TOKENS,
        response: 'Ohh, thank you! You\'ve sent '
    }
];

export const pushMessage = (message) => {
    console.log('pushMessage', message);
    return Observable.of({
        _id: Math.round(Math.random() * 1000000),
        text: message[0].text,
        createdAt: moment().toDate(),
        user: {
            _id: 1
        }
    });
};

const match = (input, regex) => {
    return new RegExp(regex).test(input.toLowerCase());
};

const extractPrivateKey = (input) => {
    return /^import\s([a-z0-9]+)/.exec(input.toLowerCase())[1];
};

const extractAmount = (input) => {
    return /^send\s([0-9]+)\seth/.exec(input.toLowerCase())[1];
};

const defaultMessage = (message) => {
    return  Observable.of({
        _id: Math.round(Math.random() * 1000000),
        text: message[0].text + ' what?',
        createdAt: moment().toDate(),
        user: {
            _id: 2,
            name: 'Centro'
        }
    }).delay(1000);
};

export const botMessage = (message) => {
    let response = '', action = '';
    if ( !message instanceof Array || message.length < 1) { return defaultMessage(message); }
    
    for ( var i = 0; i < responses.length; i++ ) {
        if( match(message[0].text, responses[i].messages) ) {
            response =  responses[i].response || '';
            action = responses[i].action || '';
            break;
        }
    }

    if ( action !== '' ) {

        switch (action) {
            case constants.ACTION_IMPORT_KEY:
              return privateKeyToAccount( extractPrivateKey(message[0].text) ).delay(1400).map( () => {
                return {
                    _id: Math.round(Math.random() * 1000000),
                    text: response,
                    createdAt: moment().toDate(),
                    user: {
                        _id: 2,
                        name: 'Centro'
                    }
                };
              });
              
            case constants.ACTION_BALANCE_ETH:
                return getEthBalance().map( (balance) => {
                    balance = web3.fromWei( parseInt(balance.toString()), 'ether');
                    return {
                        _id: Math.round(Math.random() * 1000000),
                        text: response + balance,
                        createdAt: moment().toDate(),
                        user: {
                            _id: 2,
                            name: 'Centro'
                        }
                    };
                });

            case constants.ACTION_BALANCE_TOKENS:
                return getTokensBalance().map( (token) => {
                    token = token[0].toString();
                    return {
                        _id: Math.round(Math.random() * 1000000),
                        text: response + token,
                        createdAt: moment().toDate(),
                        user: {
                            _id: 2,
                            name: 'Centro'
                        }
                    };
                });

            case constants.ACTION_BUY_TOKENS:
                const amount = extractAmount(message[0].text);
                return signTransaction(amount).map( (hash) => {
                    return {
                        _id: Math.round(Math.random() * 1000000),
                        text: `${response} ${amount} eth to the contract. Later you can check your CEN token balance.`,
                        createdAt: moment().toDate(),
                        user: {
                            _id: 2,
                            name: 'Centro'
                        }
                    };
                });
                
        }

    } else if (response !== '') {
        return Observable.of({
            _id: Math.round(Math.random() * 1000000),
            text: response,
            createdAt: moment().toDate(),
            user: {
                _id: 2,
                name: 'Centro'
            }
        }).delay(1400);
    }
    
    return defaultMessage(message);
};

//////////////////////////////////////////////////////////////////////////////
