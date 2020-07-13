import React, { useState, useEffect, useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
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
  const openForm = () => clients.length < 21 && setIsFormOpen(true);
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
  return (
    <div>
      <Paper className='paper narrow'>
        {isFormOpen || clients.length === 1 ? (
          <EditRoster reset={reset} />
        ) : (
          <Fragment>
            {clients.length > 2 && <FilterRoster />}
            <List>
              <div className='scrollable'>
                <Divider />
                <TransitionGroup>
                  {sorted.map((client, i) => (
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
              </div>
            </List>
            {clients.length < 21 && (
              <Button color='primary' onClick={openForm}>
                Add New Client
              </Button>
            )}
          </Fragment>
        )}
      </Paper>
      <h3 className='width-80'>
        You have {21 - clients.length} available slot
        {clients.length !== 20 && 's'} on your roster
      </h3>
    </div>
  );
};

export default Roster;
