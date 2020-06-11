import React, { useState } from 'react';

import ExerciseApp from '../exercise/ExerciseApp';

import organizeExercises from '../../functions/organizeExercises';

import Button from '@material-ui/core/Button';

const Routine = ({ lifts, workout, saveWorkout, updateWorkout }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSave = () => {
    saveWorkout();
    setIsFormOpen(false);
  };
  const handleReset = () => {
    updateExercises([]);
  };

  if (workout.routine.length) {
    return (
      <div>
        {organizeExercises(exercises).map((exercise) => (
          <h4 key={exercise.id}>{`${exercise.lift}: ${exercise.printout}`}</h4>
        ))}
        <Button onClick={closeDialog} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary'>
          Save
        </Button>
        <ExerciseApp
          lifts={lifts}
          exercises={exercises}
          updateExercises={updateExercises}
        />
        <div>
          <Button onClick={handleReset}>Reset</Button>
          <Button color='primary' onClick={openDialog}>
            Save
          </Button>
        </div>
      </div>
    );
  }
  return null;
};

export default Routine;
