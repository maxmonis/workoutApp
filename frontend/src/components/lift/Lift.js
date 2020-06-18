import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import EditLift from './EditLift';
import useToggle from '../../hooks/useToggle';

const Lift = ({ lift, updateLifts }) => {
  const [isEditing, toggle] = useToggle(false);

  return (
    <div>
      <ListItem style={{ padding: 0 }} component='div'>
        {isEditing ? (
          <EditLift lift={lift} toggle={toggle} updateLifts={updateLifts} />
        ) : (
          <ListItemText aria-label={`Edit ${lift}`} onClick={toggle}>
            {lift}
          </ListItemText>
        )}
      </ListItem>
    </div>
  );
};

export default Lift;
