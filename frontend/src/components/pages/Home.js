import React, { useContext } from 'react';

import { Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

import ClientApp from './ClientApp';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  if (!isAuthenticated && !loading) return <Redirect to='/login' />;
  return <ClientApp />;
};

export default Home;
