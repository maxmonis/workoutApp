import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import useInputState from '../../hooks/useInputState';
import useToggle from '../../hooks/useToggle';
import { strInput } from '../../functions/helpers';

const Lift = ({ lift, updateLifts }) => {
  const [isEditing, toggle] = useToggle(false);
  const [value, handleChange] = useInputState(lift);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateLifts(value.trim(), lift);
    toggle();
  };
  return (
    <ListItem style={{ padding: 0 }} component='div'>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <TextField
            value={strInput(value)}
            onChange={handleChange}
            autoFocus
          />
        </form>
      ) : (
        <ListItemText aria-label={`Edit ${lift}`} onClick={toggle}>
          {lift}
        </ListItemText>
      )}
    </ListItem>
  );
};

export default Lift;
