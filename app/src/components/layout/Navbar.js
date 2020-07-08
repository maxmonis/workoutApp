import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Roster from '../roster/Roster';
import AuthContext from '../../context/auth/authContext';
import ClientContext from '../../context/client/clientContext';
import useToggle from '../../hooks/useToggle';

const Navbar = () => {
  const { isAuthenticated, logUserOut, loadUser, user } = useContext(
    AuthContext
  );
  const { getClients, clearClients } = useContext(ClientContext);
  const [isDrawerOpen, toggle] = useToggle(false);
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    user ? getClients() : clearClients();
    // eslint-disable-next-line
  }, [user]);
  const authLinks = (
    <Fragment>
      <Button onClick={logUserOut} color='inherit'>
        Logout
      </Button>
      <Button onClick={toggle} color='inherit'>
        Clients
      </Button>
      <Link to='/' className='link'>
        <Button color='inherit'>{user && user.name}</Button>
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
      <Link to='/' className='link-title'>
        <Typography variant='h2'>maxWellness</Typography>
      </Link>
      <Drawer open={isDrawerOpen} onClose={toggle}>
        <Roster toggle={toggle} />
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
