import React, { useState, useContext, useEffect, Fragment } from 'react';

import ClientContext from '../../context/client/clientContext';

import ClientFilter from '../clientComponents/ClientFilter';
import ClientForm from '../clientComponents/ClientForm';
import ClientList from '../clientComponents/ClientList';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';

const HomeApp = () => {
  const clientContext = useContext(ClientContext);
  const {
    clients,
    filteredClients,
    getClients,
    editingClient,
    clearEditingClient
  } = clientContext;
  useEffect(() => {
    getClients();
    // eslint-disable-next-line
  }, []);

  const activeClients = filteredClients.length
    ? filteredClients.filter(client => client.isActive) || []
    : clients.filter(client => client.isActive) || [];
  const deletedClients = filteredClients.length
    ? filteredClients.filter(client => !client.isActive) || []
    : clients.filter(client => !client.isActive) || [];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleAddNewClient = () => {
    clearEditingClient();
    handleOpenDialog();
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
            onClick={handleAddNewClient}
          >
            Add New Client
          </Button>
        </div>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogContent>
            <ClientForm handleCloseDialog={handleCloseDialog} />
          </DialogContent>
        </Dialog>
        <Fragment>
          {!isDisplayingDeletedClients ? (
            <Paper style={{ width: '450px' }}>
              <ClientList clients={activeClients} />
            </Paper>
          ) : (
            <Paper style={{ width: '450px' }}>
              <ClientList clients={[...activeClients, ...deletedClients]} />
            </Paper>
          )}
          {deletedClients.length > 0 && !isDisplayingDeletedClients && (
            <Button onClick={showDeletedClients}>Show Deleted Clients</Button>
          )}
          {!filteredClients.length && isDisplayingDeletedClients && (
            <Button onClick={hideDeletedClients}>Hide Deleted Clients</Button>
          )}
        </Fragment>
      </div>
    </div>
  );
};

export default HomeApp;
