import React, { useState, useContext, useEffect, Fragment } from 'react';

import ClientContext from '../../context/client/clientContext';
import AuthContext from '../../context/auth/authContext';

import ClientFilter from '../client/ClientFilter';
import ClientForm from '../client/ClientForm';
import ClientList from '../client/ClientList';
import Spinner from '../layout/Spinner';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const Home = (props) => {
  const clientContext = useContext(ClientContext);
  const {
    clients,
    filteredClients,
    editingClient,
    clearEditingClient,
    clearFilteredClients,
  } = clientContext;
  const authContext = useContext(AuthContext);
  const { loading } = authContext;
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
    props.history.push(`/${id}`);
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
  if (loading) return <Spinner />;
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

export default Home;
