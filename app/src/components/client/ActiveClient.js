import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const ActiveClient = ({
  clientName,
  id,
  toggle,
  handleEdit,
  handleDeactivate,
}) => {
  return (
    <div>
      <ListItem>
        <Link className='link' to={id}>
          <Button onClick={toggle}>{clientName}</Button>
        </Link>
        <ListItemSecondaryAction>
          <IconButton color='inherit' onClick={handleEdit}>
            <EditIcon aria-label='Edit' />
          </IconButton>
          <IconButton color='inherit' onClick={handleDeactivate}>
            <ClearIcon aria-label='Deactivate' />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default ActiveClient;
