import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddExercise from '../exercise/AddExercise';
import ExerciseApp from '../exercise/ExerciseApp';
import ExerciseHistory from '../exercise/ExerciseHistory';
import Quote from '../layout/Quote';
import SaveWorkout from './SaveWorkout';
import useToggle from '../../hooks/useToggle';

const NewWorkout = ({
  exercise,
  workout,
  lifts,
  routine,
  workouts,
  handleChange,
  saveWorkout,
  updateRoutine,
  selectExercise,
  setExercise,
}) => {
  const [isFormOpen, toggle] = useToggle(false);
  const handleSave = () => {
    saveWorkout();
    toggle();
  };
  return (
    <div>
      <Paper className='paper flex-row res'>
        <AddExercise
          lifts={lifts}
          handleChange={handleChange}
          exercise={exercise}
          updateRoutine={updateRoutine}
        />
        <ExerciseHistory
          workouts={workouts}
          lift={exercise.lift}
          setExercise={setExercise}
        />
      </Paper>
      {routine.length ? (
        <div>
          <ExerciseApp
            routine={routine}
            updateRoutine={updateRoutine}
            selectExercise={selectExercise}
          />
          {isFormOpen ? (
            <div>
              <Paper className='paper narrow'>
                <SaveWorkout
                  {...workout}
                  handleChange={handleChange}
                  handleSave={handleSave}
                  toggle={toggle}
                />
              </Paper>
            </div>
          ) : (
            <div className='pad-1'>
              <Button variant='outlined' color='inherit' onClick={toggle}>
                Save Workout
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Quote />
      )}
    </div>
  );
};

export default NewWorkout;
