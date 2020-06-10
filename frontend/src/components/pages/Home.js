import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

const Home = (props) => {
  const clientContext = useContext(ClientContext);
  const { clients } = clientContext;
  const selectedClient = clients.find(
    (client) => client._id === props.match.params.id
  );
  return selectedClient ? <h1>{selectedClient.name}</h1> : 'Client not found';
};

export default Home;
