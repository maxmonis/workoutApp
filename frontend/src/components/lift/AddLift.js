import React from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from '../../hooks/useInputState';

const AddLift = ({ updateLifts }) => {
  const [value, handleChange, reset] = useInputState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        value && updateLifts(value);
        reset();
      }}
    >
      <TextField
        value={value}
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
