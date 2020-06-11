import React, { useState, useContext, useEffect, Fragment } from 'react';

import ClientContext from '../../context/client/clientContext';

import ClientFilter from './ClientFilter';
import ClientForm from './ClientForm';
import ClientList from './ClientList';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const ClientApp = (props) => {
  const { clients, handleSelect } = props;
  const clientContext = useContext(ClientContext);
  const {
    filteredClients,
    editingClient,
    clearEditingClient,
    clearFilteredClients,
  } = clientContext;
  const activeClients = filteredClients.length
    ? filteredClients.filter((client) => client.isActive)
    : clients.filter((client) => client.isActive);
  const deactivatedClients = filteredClients.length
    ? filteredClients.filter((client) => !client.isActive)
    : clients.filter((client) => !client.isActive);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const reset = () => {
    setIsFormOpen(false);
    clearEditingClient();
    clearFilteredClients();
  };
  const selectClient = (id) => {
    reset();
    handleSelect(id);
  };
  const addNewClient = () => {
    clearEditingClient();
    setIsFormOpen(true);
  };
  useEffect(() => {
    editingClient ? setIsFormOpen(true) : reset();
    // eslint-disable-next-line
  }, [editingClient]);
  useEffect(() => {
    clearFilteredClients();
    // eslint-disable-next-line
  }, [clients]);
  return (
    <div>
      <Paper className='container'>
        {isFormOpen || clients.length === 0 ? (
          <ClientForm reset={reset} />
        ) : (
          <Fragment>
            <ClientFilter />
            <Button color='primary' onClick={addNewClient}>
              Add New Client
            </Button>
            <ClientList
              clients={[...activeClients, ...deactivatedClients]}
              selectClient={selectClient}
            />
          </Fragment>
        )}
      </Paper>
      {clients.length === 0 && <h3>Please add your first client</h3>}
    </div>
  );
};

export default ClientApp;
