import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
  const handleLogout = () => {
    toggle();
    logUserOut();
  };
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
      <IconButton color='inherit' onClick={toggle}>
        <MenuIcon />
      </IconButton>
      <Link to='/' className='link'>
        <Button color='inherit'>{user ? user.name : 'Workouts'}</Button>
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
      <Typography variant='h2'>maxWellness</Typography>
      <Drawer open={isDrawerOpen} onClose={toggle}>
        <div className='drawer'>
          <AppBar position='static'>
            <Toolbar>
              <Button onClick={handleLogout} color='inherit'>
                Logout
              </Button>
              <IconButton
                onClick={toggle}
                color='inherit'
                style={{ margin: 'auto 0 auto auto' }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Typography variant='h3'>Roster</Typography>
          <Roster toggle={toggle} />
        </div>
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
