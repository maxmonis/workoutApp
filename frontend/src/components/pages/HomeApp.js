import React, { useState, useContext, useEffect, Fragment } from 'react';

import ClientContext from '../../context/client/clientContext';

import ClientApp from '../clientComponents/ClientApp';
import ClientList from '../clientComponents/ClientList';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const HomeApp = () => {
  const clientContext = useContext(ClientContext);
  const { clients, filteredClients, getClients } = clientContext;
  useEffect(() => {
    getClients();
    // eslint-disable-next-line
  }, []);

  const activeClients = filteredClients.length
    ? filteredClients.filter(client => client.isActive)
    : clients.filter(client => client.isActive);
  const deletedClients = filteredClients.length
    ? filteredClients.filter(client => !client.isActive)
    : clients.filter(client => !client.isActive);

  const [isDisplayingDeletedClients, setIsDisplayingDeletedClients] = useState(
    false
  );
  const displayDeletedClients = () => {
    setIsDisplayingDeletedClients(true);
  };
  const hideDeletedClients = () => {
    setIsDisplayingDeletedClients(false);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
      }}
    >
      <div>
        <ClientApp />
        <Fragment>
          {activeClients.length > 0 && (
            <Paper style={{ width: '450px' }}>
              <Typography variant='h4'>Active Clients</Typography>
              <ClientList clients={activeClients} />
            </Paper>
          )}
          {!isDisplayingDeletedClients && deletedClients.length > 0 && (
            <Button onClick={displayDeletedClients}>
              Show Deleted Clients
            </Button>
          )}
        </Fragment>
        {(filteredClients.length > 0 || isDisplayingDeletedClients) &&
          deletedClients.length > 0 && (
            <Fragment>
              <Paper style={{ width: '450px', marginTop: '10px' }}>
                <Typography variant='h4'>Deleted Clients</Typography>
                <ClientList clients={deletedClients} />
              </Paper>
              <Button onClick={hideDeletedClients}>Hide Deleted Clients</Button>
            </Fragment>
          )}
      </div>
    </div>
  );
};

export default HomeApp;
