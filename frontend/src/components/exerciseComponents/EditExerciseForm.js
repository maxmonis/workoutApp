import React, { useState } from 'react';

import ExerciseEntryForm from './ExerciseEntryForm';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';

const EditExerciseForm = ({
  exerciseId,
  initialLift,
  initialSets,
  initialReps,
  initialWeight,
  editExercise,
  deleteExercise,
  closeDialog,
  lifts
}) => {
  const [currentExercise, setCurrentExercise] = useState({
    lift: initialLift,
    sets: initialSets,
    reps: initialReps,
    weight: initialWeight
  });

  const handleChange = e => {
    const { id, value } = e.target;
    setCurrentExercise({ ...currentExercise, [id]: value });
  };
  const handleDelete = () => {
    deleteExercise();
  };
  const saveChanges = () => {
    editExercise(exerciseId, currentExercise);
    closeDialog();
  };
  return (
    <form>
      <FormControl>
        <ExerciseEntryForm
          lifts={lifts}
          handleChange={handleChange}
          currentExercise={currentExercise}
        />
        <div>
          <IconButton onClick={handleDelete}>
            <DeleteIcon aria-label='Delete' />
          </IconButton>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button color='primary' onClick={saveChanges}>
            Save
          </Button>
        </div>
      </FormControl>
    </form>
  );
};

export default EditExerciseForm;
