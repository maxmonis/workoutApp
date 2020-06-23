import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddExercise from '../exercise/AddExercise';
import ExerciseApp from '../exercise/ExerciseApp';
import ExerciseHistory from '../exercise/ExerciseHistory';
import Quote from '../layout/Quote';
import SaveWorkout from './SaveWorkout';
import useToggle from '../../hooks/useToggle';
import organizeRoutine from '../../functions/organizeRoutine';

const NewWorkout = ({
  exercise,
  workout,
  lifts,
  routine,
  handleChange,
  saveWorkout,
  updateRoutine,
  selectExercise,
  isEditing,
  reset,
  workouts,
  lift,
  setExercise,
}) => {
  const [isFormOpen, toggle] = useToggle(false);
  const handleSave = () => {
    saveWorkout();
    toggle();
  };
  return isFormOpen ? (
    <div>
      <Paper className='paper'>
        <SaveWorkout
          {...workout}
          handleChange={handleChange}
          handleSave={handleSave}
          toggle={toggle}
        />
      </Paper>
      {organizeRoutine(routine).map((exercise) => (
        <h2 key={exercise.id}>
          {exercise.lift}: {exercise.printout}
        </h2>
      ))}
    </div>
  ) : (
    <div>
      <Paper className='paper flex-row'>
        <AddExercise
          lifts={lifts}
          handleChange={handleChange}
          exercise={exercise}
          updateRoutine={updateRoutine}
        />
        <ExerciseHistory
          workouts={workouts}
          lift={lift}
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
          {isEditing && (
            <Button color='inherit' onClick={reset}>
              Discard Changes
            </Button>
          )}
          <Button variant='outlined' color='inherit' onClick={toggle}>
            Save Workout
          </Button>
        </div>
      ) : (
        <Quote />
      )}
    </div>
  );
};

export default NewWorkout;
