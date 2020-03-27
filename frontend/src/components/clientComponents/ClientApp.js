import React, { useState, useContext, useEffect, Fragment } from 'react';

import ClientContext from '../../context/client/clientContext';

import ClientFilter from './ClientFilter';
import ClientForm from './ClientForm';
import ClientList from './ClientList';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';

const ClientApp = ({ clients, selectClient, hideRoster }) => {
  const clientContext = useContext(ClientContext);
  const { filteredClients, editingClient, clearEditingClient } = clientContext;

  const activeClients = filteredClients.length
    ? filteredClients.filter(client => client.isActive) || []
    : clients.filter(client => client.isActive) || [];

  const deletedClients = filteredClients.length
    ? filteredClients.filter(client => !client.isActive) || []
    : clients.filter(client => !client.isActive) || [];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const addNewClient = () => {
    clearEditingClient();
    openDialog();
  };

  useEffect(() => {
    editingClient ? setIsDialogOpen(true) : setIsDialogOpen(false);
  }, [editingClient]);
  useEffect(() => {
    if (filteredClients.length && !isDisplayingDeletedClients) {
      showDeletedClients();
    }
    if (!filteredClients.length && isDisplayingDeletedClients) {
      hideDeletedClients();
    }
    // eslint-disable-next-line
  }, [filteredClients]);
  useEffect(() => {
    if (!deletedClients.length && isDisplayingDeletedClients) {
      hideDeletedClients();
    }
    // eslint-disable-next-line
  }, [deletedClients]);

  const [isDisplayingDeletedClients, setIsDisplayingDeletedClients] = useState(
    false
  );
  const showDeletedClients = () => {
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <ClientFilter />
          <Button
            variant='outlined'
            color='primary'
            style={{ marginLeft: 'auto', marginRight: '0' }}
            onClick={addNewClient}
          >
            Add New Client
          </Button>
        </div>
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogContent>
            <ClientForm closeDialog={closeDialog} />
          </DialogContent>
        </Dialog>
        <Fragment>
          <Paper style={{ width: '450px' }}>
            <ClientList
              clients={
                isDisplayingDeletedClients
                  ? [...activeClients, ...deletedClients]
                  : activeClients
              }
              selectClient={selectClient}
            />
          </Paper>
          <Button onClick={hideRoster}>Hide Roster</Button>
          {deletedClients.length > 0 && !isDisplayingDeletedClients && (
            <Button onClick={showDeletedClients} style={{ float: 'right' }}>
              Show Deleted Clients
            </Button>
          )}
          {!filteredClients.length && isDisplayingDeletedClients && (
            <Button onClick={hideDeletedClients} style={{ float: 'right' }}>
              Hide Deleted Clients
            </Button>
          )}
        </Fragment>
      </div>
    </div>
  );
};

export default ClientApp;
