import React from 'react';

import useInputState from '../../hooks/useInputState';

import TextField from '@material-ui/core/TextField';

const EditLiftForm = ({ name, updateLifts, toggleEditForm }) => {
  const [value, handleChange, reset] = useInputState(name);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateLifts(value, name);
        reset();
        toggleEditForm();
      }}
      style={{ marginLeft: '1 rem', width: '100%' }}
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
