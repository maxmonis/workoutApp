import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

const Login = props => {
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
    password: ''
  });
  const { email, password } = user;

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      setAlert('Please fill in all fields');
    } else {
      logUserIn({
        email,
        password
      });
    }
  };

  return (
    <Paper
      style={{
        margin: '100px auto',
        width: '300px',
        height: 'auto',
        padding: '25px'
      }}
    >
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type='email'
            name='email'
            value={email}
            placeholder={'Email'}
            onChange={handleChange}
            required
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
        <Button type='submit'>Login</Button>
        <div>
          <h3>Don't have an account?</h3>
          <Button>
            {' '}
            <Link to='register'>Sign Up</Link>
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Login;
