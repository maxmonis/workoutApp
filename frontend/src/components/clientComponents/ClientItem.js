import React, { useState, useContext, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import ClientContext from '../../context/client/clientContext';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const ClientItem = ({ client }) => {
  const clientContext = useContext(ClientContext);
  const {
    deleteClient,
    updateClient,
    setEditingClient,
    clearEditingClient
  } = clientContext;
  const initialSelectedClient =
    JSON.parse(window.localStorage.getItem('selectedClient')) || null;
  const [selectedClient, setSelectedClient] = useState(initialSelectedClient);
  const [currentClient, setCurrentClient] = useState(client);
  const { _id, name } = currentClient;
  const [isRedirecting, setIsRedirecting] = useState(false);
  useEffect(() => {
    window.localStorage.setItem(
      'selectedClient',
      JSON.stringify(selectedClient)
    );
  }, [selectedClient]);
  useEffect(() => {
    updateClient(currentClient);
    // eslint-disable-next-line
  }, [currentClient]);
  const handleSelect = () => {
    setSelectedClient(client);
    setIsRedirecting(true);
  };
  const handleEdit = () => {
    setEditingClient(client);
  };
  const handleDeactivate = () => {
    setCurrentClient({ ...currentClient, isActive: false });
  };
  const handleRecover = () => {
    setCurrentClient({ ...currentClient, isActive: true });
  };
  const handleDeleteRequest = () => {
    handleDelete();
  };
  const handleDelete = () => {
    deleteClient(_id);
    clearEditingClient();
  };
  const linksForActiveClient = (
    <ListItemSecondaryAction>
      <IconButton onClick={handleEdit}>
        <EditIcon aria-label='Edit' />
      </IconButton>
      <IconButton onClick={handleDeactivate}>
        <ClearIcon aria-label='Deactivate' />
      </IconButton>
    </ListItemSecondaryAction>
  );
  const linksForDeletedClient = (
    <ListItemSecondaryAction>
      <IconButton onClick={handleRecover}>
        <AddIcon aria-label='Recover' />
      </IconButton>
      <IconButton onClick={handleDeleteRequest}>
        <DeleteIcon aria-label='Delete' />
      </IconButton>
    </ListItemSecondaryAction>
  );
  if (isRedirecting) {
    return <Redirect to='workouts' />;
  } else {
    return (
      <div key={_id}>
        <ListItem style={{ height: '40px' }}>
          <Button onClick={handleSelect} style={{ fontSize: '20px' }}>
            {name.length < 21 ? name : `${name.slice(0, 20).trim()}...`}
          </Button>
          {client.isActive ? linksForActiveClient : linksForDeletedClient}
        </ListItem>
      </div>
    );
  }
};

export default ClientItem;
