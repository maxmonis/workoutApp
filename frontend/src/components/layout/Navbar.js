import React, { useContext, useEffect } from 'react';
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
  const { clearClients, clearSelectedClient } = clientContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logUserOut();
    clearSelectedClient();
    clearClients();
  };

  const authLink = (
    <div className='link-container'>
      <Button onClick={handleLogout} color='inherit'>
        Logout
      </Button>
    </div>
  );

  const guestLinks = (
    <div className='link-container'>
      <Link to='login' className='link'>
        <Button color='inherit'>Sign In</Button>
      </Link>
      <Link to='register' className='link'>
        <Button color='inherit'>Get Started</Button>
      </Link>
    </div>
  );

  return (
    <div style={{ marginBottom: '10px' }}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/' className='link primary'>
            <Typography variant='h6' color='inherit'>
              workoutApp
            </Typography>
          </Link>
          {isAuthenticated ? authLink : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
