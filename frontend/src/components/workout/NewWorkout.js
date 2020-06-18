import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddExercise from '../exercise/AddExercise';
import ExerciseApp from '../exercise/ExerciseApp';
import Exercises from '../stats/Exercises';
import SaveWorkout from './SaveWorkout';
import useToggle from '../../hooks/useToggle';
import organizeRoutine from '../../functions/organizeRoutine';

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
  workouts,
  lift,
  autopopulate,
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
        <h4 key={exercise.id}>
          {exercise.lift}: {exercise.printout}
        </h4>
      ))}
    </div>
  ) : (
    <div>
      <Paper className='paper flex-row'>
        <AddExercise
          lifts={lifts}
          handleChange={handleChange}
          exercise={exercise}
          addExercise={addExercise}
        />
        <Exercises
          workouts={workouts}
          lift={lift}
          autopopulate={autopopulate}
        />
      </Paper>
      {routine.length > 0 && (
        <div>
          <ExerciseApp
            routine={routine}
            updateRoutine={updateRoutine}
            selectExercise={selectExercise}
          />
          <Button variant='outlined' color='inherit' onClick={toggle}>
            Save Workout
          </Button>
        </div>
      )}
      {!workouts.length && !routine.length && <h3>Please add a new workout</h3>}
    </div>
  );
};

export default NewWorkout;
