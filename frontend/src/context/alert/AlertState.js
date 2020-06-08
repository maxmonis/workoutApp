import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import uuid from 'uuid/v4';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type, timeout = 3000) => {
    const id = uuid();
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type, id }
    });
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
