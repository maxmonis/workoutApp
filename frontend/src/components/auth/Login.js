import React, { useState, useContext, useEffect } from 'react';

import './auth.css';

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
    <Paper className='container'>
      <Typography variant='h3'>Login</Typography>
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
        {email && password ? (
          <Button type='submit' variant='outlined'>
            Login
          </Button>
        ) : (
          <Button deactivated='true' variant='outlined'>
            Login
          </Button>
        )}
        <div>
          <Typography variant='h6'>Don't have an account?</Typography>
          <Button>
            {' '}
            <Link to='register'>Get Started</Link>
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Login;
