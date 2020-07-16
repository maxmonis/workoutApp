import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import About from '../layout/About';
import Spinner from '../layout/Spinner';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const { setAlert } = useContext(AlertContext);
  const {
    registerUser,
    error,
    clearErrors,
    isAuthenticated,
    loading,
  } = useContext(AuthContext);
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
    password2: '',
  });
  const { name, email, password, password2 } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setAlert('Please fill out all fields');
    } else if (password !== password2) {
      setAlert('Passwords must match');
    } else if (password.length < 6) {
      setAlert('Password must have at least 6 characters');
    } else {
      registerUser({ name, email, password });
    }
  };
  useEffect(() => {
    document.title = `maxWellness | Fitness First`;
    // eslint-disable-next-line
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div className='page'>
      <Typography variant='h4'>Welcome!</Typography>
      <Typography variant='h6'>Create your free account</Typography>
      <Paper className='paper narrow'>
        <form className='form' onSubmit={handleSubmit}>
          <div>
            <Input
              type='text'
              name='name'
              value={name}
              placeholder={'Username'}
              onChange={handleChange}
              required
              autoFocus={true}
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
          <Button type='submit' color='primary'>
            Create Account
          </Button>
        </form>
      </Paper>
      <h3>Already a member?</h3>
      <Link className='link' to='login'>
        <Button color='inherit'>Sign in</Button>
      </Link>
      <About />
    </div>
  );
};

export default Register;
