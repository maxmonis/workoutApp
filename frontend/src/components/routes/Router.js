import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import Spinner from '../layout/Spinner';

const Router = (props) => {
  const clientContext = useContext(ClientContext);
  const { clients } = clientContext;
  const selectedClient = clients.find(
    (client) => client._id === props.match.params.id
  );
  return selectedClient ? (
    <div>
      <h1>{selectedClient.name}</h1>
    </div>
  ) : (
    <Spinner />
  );
};

export default Router;
