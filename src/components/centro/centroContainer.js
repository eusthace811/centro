import { connect } from 'react-redux';

import * as actionTypes from '../../config/types';
import CentroPage from './centroPage';

const mapStateToProps = ({ centroReducer }) => ({ ...centroReducer });

const mapDispatchToProps = dispatch => ({
  onMessage: (payload) => {
    dispatch({
      type: actionTypes.USER_MESSAGE_RECEIVED,
      payload: payload
    });
    dispatch({
      type: actionTypes.BOT_MESSAGE_RECEIVED,
      payload: payload
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CentroPage);
