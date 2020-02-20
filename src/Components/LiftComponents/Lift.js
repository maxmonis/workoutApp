import React, { Fragment } from 'react';

import EditLiftForm from './EditLiftForm';

import useToggle from '../../Hooks/useToggle';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const Lift = ({ id, liftName, removeLift, editLift }) => {
  const [isEditing, toggle] = useToggle(false);
  const handleRemoveLift = () => {
    removeLift(id);
  };
  return (
    <div>
      <ListItem style={{ height: '64px' }} component='div'>
        {isEditing ? (
          <EditLiftForm
            editLift={editLift}
            id={id}
            liftName={liftName}
            toggleEditForm={toggle}
          />
        ) : (
          <Fragment>
            <ListItemText>{liftName}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={handleRemoveLift}>
                <DeleteIcon aria-label='Delete' />
              </IconButton>
              <IconButton onClick={toggle}>
                <EditIcon aria-label='Edit' />
              </IconButton>
            </ListItemSecondaryAction>
          </Fragment>
        )}
      </ListItem>
    </div>
  );
};

export default Lift;
