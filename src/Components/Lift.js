import React, { Fragment } from 'react';
import useToggle from '../Hooks/useToggle';
import EditLiftForm from './EditLiftForm';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const Lift = ({ id, liftName, removeLift, editLift }) => {
  const [isEditing, toggle] = useToggle(false);
  return (
    <div>
      <ListItem style={{ height: '64px' }}>
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
              <IconButton>
                <DeleteIcon
                  aria-label='Delete'
                  onClick={() => removeLift(id)}
                />
              </IconButton>
              <IconButton>
                <EditIcon aria-label='Edit' onClick={toggle} />
              </IconButton>
            </ListItemSecondaryAction>
          </Fragment>
        )}
      </ListItem>
    </div>
  );
};

export default Lift;