import React, { useState, useContext, useEffect } from 'react';

import ClientContext from '../../context/client/clientContext';

import standardize from '../../functions/standardize';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

const ClientItem = ({ client, selectClient }) => {
  const clientContext = useContext(ClientContext);
  const {
    deleteClient,
    updateClient,
    setEditingClient,
    clearEditingClient,
  } = clientContext;
  const [currentClient, setCurrentClient] = useState(client);
  const { _id, name } = currentClient;
  const clientName = name.length < 18 ? name : `${name.slice(0, 17).trim()}...`;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    updateClient(currentClient);
    // eslint-disable-next-line
  }, [currentClient]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSelect = () => {
    const selectedClient = { ...currentClient, lastAccessed: Date.now() };
    setCurrentClient(selectedClient);
    selectClient(selectedClient);
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
    handleOpenDialog();
  };
  const handleDelete = () => {
    deleteClient(_id);
    clearEditingClient();
    handleCloseDialog();
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setInputValue('');
  };
  if (client.isActive) {
    return (
      <div key={_id}>
        <ListItem style={{ height: '40px' }}>
          <Button onClick={handleSelect}>{clientName}</Button>
          <ListItemSecondaryAction>
            <IconButton onClick={handleEdit}>
              <EditIcon aria-label='Edit' />
            </IconButton>
            <IconButton onClick={handleDeactivate}>
              <ClearIcon aria-label='Deactivate' />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  } else {
    return (
      <div key={_id}>
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {`Permanently delete ${client.name}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              All associated data will be lost forever and this action cannot be
              undone. Confirm the name of the client you wish to delete in order
              to proceed.
            </DialogContentText>
            <TextField
              required
              style={{ height: '40px', fontSize: '20px' }}
              value={inputValue}
              variant='outlined'
              placeholder='Confirm Name...'
              onChange={handleChange}
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color='primary'>
              Cancel
            </Button>
            {standardize(inputValue) === standardize(client.name) && (
              <Button onClick={handleDelete} color='primary' autoFocus>
                Delete
              </Button>
            )}
          </DialogActions>
        </Dialog>
        <ListItem style={{ height: '40px' }}>
          <Button disabled>
            {clientName}
          </Button>
          <ListItemSecondaryAction>
            <IconButton onClick={handleRecover}>
              <AddIcon aria-label='Recover' />
            </IconButton>
            <IconButton onClick={handleDeleteRequest}>
              <DeleteIcon aria-label='Delete' />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }
};

export default ClientItem;
