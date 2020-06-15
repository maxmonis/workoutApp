import React, { useState, useContext, useEffect, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClientFilter from './ClientFilter';
import ClientForm from './ClientForm';
import ClientList from './ClientList';
import Spinner from '../layout/Spinner';
import WorkoutApp from '../workout/WorkoutApp';
import ClientContext from '../../context/client/clientContext';

const ClientApp = (props) => {
  const clientContext = useContext(ClientContext);
  const {
    clients,
    updateClient,
    editingClient,
    filteredClients,
    clearEditingClient,
    clearFilteredClients,
    loading,
  } = clientContext;
  const activeClients = filteredClients.length
    ? filteredClients.filter((client) => client.isActive)
    : clients.filter((client) => client.isActive);
  const deactivatedClients = filteredClients.length
    ? filteredClients.filter((client) => !client.isActive)
    : clients.filter((client) => !client.isActive);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const reset = () => {
    setIsFormOpen(false);
    clearEditingClient();
    clearFilteredClients();
  };
  useEffect(() => {
    editingClient ? openForm() : reset();
    // eslint-disable-next-line
  }, [editingClient]);
  useEffect(() => {
    reset();
    // eslint-disable-next-line
  }, [clients]);
  const selectClient = (id) => {
    props.history.push(`workouts/${id}`);
  };
  const selectedClient = clients.find(
    (client) => client._id === props.match.params.id
  );
  return loading ? (
    <Spinner />
  ) : selectedClient ? (
    <WorkoutApp selectedClient={selectedClient} updateClient={updateClient} />
  ) : (
    <div>
      <Typography variant='h3'>Clients</Typography>
      <Paper className='container'>
        {isFormOpen || clients.length === 0 ? (
          <ClientForm reset={reset} />
        ) : (
          <Fragment>
            <ClientFilter />
            <Button color='primary' onClick={openForm}>
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
