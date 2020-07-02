import React from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from '../../hooks/useInputState';
import { strInput } from '../../functions/helpers';

const EditLift = ({ lift, toggle, updateLifts }) => {
  const [value, handleChange, reset] = useInputState(lift);
  return (
    <form
      className='width-80'
      onSubmit={(e) => {
        e.preventDefault();
        updateLifts(value.trim(), lift);
        reset();
        toggle();
      }}
    >
      <TextField
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
