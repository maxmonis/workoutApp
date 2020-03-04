import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ClientContext from '../../context/client/clientContext';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const clientContext = useContext(ClientContext);
  const { isAuthenticated, logUserOut, user } = authContext;
  const { clearClients } = clientContext;
  const handleLogout = () => {
    logUserOut();
    clearClients();
  };
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href='#!' onClick={handleLogout}>
          Logout
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='register'>Register</Link>
      </li>
      <li>
        <Link to='login'>Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' noWrap>
            maxWellness
          </Typography>
          <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
