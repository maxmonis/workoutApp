import React, { Fragment } from 'react';

import EditLiftForm from './EditLiftForm';

import useToggle from '../../hooks/useToggle';

import DeleteIcon from '@material-ui/icons/Delete';
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
      <ListItem style={{ height: '40px' }} component='div'>
        {isEditing ? (
          <EditLiftForm
            editLift={editLift}
            id={id}
            liftName={liftName}
            toggleEditForm={toggle}
          />
        ) : (
          <Fragment>
            <ListItemText
              aria-label='Edit'
              onClick={toggle}
              style={{ fontSize: '20px' }}
            >
              {liftName.length < 23
                ? liftName
                : `${liftName.slice(0, 23).trim()}...`}{' '}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={handleRemoveLift}>
                <DeleteIcon aria-label='Delete' />
              </IconButton>
            </ListItemSecondaryAction>
          </Fragment>
        )}
      </ListItem>
    </div>
  );
};

export default Lift;
