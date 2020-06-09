import React, { useContext, useEffect, Fragment } from 'react';

import { Link } from 'react-router-dom';

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
  const { clearClients, clearSelectedClient } = clientContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logUserOut();
    clearClients();
    clearSelectedClient();
  };

  const authLinks = (
    <Fragment>
      <Button onClick={handleLogout} color='inherit'>
        Logout
      </Button>
      <Button onClick={clearSelectedClient} color='inherit'>
        Clients
      </Button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to='login' className='link'>
        <Button color='inherit'>Login</Button>
      </Link>
      <Link to='register' className='link'>
        <Button color='inherit'>Register</Button>
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <AppBar position='static'>
        <Toolbar>{isAuthenticated ? authLinks : guestLinks}</Toolbar>
      </AppBar>
      <Typography variant='h1'>workoutApp</Typography>
    </Fragment>
  );
};

export default Navbar;
