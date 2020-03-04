import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const ClientItem = ({ client }) => {
  const clientContext = useContext(ClientContext);
  const { deleteClient, setCurrentClient, clearCurrentClient } = clientContext;
  const {
    _id,
    name
  } = client;
  const handleEdit = () => {
    setCurrentClient(client);
  };
  const handleDelete = () => {
    deleteClient(_id);
    clearCurrentClient();
  };
  return (
    <div key={_id}>
      <ListItem>
        <ListItemText>{name}</ListItemText>
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
};

export default ClientItem;
