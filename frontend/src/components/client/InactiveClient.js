import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

const InactiveClient = ({ name, fullName, handleRecover, handleDelete }) => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setInputValue('');
  };
  const confirmDeletion = () => {
    handleDelete();
    closeDialog();
  };
  return (
    <div>
      <ListItem>
        <Button disabled>{name}</Button>
        <ListItemSecondaryAction>
          <IconButton onClick={handleRecover}>
            <AddIcon aria-label='Recover' />
          </IconButton>
          <IconButton onClick={openDialog}>
            <DeleteIcon aria-label='Delete' />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{`Permanently delete ${fullName}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All associated data will be lost forever and this action cannot be
            undone. Confirm the name of the client you wish to delete in order
            to proceed.
          </DialogContentText>
          <TextField
            value={inputValue}
            variant='outlined'
            placeholder='Confirm Name...'
            onChange={handleChange}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          {standardize(inputValue).includes(standardize(fullName)) ? (
            <Button onClick={confirmDeletion} color='primary' autoFocus>
              Delete
            </Button>
          ) : (
            <Button disabled>Delete</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

function standardize(string) {
  return string.replace(/[^a-z]+/gi, '').toUpperCase();
}

export default InactiveClient;
