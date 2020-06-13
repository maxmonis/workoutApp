import React from 'react';
import Paper from '@material-ui/core/Paper';
import AddExercise from '../exercise/AddExercise';
import SaveWorkout from './SaveWorkout';
import useToggle from '../../hooks/useToggle';

const NewWorkout = ({
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
        {...workout}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    );
  }
  return (
    <Paper className='container'>
      <AddExercise
        lifts={[...lifts, '<<< Edit Exercises >>>']}
        handleChange={handleChange}
        exercise={exercise}
        addExercise={addExercise}
      />
    </Paper>
  );
};

export default NewWorkout;
