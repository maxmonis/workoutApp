import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../functions/setAuthToken';

const AuthState = ({ children }) => {
  const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  const CONFIG = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const { token, isAuthenticated, loading, user, error } = state;
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: 'USER_LOADED', payload: res.data });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };
  const registerUser = async formData => {
    try {
      const res = await axios.post('/api/users', formData, CONFIG);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: 'REGISTER_FAILURE', payload: err.response.data.msg });
    }
  };
  const logUserIn = async formData => {
    try {
      const res = await axios.post('/api/auth', formData, CONFIG);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data.msg });
    }
  };
  const logUserOut = () => {
    dispatch({ type: 'LOG_USER_OUT' });
  };
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });
  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        user,
        error,
        loadUser,
        registerUser,
        logUserIn,
        logUserOut,
        clearErrors,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
