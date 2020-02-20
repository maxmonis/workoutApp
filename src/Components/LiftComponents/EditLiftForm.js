import React from 'react';

import useInputState from '../../Hooks/useInputState';

import TextField from '@material-ui/core/TextField';

const EditLiftForm = ({ id, liftName, editLift, toggleEditForm }) => {
  const [value, handleChange, reset] = useInputState(liftName);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        editLift(id, value);
        reset();
        toggleEditForm();
      }}
      style={{ marginLeft: '1 rem', width: '50%' }}
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
