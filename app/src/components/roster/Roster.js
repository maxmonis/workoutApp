import React, { useState, useEffect, useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Client from '../client/Client';
import EditRoster from './EditRoster';
import FilterRoster from './FilterRoster';
import { alphabetize } from '../../functions/helpers';
import ClientContext from '../../context/client/clientContext';

const Roster = ({ toggle }) => {
  const {
    clients,
    editingClient,
    filteredClients,
    clearEditingClient,
    clearFilteredClients,
  } = useContext(ClientContext);
  const active = filteredClients.length
    ? filteredClients.filter((client) => client.isActive)
    : clients.filter((client) => client.isActive);
  const deactivated = filteredClients.length
    ? filteredClients.filter((client) => !client.isActive)
    : clients.filter((client) => !client.isActive);
  const sorted = [
    ...alphabetize(active, 'name'),
    ...alphabetize(deactivated, 'name'),
  ].filter((client) => client.name !== '#');
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
  useEffect(() => {
    document.title = `maxWellness | Clients`;
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ width: '300px' }}>
      <Typography variant='h3'>Clients</Typography>
      {isFormOpen || clients.length === 1 ? (
        <EditRoster reset={reset} />
      ) : (
        <Fragment>
          {clients.length > 2 && <FilterRoster />}
          <div className='scrollable'>
            <List>
              <Divider />
              <TransitionGroup>
                {sorted.map((client) => (
                  <CSSTransition
                    key={client.name}
                    timeout={500}
                    classNames='fade'
                  >
                    <Fragment>
                      <Client client={client} toggle={toggle} />
                      <Divider />
                    </Fragment>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </List>
          </div>
          <Button color='primary' onClick={openForm}>
            Add New Client
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default Roster;
