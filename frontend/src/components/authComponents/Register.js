import React, { useState, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

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
    <div style={{ marginTop: '200px' }}>
      <h1>Register New Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <Input
            type='text'
            name='name'
            value={name}
            onChange={handleChange}
            required
          />
          <label htmlFor='email'>Email</label>
          <Input
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
          <label htmlFor='password'>Password</label>
          <Input
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            required
            minLength='6'
          />
          <label htmlFor='password2'>Confirm Password</label>
          <Input
            type='password'
            name='password2'
            value={password2}
            onChange={handleChange}
            required
          />
        </div>
        <Button type='submit'>Register</Button>
      </form>
      <div>
        <h3>Already a member?</h3>
        <Button>
          {' '}
          <Link to='login'>Log In to Account</Link>
        </Button>
      </div>
    </div>
  );
};

export default Register;
