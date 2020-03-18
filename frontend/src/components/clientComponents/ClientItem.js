import React, { useState, useContext, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import ClientContext from '../../context/client/clientContext';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const ClientItem = ({ client }) => {
  const clientContext = useContext(ClientContext);
  const { deleteClient, setEditingClient, clearEditingClient } = clientContext;
  const { _id, name } = client;
  const initialSelectedClient =
    JSON.parse(window.localStorage.getItem('selectedClient')) || null;
  const [selectedClient, setSelectedClient] = useState(initialSelectedClient);
  const [isRedirecting, setIsRedirecting] = useState(false);
  useEffect(() => {
    window.localStorage.setItem(
      'selectedClient',
      JSON.stringify(selectedClient)
    );
  }, [selectedClient]);
  const handleSelect = () => {
    setSelectedClient(client);
    setIsRedirecting(true);
  };
  const handleDelete = () => {
    deleteClient(_id);
    clearEditingClient();
  };
  const handleEdit = () => {
    setEditingClient(client);
  };
  if (isRedirecting) {
    return <Redirect to='workouts' />;
  } else {
    return (
      <div key={_id}>
        <ListItem>
          <Button onClick={handleSelect}>{name}</Button>
          <ListItemSecondaryAction>
            <IconButton onClick={handleDelete}>
              <DeleteIcon aria-label='Delete' />
            </IconButton>
            <IconButton onClick={handleEdit}>
              <EditIcon aria-label='Edit' />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }
};

export default ClientItem;
