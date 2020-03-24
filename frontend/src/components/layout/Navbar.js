import React, { useContext, useEffect } from 'react';
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
  const { clearClients } = clientContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const clearSelectedClient = () => {
    window.localStorage.removeItem('selectedClient');
  };

  const handleLogout = () => {
    logUserOut();
    clearSelectedClient();
    clearClients();
  };

  const authLink = (
    <div style={{ marginLeft: 'auto', marginRight: '10px' }}>
      <Button onClick={handleLogout} color='inherit'>
        Logout
      </Button>
    </div>
  );

  const guestLinks = (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: '10px'
      }}
    >
      <Link to='login' style={{ textDecoration: 'none' }}>
        <Button style={{ color: 'white' }}>Log In</Button>
      </Link>
      <Link to='register' style={{ textDecoration: 'none' }}>
        <Button style={{ color: 'white' }}>Register</Button>
      </Link>
    </div>
  );

  return (
    <div style={{ marginBottom: '10px' }}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/' style={{ textDecoration: 'none', marginLeft: '10px' }}>
            <Typography variant='h6' style={{ color: 'white' }}>
              maxWellness
            </Typography>
          </Link>
          {isAuthenticated ? authLink : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
