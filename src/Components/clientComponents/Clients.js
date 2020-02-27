import React, { Fragment, useContext } from 'react';
import ClientItem from './ClientItem';
import ClientContext from '../../context/client/clientContext';

const Clients = () => {
  const clientContext = useContext(ClientContext);
  const { clients, filteredClients } = clientContext;
  if (!clients.length) {
    return <h4>Please add a client</h4>;
  }
  return (
    <Fragment>
      {filteredClients !== null
        ? filteredClients.map(client => (
            <ClientItem client={client} key={client.id} />
          ))
        : clients.map(client => <ClientItem client={client} key={client.id} />)}
    </Fragment>
  );
};

export default Clients;
