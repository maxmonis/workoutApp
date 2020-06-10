import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import Spinner from '../layout/Spinner';

const Home = (props) => {
  const clientContext = useContext(ClientContext);
  const { clients } = clientContext;
  const selectedClient = clients.find(
    (client) => client._id === props.match.params.id
  );
  if (!selectedClient) return <Spinner />;
  return (
    <div>
      <h1>{selectedClient.name}</h1>
    </div>
  );
};

export default Home;
