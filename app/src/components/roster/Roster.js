import React, { useState, useEffect, useContext, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Client from '../client/Client';
import EditRoster from './EditRoster';
import FilterRoster from './FilterRoster';
import Quote from '../layout/Quote';
import Spinner from '../layout/Spinner';
import { alphabetize } from '../../functions/helpers';
import ClientContext from '../../context/client/clientContext';

const Roster = (props) => {
  const clientContext = useContext(ClientContext);
  const {
    clients,
    editingClient,
    filteredClients,
    clearEditingClient,
    clearFilteredClients,
    loading,
  } = clientContext;
  const active = filteredClients.length
    ? filteredClients.filter((client) => client.isActive)
    : clients.filter((client) => client.isActive);
  const deactivated = filteredClients.length
    ? filteredClients.filter((client) => !client.isActive)
    : clients.filter((client) => !client.isActive);
  const sorted = [
    ...alphabetize(active, 'name'),
    ...alphabetize(deactivated, 'name'),
  ];
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
    props.history.push(`${id}`);
  };
  useEffect(() => {
    if (!loading) {
      const bottom = document.querySelector('.bottom');
      bottom.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line
  }, [sorted]);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Typography variant='h3'>Clients</Typography>
      <Paper className='paper'>
        {isFormOpen || clients.length === 0 ? (
          <EditRoster reset={reset} />
        ) : (
          <Fragment>
            {clients.length > 1 && <FilterRoster />}
            <div className='scrollable'>
              <List>
                <Divider />
                {sorted.map((client) => (
                  <Fragment key={client.name}>
                    <Client client={client} selectClient={selectClient} />
                    <Divider />
                  </Fragment>
                ))}
              </List>
            </div>
            <Button color='primary' onClick={openForm}>
              Add New Client
            </Button>
          </Fragment>
        )}
      </Paper>
      <Quote />
      <div className='bottom' />
    </div>
  );
};

export default Roster;
