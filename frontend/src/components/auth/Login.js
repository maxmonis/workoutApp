import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { logUserIn, error, clearErrors, isAuthenticated } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlert('Please fill in all fields');
    } else {
      logUserIn({
        email,
        password,
      });
    }
  };

  return (
    <div>
      <Paper className='container'>
        <Typography variant='h4'>Welcome back!</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type='email'
              name='email'
              value={email}
              placeholder={'Email'}
              onChange={handleChange}
              required
              autoFocus
            />
            <Input
              type='password'
              name='password'
              value={password}
              placeholder={'Password'}
              onChange={handleChange}
              required
            />
          </div>
          <Button type='submit' color='primary'>
            Enter
          </Button>
        </form>
      </Paper>
      <h3>Need an account?</h3>
      <Link className='link' to={'register'}>
        Get started
      </Link>
    </div>
  );
};

export default Login;
