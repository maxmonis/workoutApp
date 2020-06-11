import React, { useContext, useEffect, Fragment } from 'react';

import useToggle from '../../hooks/useToggle';

import ClientContext from '../../context/client/clientContext';

import ClientFilter from './ClientFilter';
import ClientForm from './ClientForm';
import ClientList from './ClientList';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const ClientApp = ({ clients, handleSelect }) => {
  const clientContext = useContext(ClientContext);
  const {
    editingClient,
    filteredClients,
    clearEditingClient,
    clearFilteredClients,
  } = clientContext;
  const activeClients = filteredClients.length
    ? filteredClients.filter((client) => client.isActive)
    : clients.filter((client) => client.isActive);
  const deactivatedClients = filteredClients.length
    ? filteredClients.filter((client) => !client.isActive)
    : clients.filter((client) => !client.isActive);
  const [isFormOpen, toggle, closeForm] = useToggle(false);
  const reset = () => {
    closeForm();
    clearEditingClient();
    clearFilteredClients();
  };
  const selectClient = (id) => {
    reset();
    handleSelect(id);
  };
  useEffect(() => {
    closeForm();
    editingClient && toggle();
    // eslint-disable-next-line
  }, [editingClient]);
  useEffect(() => {
    clearFilteredClients();
    // eslint-disable-next-line
  }, [clients]);
  return (
    <div>
      <Typography variant='h3'>Clients</Typography>
      <Paper className='container'>
        {isFormOpen || clients.length === 0 ? (
          <ClientForm reset={reset} />
        ) : (
          <Fragment>
            <ClientFilter />
            <Button color='primary' onClick={toggle}>
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
