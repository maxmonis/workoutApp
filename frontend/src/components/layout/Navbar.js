import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AuthContext from '../../context/auth/authContext';
import ClientContext from '../../context/client/clientContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const clientContext = useContext(ClientContext);
  const { isAuthenticated, logUserOut, loadUser, user } = authContext;
  const { getClients, clearClients } = clientContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (user) getClients();
    // eslint-disable-next-line
  }, [user]);
  const handleLogout = () => {
    logUserOut();
    clearClients();
  };
  const authLinks = (
    <Fragment>
      <Button onClick={handleLogout} color='inherit'>
        Logout
      </Button>
      <Link to='/' className='link'>
        <Button color='inherit'>Clients</Button>
      </Link>
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
