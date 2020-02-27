import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' noWrap>
            maxWellness
          </Typography>
          <ul>
            <li style={{ float: 'right', marginLeft: '25px' }}>
              <Link to='/'>Home</Link>
            </li>
            <li style={{ float: 'right', marginLeft: '25px' }}>
              <Link to='about'>About</Link>
            </li>
            <li style={{ float: 'right', marginLeft: '25px' }}>
              <Link to='register'>Register</Link>
            </li>
            <li style={{ float: 'right', marginLeft: '25px' }}>
              <Link to='login'>Login</Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
