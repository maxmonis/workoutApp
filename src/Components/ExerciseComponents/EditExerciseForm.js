import React, { useState } from 'react';

import ExerciseEntryForm from './ExerciseEntryForm';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const EditExerciseForm = ({
  currentId,
  currentLift,
  currentSets,
  currentReps,
  currentWeight,
  editExercise,
  handleCloseDialog,
  lifts
}) => {
  const [currentExercise, setCurrentExercise] = useState({
    lift: currentLift,
    sets: currentSets,
    reps: currentReps,
    weight: currentWeight
  });

  const handleChange = e => {
    const {id, value} = e.target
    setCurrentExercise({ ...currentExercise, [id]: value });
  };

  const handleSaveChanges = () => {
    if (currentExercise.weight < 1) return;
    editExercise(currentId, currentExercise);
    handleCloseDialog();
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color='primary' onClick={handleSaveChanges}>
            Save
          </Button>
        </div>
      </FormControl>
    </form>
  );
};

export default EditExerciseForm;
