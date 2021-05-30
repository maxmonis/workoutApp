import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useValidate from '../../hooks/useValidate';
import validateLogin from '../../validation/validateLogin';
import { Input, Spinner } from '../layout/UI';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = ({ history }) => {
  const { setAlert } = useContext(AlertContext);
  const { logUserIn, error, clearErrors, isAuthenticated, loading } =
    useContext(AuthContext);
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'critical');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);
  const INITIAL_STATE = {
    email: '',
    password: '',
  };
  const submitForm = () => {
    logUserIn({ email, password });
  };
  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidate(INITIAL_STATE, validateLogin, submitForm);
  const { email, password } = values;
  useEffect(() => {
    document.title = `maxWellness | Fitness First`;
    // eslint-disable-next-line
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div className='full-size auth'>
      <h1>Welcome Back!</h1>
      <h4>Enter your credentials</h4>
      <form noValidate onSubmit={handleSubmit}>
        <Input
          name='email'
          value={email}
          handleBlur={handleBlur}
          handleChange={handleChange}
          label='Email'
          error={errors.email}
        />
        <Input
          name='password'
          value={password}
          handleBlur={handleBlur}
          handleChange={handleChange}
          type='password'
          label='Password'
          error={errors.password}
        />
        <button className='btn one' type='submit'>
          Access Account
        </button>
      </form>
      <h6>Need an account?</h6>
      <Link to='register'>
        <button className='btn two'>Get started</button>
      </Link>
    </div>
  );
};

export default Login;
