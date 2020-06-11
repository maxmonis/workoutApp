import React from 'react';

import ExerciseEntryForm from '../exercise/ExerciseEntryForm';

import useToggle from '../../hooks/useToggle';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

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
    saveWorkout();
    toggle();
  };
  if (isFormOpen) {
    return (
      <Paper className='container'>
        <form noValidate>
          <TextField
            id='date'
            label='Date'
            type='date'
            value={workout.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <TextField
          id='name'
          label='Workout Name'
          type='string'
          value={workout.name}
          onChange={handleChange}
          autoFocus
          required
        />
        <Button color='primary' onClick={handleSave}>
          Save Workout
        </Button>
      </Paper>
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
