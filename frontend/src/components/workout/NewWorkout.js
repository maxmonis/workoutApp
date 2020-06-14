import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddExercise from '../exercise/AddExercise';
import ExerciseApp from '../exercise/ExerciseApp';
import SaveWorkout from './SaveWorkout';
import useToggle from '../../hooks/useToggle';

const NewWorkout = ({
  exercise,
  workout,
  lifts,
  routine,
  handleChange,
  addExercise,
  saveWorkout,
  updateRoutine,
  selectExercise,
}) => {
  const [isFormOpen, toggle] = useToggle(false);
  const handleSave = () => {
    saveWorkout();
    toggle();
  };
  return isFormOpen ? (
    <SaveWorkout
      {...workout}
      handleChange={handleChange}
      handleSave={handleSave}
    />
  ) : (
    <div>
      <Paper className='container'>
        <AddExercise
          lifts={[...lifts, '<<< Edit Exercises >>>']}
          handleChange={handleChange}
          exercise={exercise}
          addExercise={addExercise}
        />
      </Paper>
      {routine.length > 0 && (
        <div>
          <ExerciseApp
            routine={routine}
            updateRoutine={updateRoutine}
            selectExercise={selectExercise}
          />
          <Button variant='outlined' color='primary' onClick={toggle}>
            Save Workout
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewWorkout;
