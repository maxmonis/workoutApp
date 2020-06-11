import React from 'react';

import ExerciseEntryForm from '../exercise/ExerciseEntryForm';
import SaveWorkout from './SaveWorkout';

import useToggle from '../../hooks/useToggle';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const WorkoutApp = ({
  exercise,
  workout,
  lifts,
  handleChange,
  addExercise,
  saveWorkout,
}) => {
  const [isFormOpen, toggle] = useToggle(false);
  const handleSave = () => {
    // saveWorkout();
    toggle();
  };
  if (isFormOpen) {
    return (
      <SaveWorkout
        workout={workout}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    );
  }
  return (
    <Paper className='container'>
      <ExerciseEntryForm
        lifts={[...lifts, '<<< Edit Lifts >>>']}
        handleChange={handleChange}
        exercise={exercise}
        addExercise={addExercise}
      />
      <Button color='primary' onClick={toggle}>
        Save Workout
      </Button>
    </Paper>
  );
};

export default WorkoutApp;
