import React from 'react';

import EditLiftForm from './EditLiftForm';

import useToggle from '../../hooks/useToggle';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';

const Lift = ({ lift, updateLifts }) => {
  const [isEditing, toggle] = useToggle(false);
  const label = `Edit ${lift}`;
  return (
    <div>
      <ListItem style={{ padding: 0 }} component='div'>
        {isEditing ? (
          <EditLiftForm
            updateLifts={updateLifts}
            lift={lift}
            toggleEditForm={toggle}
          />
        ) : (
          <ListItemText aria-label={label} onClick={toggle}>
            {lift}
          </ListItemText>
        )}
      </ListItem>
    </div>
  );
};

export default Lift;
