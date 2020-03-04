import React, { Fragment, useContext, useEffect } from 'react';

import ClientItem from './ClientItem';

import ClientContext from '../../context/client/clientContext';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

const Clients = () => {
  const clientContext = useContext(ClientContext);
  const { clients, filteredClients, getClients } = clientContext;
  useEffect(() => {
    getClients();
    // eslint-disable-next-line
  }, []);
  if (!clients.length) {
    return <h4>Please add a client</h4>;
  }
  return (
    <Paper>
      <List>
        {filteredClients.length
          ? filteredClients.map((client, i) => (
              <Fragment>
                <ClientItem client={client} key={client._id} />
                {i < filteredClients.length - 1 && <Divider />}
              </Fragment>
            ))
          : clients.length > 0 &&
            clients.map((client, i) => (
              <Fragment>
                <ClientItem client={client} key={client._id} />
                {i < clients.length - 1 && <Divider />}
              </Fragment>
            ))}
      </List>
    </Paper>
  );
};

export default Clients;
