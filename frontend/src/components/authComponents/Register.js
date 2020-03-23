import React, { useState, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { registerUser, error, clearErrors, isAuthenticated } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'User already exists') {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = user;

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email || !password) {
      setAlert('Please fill out all fields');
    } else if (password !== password2) {
      setAlert('Passwords must match');
    } else {
      registerUser({ name, email, password });
    }
  };

  return (
    <Paper
      style={{
        margin: 'auto',
        width: '250px',
        height: 'auto',
        padding: '20px'
      }}
    >
      <Typography variant='h3'>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type='text'
            name='name'
            value={name}
            placeholder={'Username'}
            onChange={handleChange}
            required
            autoFocus
          />
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
            minLength='6'
          />
          <Input
            type='password'
            name='password2'
            value={password2}
            placeholder={'Confirm Password'}
            onChange={handleChange}
            required
          />
        </div>
        {email && password && password === password2 && (
          <Button type='submit' variant='outlined'>
            Register
          </Button>
        )}
      </form>
      <div>
        <Typography variant='h6'>Already a member?</Typography>
        <Button>
          {' '}
          <Link to='login'>Sign In</Link>
        </Button>
      </div>
    </Paper>
  );
};

export default Register;
