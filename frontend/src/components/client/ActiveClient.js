import React from 'react';

import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const ActiveClient = ({
  clientName,
  handleSelect,
  handleEdit,
  handleDeactivate,
}) => {
  return (
    <div>
      <ListItem>
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
};

export default ActiveClient;
