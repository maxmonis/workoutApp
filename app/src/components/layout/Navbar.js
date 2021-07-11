import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from '../layout/UI';
import AuthContext from '../../context/auth/authContext';
import ClientContext from '../../context/client/clientContext';

const Navbar = ({ dark, toggleDark }) => {
  const { isAuthenticated, logUserOut, loadUser, user } =
    useContext(AuthContext);
  const { getClients, clearClients } = useContext(ClientContext);
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    user ? getClients() : clearClients();
    // eslint-disable-next-line
  }, [user]);
  return (
    <header>
      {isAuthenticated ? (
        <>
          <button className='link' onClick={() => logUserOut()}>
            Logout
          </button>
          <Switch
            bool={!dark}
            toggle={toggleDark}
            tooltipContent={`Turn ${dark ? 'on' : 'off'} the lights`}
          />
        </>
      ) : (
        <>
          <Link to='login' className='link'>
            <button className='link'>Login</button>
          </Link>
          <Link to='register' className='link'>
            <button className='link'>Register</button>
          </Link>
        </>
      )}
    </header>
  );
};

export default Navbar;
