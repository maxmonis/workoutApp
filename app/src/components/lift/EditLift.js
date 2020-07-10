import React from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from '../../hooks/useInputState';
import { strInput } from '../../functions/helpers';

const EditLift = ({ lift, toggle, updateLifts }) => {
  const [value, handleChange, reset] = useInputState(lift);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateLifts(value.trim(), lift);
        reset();
        toggle();
      }}
    >
      <TextField
        style={{ margin: '2px' }}
        margin='normal'
        value={strInput(value)}
        onChange={handleChange}
        fullWidth
        autoFocus
      />
    </form>
  );
};

export default EditLift;
