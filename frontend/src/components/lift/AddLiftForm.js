import React from 'react';

import useInputState from '../../hooks/useInputState';

import TextField from '@material-ui/core/TextField';

const LiftForm = ({ updateLifts }) => {
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

export default LiftForm;
