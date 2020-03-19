import React, { Fragment, useContext, useEffect } from 'react';

import ClientItem from './ClientItem';

import ClientContext from '../../context/client/clientContext';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

const Clients = ({ handleDisplayForm }) => {
  const clientContext = useContext(ClientContext);
  const { clients, filteredClients, getClients } = clientContext;
  useEffect(() => {
    getClients();
    // eslint-disable-next-line
  }, []);
  if (!clients.length) {
    return <Typography variant='h6'>Please add a client</Typography>;
  }
  return (
    <List>
      {filteredClients.length
        ? filteredClients.map((client, index) => (
            <Fragment key={client._id}>
              <ClientItem
                client={client}
                handleDisplayForm={handleDisplayForm}
              />
              {index < filteredClients.length - 1 && <Divider />}
            </Fragment>
          ))
        : clients.length > 0 &&
          clients.map((client, index) => (
            <Fragment key={client._id}>
              <ClientItem
                client={client}
                handleDisplayForm={handleDisplayForm}
              />
              {index < clients.length - 1 && <Divider />}
            </Fragment>
          ))}
    </List>
  );
};

export default Clients;
