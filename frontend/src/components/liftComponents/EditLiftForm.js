import React, { useState, useContext, useEffect } from 'react';

import ClientContext from '../../context/client/clientContext';

import useInputState from '../../hooks/useInputState';

import TextField from '@material-ui/core/TextField';

const EditLiftForm = ({ id, liftName, editLift, toggleEditForm }) => {
  const clientContext = useContext(ClientContext);
  const { selectedClient, updateClient } = clientContext;
  const [value, handleChange, reset] = useInputState(liftName);

  const [updatedClient, setUpdatedClient] = useState(selectedClient);
  useEffect(() => {
    updateClient(updatedClient);
    // eslint-disable-next-line
  }, [updatedClient]);

  const updateLiftName = (originalName, updatedName) => {
    const currentWorkout = JSON.parse(
      window.localStorage.getItem(
        `workout${selectedClient.name.replace(' ', '')}`
      ) || null
    );
    console.log(currentWorkout);
    const updatedWorkout = !currentWorkout
      ? null
      : currentWorkout.forEach((exercise) => {
          if (exercise.lift === originalName) exercise.lift = updatedName;
        });
    updatedWorkout &&
      window.localStorage.setItem(
        `workout${selectedClient.name.replace(' ', '')}`,
        updatedWorkout
      );

    const personalBests = selectedClient.personalBests.forEach(
      (personalBest) => {
        if (personalBest.lift === originalName) personalBest.lift = updatedName;
      }
    );
    const previousWorkouts = selectedClient.previousWorkouts.forEach(
      (previousWorkout) => {
        previousWorkout.workout.forEach((exercise) => {
          if (exercise.lift === originalName) exercise.lift = updatedName;
        });
      }
    );
    setUpdatedClient({ ...updatedClient, personalBests, previousWorkouts });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const names = editLift(id, value);
        updateLiftName(names.originalName, names.updatedName);
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
