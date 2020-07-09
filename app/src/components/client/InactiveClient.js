import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteClient from './DeleteClient';
import useToggle from '../../hooks/useToggle';

const InactiveClient = ({ clientName, name, handleActivate, handleDelete }) => {
  const [isDialogOpen, toggle] = useToggle(false);
  return (
    <div>
      <ListItem>
        <Button disabled>{clientName}</Button>
        <ListItemSecondaryAction>
          <IconButton onClick={handleActivate}>
            <AddIcon aria-label='Recover' />
          </IconButton>
          <IconButton onClick={toggle}>
            <DeleteIcon aria-label='Delete' />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Dialog
        style={{ maxWidth: '500px' }}
        open={isDialogOpen}
        onClose={toggle}
      >
        <DeleteClient name={name} toggle={toggle} handleDelete={handleDelete} />
      </Dialog>
    </div>
  );
};

export default InactiveClient;
