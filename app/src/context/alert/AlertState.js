import React, { useReducer } from 'react';
import uuid from 'uuid/v4';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

const AlertState = ({ children }) => {
  const INITIAL_STATE = [];
  const [state, dispatch] = useReducer(alertReducer, INITIAL_STATE);
  const setAlert = (msg, type, timeout = 3000) => {
    const id = uuid();
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type, id },
    });
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout);
  };
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
