import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

import AuthContext from '../../context/auth/authContext';
import ClientContext from '../../context/client/clientContext';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const clientContext = useContext(ClientContext);
  const { isAuthenticated, logUserOut, loadUser } = authContext;
  const { clearClients } = clientContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logUserOut();
    clearClients();
  };

  const authLink = (
    <div className='right'>
      <Button onClick={handleLogout} color='inherit'>
        Logout
      </Button>
    </div>
  );

  const guestLinks = (
    <div className='right'>
      <Link to='login' className='link'>
        <Button color='inherit'>Login</Button>
      </Link>
      <Link to='register' className='link'>
        <Button color='inherit'>Register</Button>
      </Link>
    </div>
  );

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>{isAuthenticated ? authLink : guestLinks}</Toolbar>
      </AppBar>
      <Typography variant='h1' className='title'>
        workoutApp
      </Typography>
    </div>
  );
};

export default Navbar;
