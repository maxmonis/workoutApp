import React from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from '../../hooks/useInputState';
import { strInput } from '../../functions/helpers';

const AddLift = ({ updateLifts }) => {
  const [value, handleChange, reset] = useInputState('');
  return (
    <form
      className='width-80'
      onSubmit={(e) => {
        e.preventDefault();
        value && updateLifts(value.trim());
        reset();
      }}
    >
      <TextField
        value={strInput(value)}
        onChange={handleChange}
        margin='normal'
        label='Add New Exercise'
        fullWidth
        autoFocus={true}
      />
    </form>
  );
};

export default AddLift;
