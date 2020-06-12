import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddExercise from '../exercise/AddExercise';
import WorkoutForm from './WorkoutForm';
import useToggle from '../../hooks/useToggle';

const Workout = ({
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
      <WorkoutForm
        {...workout}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    );
  }
  return (
    <Paper className='container'>
      <AddExercise
        lifts={[...lifts, '<<< Exercises >>>']}
        handleChange={handleChange}
        exercise={exercise}
      />
      <Button color='primary' onClick={addExercise}>
        Next Exercise
      </Button>
    </Paper>
  );
};

export default Workout;
