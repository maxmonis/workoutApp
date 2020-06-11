import React, { useState } from 'react';

import ExerciseEntryForm from './ExerciseEntryForm';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';

const UpdateExerciseForm = ({
  exercise,
  updateRoutine,
  closeDialog,
  lifts,
}) => {
  const [currentExercise, setCurrentExercise] = useState(exercise);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCurrentExercise({ ...currentExercise, [id]: value });
  };
  const handleDelete = () => {
    updateRoutine(currentExercise.id);
  };
  const handleSave = () => {
    updateRoutine(currentExercise);
    closeDialog();
  };
  return (
    <form>
      <FormControl>
        <ExerciseEntryForm
          lifts={lifts}
          handleChange={handleChange}
          exercise={currentExercise}
        />
        <div>
          <IconButton onClick={handleDelete}>
            <DeleteIcon aria-label='Delete' />
          </IconButton>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button color='primary' onClick={handleSave}>
            Save
          </Button>
        </div>
      </FormControl>
    </form>
  );
};

export default UpdateExerciseForm;
