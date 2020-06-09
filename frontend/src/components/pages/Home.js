import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import ClientApp from '../client/ClientApp';

const Home = () => {
  const clientContext = useContext(ClientContext);
  const { selectedClient } = clientContext;
  return selectedClient ? <h1>{selectedClient.name}</h1> : <ClientApp />;
};

export default Home;
