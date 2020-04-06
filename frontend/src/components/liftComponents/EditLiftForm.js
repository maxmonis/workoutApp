import React, { useContext } from 'react';

import ClientContext from '../../context/client/clientContext';

import useInputState from '../../hooks/useInputState';

import updateLiftName from '../../functions/updateLiftName';

import TextField from '@material-ui/core/TextField';

const EditLiftForm = ({ id, liftName, editLift, toggleEditForm }) => {
  const clientContext = useContext(ClientContext);
  const { selectedClient, updateClient } = clientContext;
  const [value, handleChange, reset] = useInputState(liftName);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const names = editLift(id, value);
        const updatedClient = updateLiftName(
          selectedClient,
          names.originalName,
          names.updatedName
        );
        updateClient(updatedClient);
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
