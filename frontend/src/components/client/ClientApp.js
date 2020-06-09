import React, { useState, useContext, useEffect, Fragment } from 'react';

import ClientContext from '../../context/client/clientContext';

import ClientFilter from './ClientFilter';
import ClientForm from './ClientForm';
import ClientList from './ClientList';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const ClientApp = () => {
  const clientContext = useContext(ClientContext);
  const {
    clients,
    filteredClients,
    editingClient,
    clearEditingClient,
  } = clientContext;
  const activeClients = filteredClients.length
    ? filteredClients.filter((client) => client.isActive)
    : clients.filter((client) => client.isActive);
  const deletedClients = filteredClients.length
    ? filteredClients.filter((client) => !client.isActive)
    : clients.filter((client) => !client.isActive);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  const addNewClient = () => {
    clearEditingClient();
    openForm();
  };
  useEffect(() => {
    editingClient ? openForm() : closeForm();
  }, [editingClient]);
  return (
    <div>
      <Paper className='container'>
        {isFormOpen || clients.length === 0 ? (
          <ClientForm closeForm={closeForm} />
        ) : (
          <Fragment>
            <Button color='primary' variant='outlined' onClick={addNewClient}>
              New Client
            </Button>
            <ClientFilter />
            <ClientList
              key={activeClients.length}
              clients={[...activeClients, ...deletedClients]}
            />
          </Fragment>
        )}
      </Paper>
      {clients.length === 0 && <h3>Please add your first client</h3>}
    </div>
  );
};

export default ClientApp;
