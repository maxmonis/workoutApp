import React from 'react';

import useInputState from '../../hooks/useInputState';

import TextField from '@material-ui/core/TextField';

const EditLiftForm = ({ lift, toggle, updateLifts }) => {
  const [value, handleChange, reset] = useInputState(lift);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateLifts(value, lift);
        reset();
        toggle();
      }}
    >
      <TextField
        margin='normal'
        value={value}
        onChange={handleChange}
        fullWidth
        autoFocus
      />
    </form>
  );
};

export default EditLiftForm;
